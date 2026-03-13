import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import velorixLogo from "@/assets/velorix-logo.png";

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

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/velorix_tournaments", label: "Follow us on Instagram" },
    { icon: XIcon, href: "https://x.com/Anant__sgh", label: "Follow us on X", isCustom: true },
    { icon: Mail, href: "mailto:service.veloxyra@gmail.com", label: "Email us" },
  ];

  return (
    <footer className="py-16 border-t border-border bg-background relative overflow-hidden">
      {/* Static ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="block">
              <img
                src={velorixLogo}
                alt="VeloRix"
                width={120}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The premier esports tournament platform. Compete, win, and dominate.
            </p>
          </div>

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

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect With Us</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-all duration-300 group"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.isCustom ? (
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      <XIcon />
                    </span>
                  ) : (
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VeloRix Tournaments. All rights reserved.
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
