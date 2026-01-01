import { Instagram, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center">
              <span className="font-display font-bold text-background text-lg">V</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Velo<span className="text-gradient">Xyra</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-primary/50 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-primary/50 transition-all duration-300 group"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-primary/50 transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} VeloXyra Tournaments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
