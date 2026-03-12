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
              className={`h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-all duration-300 grayscale hover:grayscale-0 ${p.invert ? 'invert brightness-200' : ''}`}
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
