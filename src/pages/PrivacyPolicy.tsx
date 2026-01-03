import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                participate in tournaments, or contact us for support. This may include your name, 
                email address, and gaming profile information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                process tournament entries, send you notifications about matches and rewards, 
                and communicate with you about products, services, and events.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
              <p>
                We do not sell or share your personal information with third parties except as 
                described in this policy. We may share information with service providers who 
                assist us in operating our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from loss, 
                theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPolicy;
