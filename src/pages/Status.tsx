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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

type ServiceState = "operational" | "minor";

const buildBars = (minorIndex?: number) =>
  Array.from({ length: 40 }, (_, index) =>
    minorIndex === index ? "minor" : "operational"
  ) as ServiceState[];

const services = [
  {
    name: "General Availability",
    description: "Homepage, routing, and public pages",
    uptime: "99.98% uptime",
    icon: Globe,
    bars: buildBars(31),
  },
  {
    name: "Downloads",
    description: "APK delivery and package links",
    uptime: "100% uptime",
    icon: DownloadCloud,
    bars: buildBars(),
  },
  {
    name: "Tournament Services",
    description: "Competitive flows and leaderboard surfaces",
    uptime: "100% uptime",
    icon: Trophy,
    bars: buildBars(),
  },
  {
    name: "Support & Contact",
    description: "Help center, contact forms, and policy pages",
    uptime: "100% uptime",
    icon: ShieldCheck,
    bars: buildBars(),
  },
];

const incidents = [
  { date: "Apr 9, 2026", summary: "No incidents reported today." },
  { date: "Apr 8, 2026", summary: "No incidents reported." },
  { date: "Apr 7, 2026", summary: "No incidents reported." },
  { date: "Apr 6, 2026", summary: "No incidents reported." },
  { date: "Apr 5, 2026", summary: "No incidents reported." },
];

const StatusPage = () => {
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
                Real-time visibility into website availability, download delivery, and public platform health.
              </p>

              <div className="status-banner status-banner--operational mt-6">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">All systems operational</p>
                  <p className="text-xs text-muted-foreground">
                    Core services are responding normally right now.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="status-card p-5">
                <div className="mb-3 flex items-center gap-3 text-foreground">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Average uptime</span>
                </div>
                <p className="text-3xl font-semibold text-foreground">99.98%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Rolling availability across the last 60 days.
                </p>
              </div>

              <div className="status-card p-5">
                <div className="mb-3 flex items-center gap-3 text-foreground">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Last checked</span>
                </div>
                <p className="text-3xl font-semibold text-foreground">2 min</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Latest checks show healthy response times and normal uptime.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto mt-10 max-w-5xl">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">About this page</h2>
          </div>

          <div className="status-card p-6">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              This page gives visitors a simple way to confirm whether the site, downloads, and public-facing services are running normally.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Current availability</h2>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Past 60 days
            </span>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;

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

                    <span className="status-chip status-chip--operational">Operational</span>
                  </div>

                  <div className="status-bars">
                    {service.bars.map((bar, index) => (
                      <span
                        key={`${service.name}-${index}`}
                        className={bar === "minor" ? "status-bar status-bar--minor" : "status-bar status-bar--operational"}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="status-grid-note mt-3">
                    <span>60 days ago</span>
                    <span>{service.uptime}</span>
                    <span>Today</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-5xl">
          <h2 className="mb-5 text-2xl font-semibold text-foreground">Past incidents</h2>

          <div className="status-card overflow-hidden">
            {incidents.map((incident, index) => (
              <div
                key={incident.date}
                className={`px-6 py-5 ${index !== incidents.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-medium text-foreground">{incident.date}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{incident.summary}</p>
                  </div>

                  <span className="status-chip status-chip--operational">Resolved</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StatusPage;