
Bhai, scope bahut bada hai (15+ features). Ek hi shot me sab daalu toh quality giregi aur build tootne ka risk hai. Isliye 4 clean phases me karenge — har phase ke baad tu preview check karega, sahi laga toh next phase shuru.

# Phase 1 — Backend foundation + security (no visible UI yet)

**Database (1 migration):**
- `site_settings` table (jsonb-keyed) — store hero copy, footer, contact, stats, FAQ, announcement toast, current APK version
- `apk_versions` table — version, file_path, size, changelog, released_at, is_active
- `admin_audit_log` table — action, actor_ip, payload, created_at
- `translations` table — key, lang, value (cached AI translations)
- `analytics_events` table — event_type, path, country, ua, session_id, created_at
- Storage bucket `apk-files` already exists; add admin-only write RLS

**Edge function upgrades (`admin-control`):**
- Rate limit login: 5 wrong tries → 10 min lockout (in-memory + DB tracked by IP)
- Audit log every admin action
- New actions: `save_settings`, `list_apk`, `set_active_apk`, `delete_apk`, `analytics_summary`, `translate` (calls Lovable AI Gemini), `list_audit`

**New edge function `track-event`:** anonymous analytics ingestion, IP→country lookup, basic UA parsing.

# Phase 2 — Admin panel CMS expansion

Rebuild `/vx-control` as a tabbed dashboard:
- **Tab: Maintenance** (existing)
- **Tab: Hero & Copy** — edit headline, subtext, CTA text, badge text
- **Tab: Stats** — downloads number, users number, ratings (manual override)
- **Tab: FAQ** — add/remove/reorder Q&A
- **Tab: Footer & Contact** — social links, email
- **Tab: Announcement Toast** — message, link, mode (always / once-per-session-24hr / auto-hide-10s), enable toggle
- **Tab: APK Versions** — upload `.apk` directly (Supabase Storage, chunked progress), set active, list history, rollback, auto-write changelog entry
- **Tab: Custom Pages** (existing, upgraded) — TipTap rich text editor, SEO fields (meta title, description, OG image)
- **Tab: Analytics** — last 7/30 day chart (recharts), top pages, top countries, realtime active users (5min window), download funnel, Vercel link
- **Tab: Translations** — pick page section, select language, AI auto-fill button (Lovable AI Gemini), edit, save
- **Tab: Audit Log** — last 200 admin actions

# Phase 3 — Public site wiring

- `useSiteSettings` hook with realtime subscription — feeds Hero, Stats, FAQ, Footer from DB
- `<AnnouncementToast />` mounted in App, respects admin timing mode
- `<NewVersionWatcher />` — detects active APK changes, shows corner toast + adds hero badge `v2.5 OUT NOW`
- Returning-visitor splash on version change (compares localStorage `last-seen-version` with DB)
- Download page reads active APK from DB, lists past versions
- Custom CMS pages render with TipTap HTML + auto `<title>` / meta tags
- Lightweight tracker pings `track-event` on each route change

# Phase 4 — Multi-language + PWA install + polish

- `LanguageProvider` context with switcher in navbar (flag dropdown)
- Languages: English, Hindi, Tamil, Telugu, Marathi, Bengali, Punjabi, Gujarati, Kannada, Malayalam, Spanish, Arabic, Indonesian, Portuguese
- AI-translate-on-save: when admin edits English copy, edge function pre-translates to all langs and caches in `translations` table
- Live runtime: `useT(key)` returns cached translation, falls back to English
- RTL support for Arabic
- PWA install prompt: just `manifest.json` (no service worker — guidelines warn against SW in Lovable preview)
- Final QA pass + animation polish + accessibility check

---

## Tech notes
- Rich text: `@tiptap/react` + `@tiptap/starter-kit` (lightweight, AMOLED-themable)
- Charts: existing `recharts`
- AI translate: Lovable AI `google/gemini-2.5-flash-lite` (cheap, fast, multilingual)
- All tables get `Public can read` RLS, writes only via `admin-control` edge function (service role)
- Theme stays AMOLED + crimson throughout
- Animations stay GPU-CSS, no Framer loops

## Starting point
Approve karte hi **Phase 1 (DB + security backend)** ship karunga. Migration tu approve karega, fir code chala dunga. Ek phase ~5-10 mins ka kaam.
