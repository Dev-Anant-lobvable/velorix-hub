import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Instagram } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
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
      value: "@veloxyra._.official",
      href: "https://www.instagram.com/veloxyra._.official"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <div className="grid gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                  <method.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-primary text-sm mt-1">{method.value}</p>
                </div>
              </a>
            ))}

            {/* X/Twitter Card */}
            <a
              href="https://x.com/Anant__sgh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  <XIcon />
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">X (Twitter)</h3>
                <p className="text-sm text-muted-foreground">Follow for announcements</p>
                <p className="text-primary text-sm mt-1">@Anant__sgh</p>
              </div>
            </a>
          </div>

          <div className="mt-12 p-6 bg-accent/30 border border-primary/20 rounded-lg">
            <h2 className="text-xl font-semibold text-foreground mb-2">Response Time</h2>
            <p className="text-muted-foreground">
              We typically respond to all inquiries within 24-48 hours. For urgent matters related to 
              ongoing tournaments, please mention "URGENT" in your subject line.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
