import { Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">V</span>
            </div>
            <span className="font-semibold text-xl text-foreground">
              Velo<span className="text-primary">Span</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/veloxyra._.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-all duration-300 group"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://x.com/Anant__sgh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-all duration-300 group"
              aria-label="Follow us on X"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:service.veloxyra@gmail.com"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-all duration-300 group"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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