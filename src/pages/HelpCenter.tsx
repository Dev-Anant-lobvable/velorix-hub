import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <Navbar />
      <main className="pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <BackButton />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Help <span className="text-gradient text-glow">Center</span>
            </h1>
            <p className="text-muted-foreground mb-12 text-lg">
              Find answers to frequently asked questions about VeloXyra Tournaments.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {helpTopics.map((topic, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="glass-card px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-foreground hover:text-primary py-5 transition-colors">
                      {topic.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {topic.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div 
            className="mt-12 p-8 glass-card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">Still need help?</h2>
            <p className="text-muted-foreground mb-4">
              Our support team is here to assist you.
            </p>
            <a 
              href="mailto:service.veloxyra@gmail.com" 
              className="inline-block text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
