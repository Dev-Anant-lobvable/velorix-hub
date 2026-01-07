import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";

const TermsOfService = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <BackButton />
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using VeloXyra Tournaments, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Eligibility</h2>
              <p>
                You must be at least 18 years old to participate in tournaments with real rewards. 
                Users under 18 may use the platform with parental consent for practice tournaments only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Fair Play</h2>
              <p>
                All participants must compete fairly. Cheating, hacking, or using unauthorized software 
                will result in immediate disqualification and account termination. We have zero tolerance 
                for unfair practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Rewards & Payments</h2>
              <p>
                Rewards are distributed according to tournament rules. VeloXyra reserves the right to 
                withhold rewards in cases of suspected fraud or rule violations pending investigation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Account Responsibility</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials. 
                Any activity under your account is your responsibility.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Contact</h2>
              <p>
                For questions about these terms, contact us at{" "}
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

export default TermsOfService;
