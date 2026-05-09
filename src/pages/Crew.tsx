import { useEffect, useState } from "react";
import { Crown, Shield, Swords, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { adminControl } from "@/lib/adminControl";

const SESSION_KEY = "vx-admin-session";

const Crew = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clicks >= 4) setOpen(true);
  }, [clicks]);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminControl<{ token: string }>({ action: "login", password });
      sessionStorage.setItem(SESSION_KEY, data.token);
      navigate("/vx-control");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Access denied");
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-30" />
      <Navbar />

      <main className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <BackButton />
        <section className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">
            <Shield className="h-4 w-4" /> VeloRix Crew
          </div>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-6xl">Admins aur owners ka command room.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Ye jagah sirf trusted squad ke naam, zimmedari aur site updates ke liye hai. Real control panel public menu me nahi dikhta.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [Crown, "Owner", "Brand, launches, aur final calls."],
              [Swords, "Admins", "Events, notices, aur page updates."],
              [Terminal, "Ops", "Maintenance mode aur emergency switches."],
            ].map(([Icon, title, copy]) => (
              <article key={String(title)} className="glass-card p-5">
                <Icon className="mb-4 h-7 w-7 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(copy)}</p>
              </article>
            ))}
          </div>
        </section>

        <button
          type="button"
          aria-label="Crew signal"
          onClick={() => setClicks((value) => value + 1)}
          className="fixed bottom-5 right-5 h-3 w-3 rounded-full bg-primary/40 opacity-30 transition-opacity hover:opacity-100"
        />
      </main>

      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-primary/20 bg-background/95">
          <DialogHeader>
            <DialogTitle>Private crew verification</DialogTitle>
            <DialogDescription>Password har baar fresh poocha jayega. Browser me permanent save nahi hoga.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && login()}
              placeholder="Access phrase"
              autoFocus
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button onClick={login} disabled={loading} className="w-full">
              {loading ? "Checking..." : "Enter control room"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Crew;