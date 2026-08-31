import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";

const SUPPORT_EMAIL = "service.veloxyra@gmail.com";

const RefundPolicy = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <BackButton />
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Refund &amp; Cancellation Policy
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: August 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Entry Fees</h2>
              <p>
                Some VeloRix tournaments are free to enter, others carry a small entry
                fee that goes straight into the prize pool. Whenever an entry fee
                applies, it is shown clearly before you confirm your slot.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                When you get a full refund
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The tournament is cancelled or postponed by VeloRix.</li>
                <li>The match room never goes live or credentials are never shared.</li>
                <li>You are removed from a match because of an error on our side.</li>
                <li>A duplicate or failed payment was charged to you.</li>
              </ul>
              <p>
                Refunds are credited back to your VeloRix wallet instantly, or to the
                original payment method within 5–7 working days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Self-cancellation</h2>
              <p>
                You can cancel your own registration up to 30 minutes before the
                scheduled start time for a 100% wallet refund. After that window the
                slot is locked, because prize pools and lobby slots are already
                allocated.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                When refunds are not issued
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You did not join the lobby in time or your device/network failed.</li>
                <li>You were disqualified for cheating, hacking, teaming or abuse.</li>
                <li>You lost the match — entry fees are not performance-based.</li>
                <li>The request comes more than 7 days after the match date.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                How to raise a refund request
              </h2>
              <p>
                Email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                  {SUPPORT_EMAIL}
                </a>{" "}
                with your in-game name, tournament name, match time and payment
                reference. We respond within 48 hours and settle valid requests within
                7 working days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Grievance Officer
              </h2>
              <p>
                In line with Indian IT Rules, complaints that are not resolved by
                support can be escalated to our Grievance Officer:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li>
                  <strong className="text-foreground">Name:</strong> Anant Singh
                </li>
                <li>
                  <strong className="text-foreground">Designation:</strong> Grievance
                  Officer, VeloRix Tournaments
                </li>
                <li>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                    {SUPPORT_EMAIL}
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Jurisdiction:</strong> India
                </li>
              </ul>
              <p>
                Grievances are acknowledged within 24 hours and resolved within 15 days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Skill-based gaming notice
              </h2>
              <p>
                VeloRix hosts skill-based esports tournaments only. There is no betting,
                wagering or games of chance on the platform. Entry is restricted to
                users aged 18 and above, and to states where skill-based contests are
                permitted.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
