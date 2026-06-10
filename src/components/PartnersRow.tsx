import { motion } from "framer-motion";
import googleLogo from "@/assets/logos/google.png";
import eslLogo from "@/assets/logos/esl.png";
import riotLogo from "@/assets/logos/riot.png";
import garenaLogo from "@/assets/logos/garena.png";
import qualcommLogo from "@/assets/logos/qualcomm.png";
import rockstarLogo from "@/assets/logos/rockstar.png";
import cognosphereLogo from "@/assets/logos/cognosphere.png";
import kuroGamesLogo from "@/assets/logos/kuro-games.svg";
import residentEvilLogo from "@/assets/logos/resident-evil.png";

const partners = [
  { name: "Google", logo: googleLogo, invert: false },
  { name: "ESL Gaming", logo: eslLogo, invert: false },
  { name: "Riot Games", logo: riotLogo, invert: false },
  { name: "Garena", logo: garenaLogo, invert: false },
  { name: "Qualcomm", logo: qualcommLogo, invert: false },
  { name: "Rockstar Games", logo: rockstarLogo, invert: false },
  { name: "CognoSphere", logo: cognosphereLogo, invert: false },
  { name: "Kuro Games", logo: kuroGamesLogo, invert: true },
  { name: "Resident Evil", logo: residentEvilLogo, invert: true },
];

const PartnersRow = () => {
  const doubled = [...partners, ...partners];

  return (
    <motion.section
      className="py-8 border-t border-border/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] mb-5 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Games & Partners
        </motion.p>
      </div>
      {/* CSS-only infinite marquee — no JS animation frames */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee-track">
          {doubled.map((p, i) => (
            <img
              key={`${p.name}-${i}`}
              src={p.logo}
              alt={p.name}
              className={`h-8 md:h-10 w-auto object-contain opacity-30 hover:opacity-70 transition-all duration-300 grayscale hover:grayscale-0 shrink-0 ${p.invert ? "invert brightness-200" : ""}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PartnersRow;
