import { motion } from "framer-motion";
import googleLogo from "@/assets/logos/google.png";
import eslLogo from "@/assets/logos/esl.png";
import riotLogo from "@/assets/logos/riot.png";
import garenaLogo from "@/assets/logos/garena.png";
import kraftonLogo from "@/assets/logos/krafton.png";
import qualcommLogo from "@/assets/logos/qualcomm.png";

const partners = [
  { name: "Google", logo: googleLogo },
  { name: "ESL Gaming", logo: eslLogo },
  { name: "Riot Games", logo: riotLogo },
  { name: "Garena", logo: garenaLogo },
  { name: "Krafton", logo: kraftonLogo },
  { name: "Qualcomm", logo: qualcommLogo },
];

const PartnersRow = () => {
  return (
    <section className="py-8 border-t border-border/10">
      <div className="container mx-auto px-4">
        <p className="text-center text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] mb-5 font-medium">
          Games & Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {partners.map((p, i) => (
            <motion.img
              key={p.name}
              src={p.logo}
              alt={p.name}
              className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersRow;
