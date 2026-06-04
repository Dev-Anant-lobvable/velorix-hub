import { useEffect, useMemo, useState } from "react";
import { FileText, LogOut, Plus, RadioTower, Save, Trash2, Wrench } from "@/lib/icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { adminControl, CustomPage, DEFAULT_MAINTENANCE_MESSAGE, normalizeMaintenance, publicDb, withTimeout } from "@/lib/adminControl";
import { useToast } from "@/hooks/use-toast";

const SESSION_KEY = "vx-admin-session";

const blankPage: CustomPage = {
  slug: "",
  title: "",
  subtitle: "",
  content: "",
  published: false,
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [current, setCurrent] = useState<CustomPage>(blankPage);
  const [maintenance, setMaintenance] = useState({ enabled: false, message: DEFAULT_MAINTENANCE_MESSAGE });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);

  const sortedPages = useMemo(() => [...pages].sort((a, b) => a.slug.localeCompare(b.slug)), [pages]);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) {
      navigate("/crew", { replace: true });
      return;
    }
    setToken(saved);
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const { pages: adminPages } = await adminControl<{ pages: CustomPage[] }>({ action: "list_pages", token });
        setPages(adminPages ?? []);
        const config = await withTimeout(
          publicDb.from("site_config").select("value").eq("key", "maintenance").maybeSingle(),
          "Maintenance status took too long, using safe default."
        ).catch(() => null);
        setMaintenance(normalizeMaintenance(config?.data?.value));
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Backend did not respond. Try again.");
        toast({ title: "Control room not ready", description: err instanceof Error ? err.message : "Try again", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate, toast, token]);

  useEffect(() => {
    const pagesChannel = publicDb
      .channel("vx-admin-pages")
      .on("postgres_changes", { event: "*", schema: "public", table: "custom_pages" }, () => {
        if (!token) return;
        adminControl<{ pages: CustomPage[] }>({ action: "list_pages", token }).then((data) => setPages(data.pages ?? [])).catch(() => null);
      })
      .subscribe();

    const configChannel = publicDb
      .channel("vx-admin-config")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_config", filter: "key=eq.maintenance" }, (payload) => {
        setMaintenance(normalizeMaintenance((payload.new as { value?: unknown } | null)?.value));
      })
      .subscribe();

    return () => {
      publicDb.removeChannel(pagesChannel);
      publicDb.removeChannel(configChannel);
    };
  }, [token]);

  const saveMaintenance = async (enabled = maintenance.enabled) => {
    if (!token) return;
    setSaving(true);
    try {
      const data = await adminControl<{ config: { value: unknown } }>({
        action: "set_maintenance",
        token,
        enabled,
        message: maintenance.message,
      });
      setMaintenance(normalizeMaintenance(data.config.value));
      toast({ title: enabled ? "Maintenance ON" : "Maintenance OFF", description: "Visitors will see the latest state live." });
    } catch (err) {
      toast({ title: "Could not update", description: err instanceof Error ? err.message : "Try again", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const savePage = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const data = await adminControl<{ page: CustomPage }>({ action: "save_page", token, page: current });
      setCurrent(data.page);
      setPages((items) => [data.page, ...items.filter((item) => item.slug !== data.page.slug)]);
      toast({ title: "Page saved", description: data.page.published ? `/p/${data.page.slug} is live.` : "Saved as draft." });
    } catch (err) {
      toast({ title: "Page not saved", description: err instanceof Error ? err.message : "Check fields", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async (slug: string) => {
    if (!token || !slug) return;
    setSaving(true);
    try {
      await adminControl<{ ok: boolean }>({ action: "delete_page", token, slug });
      setPages((items) => items.filter((item) => item.slug !== slug));
      if (current.slug === slug) setCurrent(blankPage);
      toast({ title: "Page deleted", description: `${slug} removed from CMS.` });
    } catch (err) {
      toast({ title: "Delete failed", description: err instanceof Error ? err.message : "Try again", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/crew", { replace: true });
  };

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-background text-foreground">Loading control room...</div>;
  }

  if (loadError) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center text-foreground">
        <div className="glass-card max-w-md p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Control room offline</p>
          <h1 className="mt-3 text-3xl font-bold">Backend abhi wake up ho raha hai</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{loadError}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button variant="outline" onClick={logout}>Back to login</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-30" />
      <Navbar />

      <main className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">
              <RadioTower className="h-4 w-4" /> Private Control
            </p>
            <h1 className="text-4xl font-bold text-foreground sm:text-6xl">VeloRix command panel</h1>
          </div>
          <Button variant="outline" onClick={logout}><LogOut className="h-4 w-4" /> Exit</Button>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="glass-card p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Maintenance</h2>
              </div>
              <Switch checked={maintenance.enabled} onCheckedChange={(value) => { setMaintenance((prev) => ({ ...prev, enabled: value })); saveMaintenance(value); }} />
            </div>
            <Textarea value={maintenance.message} onChange={(event) => setMaintenance((prev) => ({ ...prev, message: event.target.value }))} className="min-h-28" />
            <Button className="mt-4 w-full" onClick={() => saveMaintenance()} disabled={saving}><Save className="h-4 w-4" /> Save maintenance text</Button>
          </article>

          <article className="glass-card p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Custom page</h2>
              </div>
              <Button variant="outline" onClick={() => setCurrent(blankPage)}><Plus className="h-4 w-4" /> New</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="slug like diwali-cup" value={current.slug} onChange={(event) => setCurrent({ ...current, slug: event.target.value })} />
              <Input placeholder="page title" value={current.title} onChange={(event) => setCurrent({ ...current, title: event.target.value })} />
            </div>
            <Input className="mt-3" placeholder="subtitle" value={current.subtitle ?? ""} onChange={(event) => setCurrent({ ...current, subtitle: event.target.value })} />
            <Textarea className="mt-3 min-h-56" placeholder="Write page content here..." value={current.content} onChange={(event) => setCurrent({ ...current, content: event.target.value })} />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 text-sm text-muted-foreground"><Switch checked={current.published} onCheckedChange={(value) => setCurrent({ ...current, published: value })} /> Publish page</label>
              <Button onClick={savePage} disabled={saving}><Save className="h-4 w-4" /> Save page</Button>
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-3">
          {sortedPages.map((page) => (
            <article key={page.slug} className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">{page.title}</p>
                <p className="text-sm text-muted-foreground">/p/{page.slug} · {page.published ? "Live" : "Draft"}</p>
              </div>
              <div className="flex gap-2">
                {page.published ? <Button variant="outline" asChild><Link to={`/p/${page.slug}`}>View</Link></Button> : null}
                <Button variant="secondary" onClick={() => setCurrent(page)}>Edit</Button>
                <Button variant="destructive" size="icon" onClick={() => deletePage(page.slug)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;