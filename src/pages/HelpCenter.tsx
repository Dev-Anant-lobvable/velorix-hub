import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  useScrollToTop();
  
  const helpTopics = [
    {
      question: "How do I join a tournament?",
      answer: "Download the VeloXyra app, create an account, and browse available tournaments. Select the tournament you want to join and tap 'Join Now' to register."
    },
    {
      question: "How do I receive my rewards?",
      answer: "Rewards are automatically credited to your VeloXyra wallet after tournament completion. You can withdraw them to your preferred payment method from the app."
    },
    {
      question: "What happens if I disconnect during a match?",
      answer: "If you disconnect, try to rejoin as quickly as possible. Our system allows a grace period for reconnection. If you cannot rejoin, the match result will be determined based on the game's default rules."
    },
    {
      question: "How do I report a cheater?",
      answer: "You can report suspicious activity through the app by going to the match details and selecting 'Report Player'. Provide as much detail as possible."
    },
    {
      question: "Can I cancel my tournament registration?",
      answer: "Yes, you can cancel your registration before the tournament starts. Any entry fees will be refunded to your wallet."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <BackButton />
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Find answers to frequently asked questions about VeloXyra Tournaments.
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            {helpTopics.map((topic, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-foreground hover:text-primary py-4">
                  {topic.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {topic.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Still need help?</h2>
            <p className="text-muted-foreground mb-4">
              Our support team is here to assist you.
            </p>
            <a 
              href="mailto:service.veloxyra@gmail.com" 
              className="text-primary hover:underline font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
