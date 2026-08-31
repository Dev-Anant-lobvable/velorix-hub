const SITE_URL = "https://velorix-hub.vercel.app";

type TournamentTemplate = {
  slug: string;
  name: string;
  game: string;
  description: string;
  prize: string;
  entry: string;
  hourIST: number;
};

const TEMPLATES: TournamentTemplate[] = [
  {
    slug: "free-fire-solo-scrims",
    name: "VeloRix Free Fire Solo Scrims",
    game: "Garena Free Fire",
    description:
      "Daily Free Fire solo scrims on VeloRix. 48 players, custom room, anti-cheat checks and instant wallet payouts for the top finishers.",
    prize: "1500",
    entry: "0",
    hourIST: 20,
  },
  {
    slug: "bgmi-squad-clash",
    name: "VeloRix BGMI Squad Clash",
    game: "BGMI",
    description:
      "Daily BGMI squad tournament on VeloRix. 25 squads, Erangel classic, room ID shared 15 minutes before start.",
    prize: "3000",
    entry: "20",
    hourIST: 21,
  },
  {
    slug: "clash-squad-showdown",
    name: "VeloRix Clash Squad Showdown",
    game: "Garena Free Fire",
    description:
      "Free Fire Clash Squad 4v4 knockout bracket on VeloRix with best-of-7 rounds and same-day prize credit.",
    prize: "2000",
    entry: "10",
    hourIST: 22,
  },
];

/** IST is UTC+5:30 — build an ISO timestamp with an explicit +05:30 offset. */
function istIso(daysAhead: number, hourIST: number): string {
  const now = new Date();
  const utcMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + daysAhead,
  );
  const date = new Date(utcMidnight);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}T${String(hourIST).padStart(2, "0")}:00:00+05:30`;
}

/**
 * Event structured data for the recurring daily tournaments.
 * Dates are generated per request so the schema never goes stale.
 */
export function buildTournamentEventsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming VeloRix tournaments",
    itemListElement: TEMPLATES.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SportsEvent",
        "@id": `${SITE_URL}/#event-${template.slug}`,
        name: template.name,
        description: template.description,
        startDate: istIso(1, template.hourIST),
        endDate: istIso(1, template.hourIST + 2),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        isAccessibleForFree: template.entry === "0",
        inLanguage: "en-IN",
        sport: template.game,
        url: `${SITE_URL}/download`,
        image: `${SITE_URL}/og-image.png`,
        location: {
          "@type": "VirtualLocation",
          name: `${template.game} custom room (VeloRix app)`,
          url: `${SITE_URL}/download`,
        },
        organizer: {
          "@type": "Organization",
          name: "VeloRix Tournaments",
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          name: template.entry === "0" ? "Free entry" : "Tournament entry",
          price: template.entry,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/download`,
          validFrom: istIso(0, 0),
        },
        subEvent: undefined,
        award: `₹${template.prize} prize pool`,
        maximumAttendeeCapacity: template.game === "BGMI" ? 100 : 48,
      },
    })),
  };
}
