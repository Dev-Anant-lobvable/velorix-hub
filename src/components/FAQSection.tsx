import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is VeloRix Tournaments?",
    answer:
      "VeloRix Tournaments is a competitive gaming platform that allows players to participate in esports tournaments, compete for prizes, and connect with other gamers. Whether you're a casual player or a pro, there's a tournament for you.",
  },
  {
    question: "How do I join a tournament?",
    answer:
      "Simply download the app, create your account, browse available tournaments, and register for the ones that interest you. You'll receive notifications about match schedules and results.",
  },
  {
    question: "Is the app free to download?",
    answer:
      "Yes! VeloRix Tournaments is completely free to download and use. Some premium tournaments may have entry fees, but there are plenty of free tournaments available for all skill levels.",
  },
  {
    question: "What games are supported?",
    answer:
      "We support a wide variety of popular esports titles including BGMI, Free Fire, Call of Duty Mobile, Valorant, and many more. New games are added regularly based on community demand.",
  },
  {
    question: "How do I receive my winnings?",
    answer:
      "Tournament winnings are credited directly to your in-app wallet. You can withdraw your earnings through various payment methods including UPI, bank transfer, and popular e-wallets.",
  },
  {
    question: "Can I create my own tournament?",
    answer:
      "Yes! VeloRix allows users to host their own custom tournaments. You can set the rules, prize pool, and invite players to compete. Perfect for community events and friendly competitions.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about VeloRix Tournaments.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-lg border border-border px-6 overflow-hidden shadow-card"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;