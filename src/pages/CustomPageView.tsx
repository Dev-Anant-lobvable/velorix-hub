import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "@/lib/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CustomPage, publicDb, withTimeout } from "@/lib/adminControl";
import NotFound from "@/pages/NotFound";

const CustomPageView = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<CustomPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let active = true;

    const load = async () => {
      const { data } = await withTimeout(
        publicDb.from("custom_pages").select("*").eq("slug", slug).eq("published", true).maybeSingle(),
        "Page took too long to load."
      ).catch(() => ({ data: null }));
      if (!active) return;
      setPage(data ?? null);
      setLoading(false);
    };

    load();
    const channel = publicDb
      .channel(`custom-page-${slug}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "custom_pages", filter: `slug=eq.${slug}` }, load)
      .subscribe();

    return () => {
      active = false;
      publicDb.removeChannel(channel);
    };
  }, [slug]);

  if (loading) return <div className="grid min-h-screen place-items-center bg-background text-foreground">Loading page...</div>;
  if (!page) return <NotFound />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-30" />
      <Navbar />

      <main className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back home</Link>
        </Button>
        <article className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">
            <FileText className="h-4 w-4" /> VeloRix Page
          </div>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-6xl">{page.title}</h1>
          {page.subtitle ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{page.subtitle}</p> : null}
          <div className="mt-10 space-y-5 text-base leading-8 text-foreground/90">
            {page.content.split(/\n{2,}/).map((block, index) => (
              <p key={index}>{block}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default CustomPageView;