import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Mail, Instagram } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
  useScrollToTop();
  
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send us an email anytime",
      value: "service.veloxyra@gmail.com",
      href: "mailto:service.veloxyra@gmail.com"
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Follow us for updates",
      value: "@velorix_tournaments",
      href: "https://www.instagram.com/velorix_tournaments"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <Navbar />
      <main className="pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <BackButton />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Contact <span className="text-gradient text-glow">Us</span>
            </h1>
            <p className="text-muted-foreground mb-12 text-lg">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactMethods.map((method) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-6 glass-card hover:border-primary/50 transition-all group"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-accent/80 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <method.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-primary text-sm mt-1">{method.value}</p>
                </div>
              </motion.a>
            ))}

            {/* X/Twitter Card */}
            <motion.a
              href="https://x.com/Anant__sgh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 glass-card hover:border-primary/50 transition-all group"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-accent/80 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative"
                whileHover={{ rotate: 5 }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors relative z-10">
                  <XIcon />
                </span>
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">X (Twitter)</h3>
                <p className="text-sm text-muted-foreground">Follow for announcements</p>
                <p className="text-primary text-sm mt-1">@Anant__sgh</p>
              </div>
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-12 p-8 glass-card border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">Response Time</h2>
            <p className="text-muted-foreground">
              We typically respond to all inquiries within 24-48 hours. For urgent matters related to 
              ongoing tournaments, please mention "URGENT" in your subject line.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
