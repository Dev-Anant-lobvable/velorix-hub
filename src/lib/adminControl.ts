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
  "Arena upgrade in progress. Hold tight — the squad will be back shortly.";

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

export const ADMIN_SESSION_KEY = "vx-admin-session";
export const isSessionExpired = (err: unknown) =>
  err instanceof Error && /session expired/i.test(err.message);

export const adminControl = async <T,>(body: Record<string, unknown>) => {
  const { data, error } = await withTimeout(
    supabase.functions.invoke("admin-control", { body }),
    "Admin backend is still starting. Wait 1 minute and try again."
  );
  const payload = data as (T & { error?: string }) | null;
  if (payload?.error) {
    if (/session expired/i.test(payload.error)) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
    throw new Error(payload.error);
  }
  if (error) throw new Error(error.message || "Admin request failed");
  if (!payload) throw new Error("Admin request failed");
  return payload;
};

export const publicDb = supabase;