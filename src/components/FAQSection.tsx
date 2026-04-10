import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { playSound } from "@/hooks/useSoundEffect";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref, isInView } = useScrollAnimation(0.1);

  const handleToggle = () => {
    playSound("/sounds/external-link.mp3", 0.25);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="faq" className="py-20 bg-secondary relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked{" "}
            <span className="text-gradient text-glow">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stuff people usually ask us before downloading.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible onValueChange={handleToggle}>
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="faq-glass-card px-6 border-0"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium relative z-10">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-5 relative z-10">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </motion.div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
