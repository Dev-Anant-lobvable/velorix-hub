import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">How We Use Cookies</h2>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Authentication and security</li>
                <li>Preferences and settings</li>
                <li>Analytics to improve our services</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that 
                removing or blocking cookies may impact your user experience and some features may 
                not function properly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p>
                If you have questions about our cookie policy, please contact us at{" "}
                <a href="mailto:service.veloxyra@gmail.com" className="text-primary hover:underline">
                  service.veloxyra@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
