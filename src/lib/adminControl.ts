import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type CustomPage = Tables<"custom_pages">;

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

export const adminControl = async <T,>(body: Record<string, unknown>) => {
  const { data, error } = await supabase.functions.invoke("admin-control", { body });
  if (error) throw new Error(error.message || "Admin request failed");
  const payload = data as T & { error?: string };
  if (payload?.error) throw new Error(payload.error);
  return payload;
};

export const publicDb = supabase;