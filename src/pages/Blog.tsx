import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "@/lib/icons";
import useScrollToTop from "@/hooks/useScrollToTop";

const posts = [
  {
    title: "Introducing VeloRix Tournaments",
    excerpt: "We built VeloRix because we were tired of scammy tournament apps. Here's our story and what makes us different.",
    date: "Apr 7, 2026",
    readTime: "4 min",
    tag: "Announcement",
    slug: "#",
  },
  {
    title: "How Anti-Cheat Works in VeloRix",
    excerpt: "A deep dive into our multi-layer anti-cheat system that keeps matches fair for every player.",
    date: "Apr 3, 2026",
    readTime: "6 min",
    tag: "Engineering",
    slug: "#",
  },
  {
    title: "Season 1 Recap: By the Numbers",
    excerpt: "424K+ players, 30K tournaments, and ₹12L+ in payouts. Here's what happened in Season 1.",
    date: "Mar 28, 2026",
    readTime: "3 min",
    tag: "Updates",
    slug: "#",
  },
  {
    title: "Building for Low-End Android Devices",
    excerpt: "How we optimized VeloRix to run smoothly on phones with 2GB RAM and entry-level processors.",
    date: "Mar 20, 2026",
    readTime: "7 min",
    tag: "Engineering",
    slug: "#",
  },
  {
    title: "Tournament Hosting: A Complete Guide",
    excerpt: "Everything you need to know about creating and managing your own tournaments on VeloRix.",
    date: "Mar 12, 2026",
    readTime: "5 min",
    tag: "Guide",
    slug: "#",
  },
  {
    title: "Payouts Made Instant with UPI",
    excerpt: "We partnered with leading payment providers to make sure winners get paid within minutes.",
    date: "Mar 5, 2026",
    readTime: "3 min",
    tag: "Product",
    slug: "#",
  },
];

const tagColors: Record<string, string> = {
  Announcement: "text-primary border-primary/20",
  Engineering: "text-sky-400 border-sky-400/20",
  Updates: "text-emerald-400 border-emerald-400/20",
  Guide: "text-amber-400 border-amber-400/20",
  Product: "text-violet-400 border-violet-400/20",
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Blog = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10 max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">Blog</h1>
          <p className="text-muted-foreground text-lg">Updates, stories, and deep dives from the VeloRix team.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <Link to={post.slug} className="block h-full p-6 rounded-xl bg-card border border-border hover:border-primary/25 transition-all duration-300 hover:shadow-[0_4px_20px_hsl(0_0%_0%/0.5),0_0_30px_hsl(350_85%_55%/0.06)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${tagColors[post.tag] || "text-muted-foreground border-border"}`}>
                    {post.tag}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 flex items-start gap-1.5">
                  {post.title}
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
