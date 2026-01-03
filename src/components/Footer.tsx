import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import veloxyraLogo from "@/assets/veloxyra-logo.png";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="py-16 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img 
                src={veloxyraLogo} 
                alt="VeloXyra" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The premier esports tournament platform. Compete, win, and dominate.
            </p>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect With Us</h3>
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
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  <XIcon />
                </span>
              </a>
              <a
                href="mailto:service.veloxyra@gmail.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-all duration-300 group"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VeloXyra Tournaments. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with passion for gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
