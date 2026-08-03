import { publicDb, withTimeout } from "@/lib/adminControl";

export type Testimonial = {
  name: string;
  handle: string;
  quote: string;
};

export type SocialProofConfig = {
  rating: number;
  reviews: number;
  tournamentsHosted: number;
  payoutsSent: number;
  testimonials: Testimonial[];
};

export const SOCIAL_PROOF_KEY = "social_proof";

/**
 * Conservative starting values. The owner edits these from the control panel —
 * nothing here is invented traffic, it is a placeholder the admin overrides.
 */
export const DEFAULT_SOCIAL_PROOF: SocialProofConfig = {
  rating: 0,
  reviews: 0,
  tournamentsHosted: 0,
  payoutsSent: 0,
  testimonials: [],
};

const num = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

export const normalizeSocialProof = (value: unknown): SocialProofConfig => {
  const data = (value ?? {}) as Partial<SocialProofConfig>;
  const testimonials = Array.isArray(data.testimonials) ? data.testimonials : [];

  return {
    rating: Math.min(5, num(data.rating)),
    reviews: Math.round(num(data.reviews)),
    tournamentsHosted: Math.round(num(data.tournamentsHosted)),
    payoutsSent: Math.round(num(data.payoutsSent)),
    testimonials: testimonials
      .map((item) => ({
        name: String(item?.name ?? "").trim(),
        handle: String(item?.handle ?? "").trim(),
        quote: String(item?.quote ?? "").trim(),
      }))
      .filter((item) => item.quote.length > 0)
      .slice(0, 6),
  };
};

export const fetchSocialProof = async (): Promise<SocialProofConfig> => {
  const result = await withTimeout(
    publicDb.from("site_settings").select("value").eq("key", SOCIAL_PROOF_KEY).maybeSingle(),
    "Social proof took too long to load."
  ).catch(() => null);

  return normalizeSocialProof(result?.data?.value);
};
