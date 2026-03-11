import { motion } from "framer-motion";

const partners = [
  "Google",
  "ESL Gaming", 
  "Riot Games",
  "Garena",
  "Krafton",
  "Qualcomm",
];

const PartnersRow = () => {
  return (
    <section className="py-8 border-t border-border/10">
      <div className="container mx-auto px-4">
        <p className="text-center text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] mb-5 font-medium">
          Games & Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {partners.map((name, i) => (
            <motion.span
              key={name}
              className="text-[15px] md:text-base font-semibold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300 select-none tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersRow;
