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
      "It's a tournament app for mobile gamers. You join matches, play against real people, and win rewards. We run daily tournaments for games like Free Fire, BGMI, and more.",
  },
  {
    question: "How do I join a tournament?",
    answer:
      "Download the app, make an account, and check the tournament list. Tap on one you like, register, and show up when the match starts. You'll get a notification before it begins.",
  },
  {
    question: "Is the app free?",
    answer:
      "Yeah, the app is free. Some tournaments have a small entry fee, but there are always free ones running too.",
  },
  {
    question: "Which games can I play?",
    answer:
      "Right now we run tournaments for Free Fire, BGMI, Call of Duty Mobile, and a few others. We keep adding more based on what players ask for.",
  },
  {
    question: "How do I get my winnings?",
    answer:
      "Winnings go to your in-app wallet. From there you can withdraw via UPI, bank transfer, or e-wallets like Paytm. It usually takes a few minutes.",
  },
  {
    question: "Can I host my own tournament?",
    answer:
      "Yep. You can create a custom tournament, set your own rules and prize pool, and invite your friends or open it up to everyone.",
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