import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type CustomPage = Omit<Tables<"custom_pages">, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type MaintenanceConfig = {
  enabled: boolean;
  message: string;
};

export const DEFAULT_MAINTENANCE_MESSAGE =
  "Arena upgrade chal raha hai. Thoda ruk jao, squad soon back hogi.";

export const normalizeMaintenance = (value: unknown): MaintenanceConfig => {
  const data = (value ?? {}) as Partial<MaintenanceConfig>;
  return {
    enabled: Boolean(data.enabled),
    message: String(data.message || DEFAULT_MAINTENANCE_MESSAGE),
  };
};

export const REQUEST_TIMEOUT_MS = 10_000;

export const withTimeout = async <T,>(
  promise: PromiseLike<T>,
  message = "Backend is still waking up. Try again in a minute."
): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), REQUEST_TIMEOUT_MS);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
};

export const adminControl = async <T,>(body: Record<string, unknown>) => {
  const { data, error } = await withTimeout(
    supabase.functions.invoke("admin-control", { body }),
    "Admin backend is still starting. Wait 1 minute and try again."
  );
  if (error) throw new Error(error.message || "Admin request failed");
  const payload = data as T & { error?: string };
  if (payload?.error) throw new Error(payload.error);
  return payload;
};

export const publicDb = supabase;