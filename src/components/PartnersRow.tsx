import { motion } from "framer-motion";

const partners = [
  { name: "Google", color: "#4285F4" },
  { name: "ESL Gaming", color: "#FFB800" },
  { name: "Riot Games", color: "#D32936" },
  { name: "Garena", color: "#FF5722" },
  { name: "Krafton", color: "#00C853" },
  { name: "Qualcomm", color: "#3253DC" },
];

const PartnersRow = () => {
  return (
    <section className="py-8 border-t border-border/20">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs text-muted-foreground/60 uppercase tracking-widest mb-6">
          Games & Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              className="opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              whileHover={{ opacity: 0.9, scale: 1.08 }}
            >
              <span
                className="text-lg md:text-xl font-bold tracking-tight select-none"
                style={{ color: p.color, fontFamily: "'Orbitron', sans-serif" }}
              >
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersRow;
