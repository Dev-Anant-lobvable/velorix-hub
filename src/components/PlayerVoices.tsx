import { useEffect, useState } from "react";
import { Star, Trophy, Users, ShieldCheck } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "@/components/reactbits/CountUp";
import { fetchSocialProof, SocialProofConfig } from "@/lib/socialProof";

const CACHE_KEY = "vx-social-proof";

const readCache = (): SocialProofConfig | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as SocialProofConfig) : null;
  } catch {
    return null;
  }
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i <= Math.round(rating) ? "text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const PlayerVoices = () => {
  // Seed from the last known values so returning visitors never see a blank flash.
  const [data, setData] = useState<SocialProofConfig | null>(readCache);
  const [cached] = useState<SocialProofConfig | null>(readCache);

  useEffect(() => {
    let active = true;
    fetchSocialProof().then((config) => {
      if (!active) return;
      setData(config);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(config));
      } catch {
        /* storage unavailable — non-fatal */
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Only shimmer when we know there is content coming (avoids a block that vanishes).
  if (!data && cached) {
    return (
      <section className="py-20" aria-busy="true">
        <div className="container mx-auto px-4">
          <Skeleton className="mx-auto h-10 w-64" />
          <Skeleton className="mx-auto mt-4 h-4 w-80" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Tournaments hosted", value: data.tournamentsHosted, Icon: Trophy },
    { label: "Payouts sent", value: data.payoutsSent, Icon: ShieldCheck },
    { label: "Player reviews", value: data.reviews, Icon: Users },
  ].filter((stat) => stat.value > 0);

  const hasRating = data.rating > 0 && data.reviews > 0;

  // Nothing configured yet — stay silent instead of showing made-up numbers.
  if (!stats.length && !data.testimonials.length && !hasRating) return null;

  return (
    <section id="player-voices" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">
            Real players
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            What the <span className="text-gradient">squad</span> says
          </h2>
          {hasRating ? (
            <div className="mt-4 flex items-center justify-center gap-3">
              <Stars rating={data.rating} />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{data.rating.toFixed(1)}</span> from{" "}
                <CountUp to={data.reviews} separator="," className="font-semibold text-foreground" /> reviews
              </p>
            </div>
          ) : null}
        </div>

        {stats.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, Icon }) => (
              <div key={label} className="glass-card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    <CountUp to={value} separator="," />
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {data.testimonials.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.testimonials.map((item) => (
              <figure key={`${item.name}-${item.quote.slice(0, 12)}`} className="glass-card p-5">
                <blockquote className="text-sm leading-6 text-muted-foreground">"{item.quote}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-foreground">{item.name || "VeloRix player"}</span>
                  {item.handle ? <span className="text-muted-foreground"> · {item.handle}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PlayerVoices;
