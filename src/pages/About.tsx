import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Trophy, Users, Zap } from "@/lib/icons";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSeo from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const values = [
  {
    icon: Shield,
    title: "Fair play first",
    text: "Every prize tournament runs with statistical anomaly checks, an evidence-based dispute window and an audit trail on results.",
  },
  {
    icon: Zap,
    title: "Built for real phones",
    text: "We develop and test against 2GB-RAM Android devices on unstable mobile data, because that is what most of our players actually use.",
  },
  {
    icon: Trophy,
    title: "Skill, not chance",
    text: "VeloRix runs skill-based esports competitions. Results come from performance in the match, never from a random draw.",
  },
  {
    icon: Users,
    title: "Community-run",
    text: "Formats, scoring and rules get changed based on player feedback, and we publish what changed in our changelog.",
  },
];

const About = () => {
  useScrollToTop();

  useSeo({
    title: "About VeloRix Tournaments — Who We Are",
    description:
      "VeloRix Tournaments is an India-based skill-based esports platform for Free Fire, BGMI and other mobile titles. Learn who runs it, how it works and what we stand for.",
    path: "/about",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VeloRix Tournaments",
      url: "https://velorix-hub.vercel.app",
      email: "service.veloxyra@gmail.com",
      description:
        "India-based skill-based esports tournament platform for Free Fire, BGMI and other mobile titles.",
    },
  });

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-30" />
      <Navbar />

      <main className="container relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-28">
        <Link
          to="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">About VeloRix</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            VeloRix Tournaments is an independent, India-based esports platform for mobile competitive gaming — Free
            Fire, BGMI, Call of Duty Mobile and more. We host structured tournaments, publish results transparently and
            write guides for players who want to get better.
          </p>
        </motion.div>

        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Why we started this</h2>
          <p className="mb-5 text-[15px] leading-[1.85] text-muted-foreground">
            VeloRix began because we got scammed. We paid entry fees into a mobile tournament that never opened its room,
            and the organiser's account vanished the next morning. It was a small amount of money and an enormous amount
            of frustration — and after asking around, we learned that almost every competitive mobile player in India has
            the same story.
          </p>
          <p className="mb-5 text-[15px] leading-[1.85] text-muted-foreground">
            So we built the thing we wished had existed: a tournament platform where rules are published before
            registration opens, where results carry an audit trail, where disputes get reviewed by an actual human within
            a defined window, and where the app runs properly on the budget Android phones most of our community plays
            on. We are a small independent team, not a funded studio, and every feature ships because a player asked for
            it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">What we stand for</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <v.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="mb-2 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">How VeloRix works</h2>
          <ol className="space-y-3">
            {[
              "Download the Android app and create an account with your in-game ID.",
              "Browse open tournaments. Each listing states the game, mode, slot count, scoring system, prize distribution and schedule up front.",
              "Register before the deadline. Room credentials are released to registered participants at a fixed time before the match.",
              "Play the match. Results are submitted with scoreboard evidence and posted to a public points table.",
              "Disputes open for a fixed window after results. Prize payouts release once that window closes.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3 text-[15px] leading-[1.8] text-muted-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Responsible competitive gaming</h2>
          <p className="mb-5 text-[15px] leading-[1.85] text-muted-foreground">
            VeloRix hosts skill-based esports competitions. Outcomes depend on player performance in the match — there is
            no wagering, no game of chance and no random-outcome betting on the platform. Paid-entry tournaments are
            intended for participants who are 18 or older, or who have verified guardian consent where local law requires
            it, and we do not operate paid tournaments in jurisdictions where such contests are restricted.
          </p>
          <p className="mb-5 text-[15px] leading-[1.85] text-muted-foreground">
            Competitive gaming should stay fun. Set a limit on what you spend on entry fees, take breaks between matches,
            and never treat tournament entry as a source of income. If gaming is affecting your sleep, studies, work or
            finances, step away and talk to someone you trust.
          </p>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Get in touch</h2>
          <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">
            Questions about a tournament, a dispute, a partnership or press? We read everything that comes in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              to="/help"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30"
            >
              Help centre
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
