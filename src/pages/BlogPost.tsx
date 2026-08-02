import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Users } from "@/lib/icons";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSeo from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { blogPosts, getPostBySlug, type Block } from "@/data/blogPosts";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 mb-4 text-2xl font-bold text-foreground scroll-mt-24">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-foreground">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mb-5 text-[15px] leading-[1.85] text-muted-foreground">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-[1.8] text-muted-foreground">
              <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mb-6 space-y-3">
          {block.items.map((item, idx) => (
            <li key={item} className="flex gap-3 text-[15px] leading-[1.8] text-muted-foreground">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-xs font-semibold text-primary">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-8 rounded-r-xl border-l-2 border-primary bg-card/60 px-5 py-4 text-[15px] italic leading-[1.8] text-foreground/90"
        >
          {block.text}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  useScrollToTop();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useSeo({
    title: post ? `${post.title} | VeloRix Blog` : "Article not found | VeloRix",
    description: post?.excerpt ?? "VeloRix esports guides and tournament coverage.",
    path: `/blog/${slug ?? ""}`,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.isoDate,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "VeloRix Tournaments" },
          mainEntityOfPage: `https://velorix-hub.vercel.app/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <Navbar />

      <main className="container relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-28">
        <Link
          to="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All articles
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-10 border-b border-border pb-8"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
            {post.tag}
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{post.title}</h1>
          <p className="mb-5 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} read
            </span>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {post.body.map(renderBlock)}
        </motion.article>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-5 text-lg font-semibold text-foreground">Keep reading</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/25"
              >
                <span className="text-xs text-primary">{r.tag}</span>
                <p className="mt-2 flex items-start gap-1 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                  {r.title}
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
