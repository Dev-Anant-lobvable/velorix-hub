import {
  Activity,
  CheckCircle2,
  Clock3,
  DownloadCloud,
  Globe,
  ShieldCheck,
  Trophy,
} from "@/lib/icons";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

type ServiceState = "operational" | "minor" | "down" | "checking";

type ServiceKey = "frontend" | "database" | "downloads" | "edge";

type ServiceResult = {
  state: ServiceState;
  latencyMs: number | null;
  detail: string;
};

type ServiceDef = {
  key: ServiceKey;
  name: string;
  description: string;
  icon: typeof Globe;
  run: () => Promise<ServiceResult>;
};

const SUPABASE_URL = "https://pvzoeafqfkwfgiiflaol.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2em9lYWZxZmt3ZmdpaWZsYW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MzMxMzYsImV4cCI6MjA4NzUwOTEzNn0.fE4wau0tHvOlkiJw3qiLqz-TVAnVccrKLCS_3zZ5jGQ";

const ping = async (url: string, init?: RequestInit): Promise<ServiceResult> => {
  const start = performance.now();
  try {
    const res = await fetch(url, { cache: "no-store", ...init });
    const latencyMs = Math.round(performance.now() - start);
    // Any HTTP response (even 4xx) means the service is reachable.
    const state: ServiceState =
      res.ok || (res.status >= 400 && res.status < 500)
        ? latencyMs > 1500
          ? "minor"
          : "operational"
        : "down";
    return { state, latencyMs, detail: `HTTP ${res.status} · ${latencyMs}ms` };
  } catch (err) {
    return { state: "down", latencyMs: null, detail: "Unreachable" };
  }
};

const services: ServiceDef[] = [
  {
    key: "frontend",
    name: "Website & Routing",
    description: "Homepage, public pages, and CDN delivery",
    icon: Globe,
    run: () => ping(window.location.origin + "/", { method: "HEAD" }),
  },
  {
    key: "database",
    name: "Database",
    description: "Live config, custom pages, and content reads",
    icon: ShieldCheck,
    run: async () => {
      const start = performance.now();
      const { error } = await supabase
        .from("site_config")
        .select("key")
        .limit(1);
      const latencyMs = Math.round(performance.now() - start);
      if (error) return { state: "down", latencyMs, detail: error.message };
      return {
        state: latencyMs > 1500 ? "minor" : "operational",
        latencyMs,
        detail: `${latencyMs}ms`,
      };
    },
  },
  {
    key: "downloads",
    name: "Downloads",
    description: "APK delivery from storage bucket",
    icon: DownloadCloud,
    run: () =>
      ping(`${SUPABASE_URL}/storage/v1/bucket/apk-files`, {
        method: "GET",
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
      }),
  },
  {
    key: "edge",
    name: "Admin & Control",
    description: "Edge functions powering admin and tournament flows",
    icon: Trophy,
    run: () =>
      ping(`${SUPABASE_URL}/functions/v1/admin-control`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
        body: JSON.stringify({ action: "ping" }),
      }),
  },
];

const StatusPage = () => {
  const [results, setResults] = useState<Record<ServiceKey, ServiceResult>>(() =>
    Object.fromEntries(
      services.map((s) => [s.key, { state: "checking", latencyMs: null, detail: "Checking…" }])
    ) as Record<ServiceKey, ServiceResult>
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [checking, setChecking] = useState(false);

  const runChecks = useCallback(async () => {
    setChecking(true);
    const entries = await Promise.all(
      services.map(async (s) => [s.key, await s.run()] as const)
    );
    setResults(Object.fromEntries(entries) as Record<ServiceKey, ServiceResult>);
    setLastChecked(new Date());
    setChecking(false);
  }, []);

  useEffect(() => {
    runChecks();
    const id = window.setInterval(runChecks, 60_000);
    return () => window.clearInterval(id);
  }, [runChecks]);

  const states = Object.values(results).map((r) => r.state);
  const anyDown = states.includes("down");
  const anyMinor = states.includes("minor");
  const allChecking = states.every((s) => s === "checking");
  const overallLabel = allChecking
    ? "Running live checks…"
    : anyDown
      ? "Service disruption detected"
      : anyMinor
        ? "Partial degradation"
        : "All systems operational";
  const overallTone = anyDown ? "down" : anyMinor ? "minor" : "operational";
  const latencies = Object.values(results)
    .map((r) => r.latencyMs)
    .filter((v): v is number => v !== null);
  const avgLatency = latencies.length
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
    : null;

  return (
    <div className="status-shell relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <div className="download-page-glow absolute inset-x-0 top-20 h-80 pointer-events-none" />

      <Navbar />

      <main className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <BackButton />

        <motion.section
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="status-card p-6 sm:p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Website Status
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                VeloRix Platform Status
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Live checks against the actual website, database, downloads, and edge services. Refreshed every 60 seconds.
              </p>

              <div className={`status-banner status-banner--${overallTone} mt-6`}>
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{overallLabel}</p>
                  <p className="text-xs text-muted-foreground">
                    {lastChecked
                      ? `Last checked ${lastChecked.toLocaleTimeString()}`
                      : "Running first check…"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runChecks}
                  disabled={checking}
                  className="ml-auto rounded-full border border-primary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50 transition-colors"
                >
                  {checking ? "Checking…" : "Re-check"}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="status-card p-5">
                <div className="mb-3 flex items-center gap-3 text-foreground">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Avg response</span>
                </div>
                <p className="text-3xl font-semibold text-foreground">
                  {avgLatency !== null ? `${avgLatency}ms` : "—"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mean latency across the {services.length} live checks above.
                </p>
              </div>

              <div className="status-card p-5">
                <div className="mb-3 flex items-center gap-3 text-foreground">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Last checked</span>
                </div>
                <p className="text-3xl font-semibold text-foreground">
                  {lastChecked ? lastChecked.toLocaleTimeString() : "—"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Auto-refresh every 60 seconds. Tap re-check anytime.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto mt-10 max-w-5xl">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">How this works</h2>
          </div>

          <div className="status-card p-6">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Each row below runs a real network request from your browser to the live VeloRix services. Green means the service responded normally, amber means it responded slowly, red means it didn't respond. No mock data.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Live services</h2>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Live · auto-refresh 60s
            </span>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;
              const r = results[service.key];
              const chipClass =
                r.state === "down"
                  ? "status-chip status-chip--minor"
                  : r.state === "minor"
                    ? "status-chip status-chip--minor"
                    : r.state === "checking"
                      ? "status-chip status-chip--operational opacity-60"
                      : "status-chip status-chip--operational";
              const chipLabel =
                r.state === "down"
                  ? "Down"
                  : r.state === "minor"
                    ? "Degraded"
                    : r.state === "checking"
                      ? "Checking…"
                      : "Operational";

              return (
                <article key={service.name} className="status-card p-5 sm:p-6">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-medium">{service.name}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    </div>

                    <span className={chipClass}>{chipLabel}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{r.detail}</span>
                    <span>
                      {r.latencyMs !== null ? `${r.latencyMs}ms response` : "—"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default StatusPage;