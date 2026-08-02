import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "@/lib/icons";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSeo from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const tagColors: Record<string, string> = {
  Guide: "text-amber-400 border-amber-400/20",
  Strategy: "text-sky-400 border-sky-400/20",
  Engineering: "text-emerald-400 border-emerald-400/20",
  Community: "text-violet-400 border-violet-400/20",
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Blog = () => {
  useScrollToTop();

  useSeo({
    title: "VeloRix Blog — Free Fire & BGMI Guides, Strategy and Tournament Coverage",
    description:
      "In-depth guides on Free Fire sensitivity, BGMI rotations, tournament formats, anti-cheat and building a competitive squad, written by the VeloRix esports team.",
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "VeloRix Blog",
      url: "https://velorix-hub.vercel.app/blog",
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.excerpt,
        datePublished: p.isoDate,
        url: `https://velorix-hub.vercel.app/blog/${p.slug}`,
      })),
    },
  });

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20 relative z-10 max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Guides, strategy breakdowns and engineering notes from the VeloRix team — written for players competing on
            real phones in real tournaments.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="flex h-full flex-col p-6 rounded-xl bg-card border border-border hover:border-primary/25 transition-all duration-300 hover:shadow-[0_4px_20px_hsl(0_0%_0%/0.5),0_0_30px_hsl(350_85%_55%/0.06)]">
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
                    <time dateTime={post.isoDate}>{post.date}</time>
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
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
