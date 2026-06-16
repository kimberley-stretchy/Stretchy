# Handoff: Stretchy — Social Movement Pricing App + Marketing Landing Page

## Overview
**Stretchy** is a community-movement platform (Auckland, NZ). Local hosts run movement
sessions — yoga, pilates, HIIT, breathwork, sound baths, run clubs — and the price
**drops as more people join**: `(host target + flat Stretchy fee) ÷ people = price each`.
The more who move together, the better the value for everyone. Every session ends with
an optional "Social Stretch" (coffee/wine/banter).

This bundle contains two deliverables:

1. **Marketing landing page** (`Stretchy Landing.html`) — waitlist + interactive pricing
   explainer + a live "explore the app" device showcase. This is the priority for launch.
2. **The app itself** (`Stretchy Flow.html`) — 32 mobile screens across Attendee, Host
   and Admin (Stretchy HQ), presented on a pannable design canvas.

---

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — they
are prototypes showing the intended look, copy and behaviour. **They are not production
code to ship directly.**

The task is to **recreate these designs in a real codebase**. There is no existing
codebase yet, so **choose an appropriate modern stack**. Recommended:

- **Next.js (App Router) + React + TypeScript** for the marketing site and web app
- **Tailwind CSS** (or CSS Modules) for styling — tokens listed below
- A real backend for the waitlist (the prototype writes to `localStorage` only)
- For the native mobile app, **React Native / Expo** is a natural fit given the component
  structure, but the screens can also ship as a responsive PWA

The prototypes are built as plain React components (no build step — Babel-in-browser), so
the component logic, props and JSX translate almost 1:1 into a real React project.

---

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and interactions are all
specified and intentional. Recreate pixel-faithfully. The only caveat: the brand mark is
currently rendered from a **traced SVG path** (`s-mark-svg.js`) derived from a PNG — in
production you should replace this with the **official vector S logomark and wordmark**
(the source PNGs are in `/assets`). See "Assets" below.

---

## Brand & Design Tokens

### Colour palette (Stretchy brand — Kimberley Torrie palette)
| Token | Hex | Use |
|---|---|---|
| `black` | `#1A1A1A` | Primary text, dark buttons |
| `cream` | `#F5EDE3` | Primary app/page surface |
| `olive` | `#7A8330` | **Primary brand colour** — hero, Home, Explore bg, "breath" category |
| `yellow` | `#FFD166` | **Money only** — prices, earnings, waitlist base, footer. Never decorative. |
| `purple` | `#A535C7` | "How it works" bg, For-hosts bg, "yoga" category, accents |
| `royal` | `#2A3FE0` | "pilates" category, deep accents |
| `sky` | `#4FB8E0` | "sound" category, soft accents |
| `orange` | `#FF6B35` | Scarcity / "short of floor" alerts, "flow" category |
| `red` | `#E63946` | Errors, "run" category, at-risk states |
| `green` | `#4CAF82` | Confirmed / "going ahead" states |
| `hold` | `#A8D5E2` | Holding (pre-confirmation) state |
| `pink` | `#B5DDE9` | Soft blue accent (NOTE: named "pink" historically; it is light blue) |
| `hotPink` | `#2C8FE0` | Bold blue — primary CTAs (NOTE: named "hotPink" historically; it is blue) |
| white card | `#FFFFFF` | Cards on cream |
| dim text | `#888` | Secondary text on light |

> ⚠️ Naming gotcha: the tokens `pink` / `hotPink` were originally pink and later
> reassigned to blues per brand direction. **Rename them to `softBlue` / `blue` (or
> `accent`/`accentBold`) in production** to avoid confusion. There is no pink in the design.

### Movement-type colour codes (`MOVEMENT` map in `components.jsx`)
`yoga`→purple `#A535C7` · `pilates`→royal `#2A3FE0` · `sound`→sky `#4FB8E0` ·
`breath`→olive `#7A8330` · `flow`→orange `#FF6B35` · `run`→red `#E63946` ·
`hiit`→blue `#2C8FE0`. Each has a label + single-character glyph used in `MovementTile`.

### Typography
| Role | Font | Notes |
|---|---|---|
| Display (hero numbers, big prices/stats only) | **Bagel Fat One** (Google) | weight 400, heavy rounded display. Reserve for prices `$28`, big stat numbers. |
| Titles / headlines / all H1–H3 | **Space Grotesk** (Google) | weight 700, letter-spacing ≈ −0.02em to −0.03em, line-height 0.92–0.98 |
| Body | **Space Grotesk** | weights 400–600 |
| Labels / mono / data / eyebrows | **JetBrains Mono** (Google) | weight 700, letter-spacing 0.10–0.22em, often UPPERCASE |

Load all three from Google Fonts (weights: Bagel Fat One 400; Space Grotesk 400/500/600/700;
JetBrains Mono 400/500/600/700).

### Spacing / radius / shadow
- Card radius: **24–32px** (pills/buttons fully rounded `border-radius: 999px`)
- Section vertical padding: **96px** desktop
- Page max-width: **1180px**, gutter 24px
- Card borders on light: `1.5px solid rgba(26,26,26,0.08–0.10)`
- Soft shadow: `0 30px 60px rgba(26,26,26,0.06)`; phone drop-shadow `0 30px 60px rgba(0,0,0,0.42)`
- Hit targets ≥ 44px; large pill buttons 60–72px tall

### Iconography & emoji
Emoji are used intentionally as lightweight category/section icons (🧘 🎯 🤙 💸 🛡️ etc).
Keep or replace with a consistent icon set — they are not load-bearing.

---

## DELIVERABLE 1 — Marketing Landing Page (`Stretchy Landing.html`)
Source component: `landing.jsx` (function `Landing`). Reuses the real app screen
components inside scaled phone frames so the showcase always matches the app.

**Section order (top → bottom):**

1. **Nav** (sticky) — S logomark only (no wordmark text). Links: How it works ·
   Explore the app · For hosts · "Join the waitlist" (dark pill). Transparent over the
   olive hero; gains cream blur background + hairline border after 20px scroll.

2. **Hero** — olive (`#7A8330`) background, cream text. Faint giant ghost S top-right
   (opacity 0.07). Two-column grid (`1.05fr 0.95fr`, gap 40, `align-items: center`):
   - Left: mono eyebrow "AUCKLAND, AOTEAROA · EST. 2026"; H1 "A social / movement."
     (Space Grotesk 700, clamp(48px,7vw,92px), line-height 0.92); lead paragraph
     "Community movement classes where **the price drops as more people join.** The more
     who move together, the better value for everyone. Plus the beloved "Social Stretch"
     after."; two buttons (cream "Join the waitlist →", ghost "Explore the app");
     small print "Yoga, pilates, HIIT, breathwork, run clubs — with a pricing model that
     rewards community."
   - Right: **ONE** upright (non-rotated) phone, vertically centered, showing the
     **Session Detail** screen (the live price + "DROPS AS THE ROOM FILLS" curve). This is
     the core idea — keep it prominent and uncut. Container has 56px bottom padding so the
     phone never clips the next section.

3. **Pricing mechanic** (cream) — the signature interactive calculator. Heading
   "The more who join, the better value exchange for all." Intro: "The host sets their
   revenue target. Add the flat Stretchy fee of **NZD $20 + GST**. Split it across everyone
   who holds a spot." White rounded card, two columns:
   - Left: three range sliders — **Host revenue target** ($50–$400, step 5),
     **Minimum spots to go ahead** (3–20), **People holding a spot** (3–50). Olive-filled
     track, cream thumb with black border.
   - Right readout panel: flips **olive "● GOING AHEAD"** when `people ≥ minSpots`, else
     dark "○ NEEDS N MORE TO CONFIRM". Formula chips `$target + $20+GST ÷ people`. Big
     yellow per-person price (Bagel Fat One). Caption explains host always earns the target,
     Stretchy always takes the flat fee, everyone else benefits as more join.
   - **Formula:** `perPerson = round((target + 23) / people)` where the flat fee is
     **$20 + 15% GST = $23**. `startPrice = round((target + 23) / minSpots)`.

4. **How it works** (purple `#A535C7`) — heading "Six steps. That's it." Six numbered
   cards (01–06); card 06 is yellow. A "One thing to know" callout follows the grid:
   *locked in at 36 hours and can't make it = you'll be charged.* Steps:
   1. A host lists a session. — sets a minimum to make it viable, a max capacity, a price target.
   2. Hold your spot. — nothing's charged; see the max you'd ever pay and the number needed to go ahead.
   3. The more who hold, the lower the price. — every hold splits the cost; price drops in real time.
   4. 36 hours out: is it happening? — minimum met = confirmed and you're locked in (the max you'll pay); else all holds released, no charge.
   5. Price can still drop until 2 hours out. — more can join after confirmation; at 2h the card is charged at the final price.
   6. Show up. Move. Social Stretch.

5. **Explore the app** (olive `#7A8330`) — live device showcase. Left: pill chips grouped
   "FOR MOVERS" (Home, This Week, Session+Price, Place Held, Going Ahead, Social Stretch,
   Rate It) and "FOR HOSTS" (Host Dashboard, Add a Session, Host Payout). Right: one large
   live phone that swaps to the selected screen. Caption: "Every screen here is the live
   front-end — not a picture." (In production this can be a real embedded app preview or
   recorded interactions.)

6. **For movers** (cream) — 4 value cards: "The value exchange works for you", "Local
   sessions, real venues", "The Social Stretch", "You always know your max".

7. **For hosts** (purple) — heading "Set your target. We handle the rest." 6 cards (earn
   target, transparent formula `(Target + $20 + GST) ÷ people`, vetted once active 6 months,
   be part of a movement, host a Social Stretch, fundraising sessions). CTA "Apply to be a
   host →".

8. **The backstory** (cream) — narrative: started as a social yoga community in Auckland
   2024, evolving into a community-movement platform. Tagline "Stretching bodies, minds and
   social circles."

9. **Waitlist** (yellow `#FFD166`, the base of the page) — S mark, heading "Move together.
   Pay less. Better value exchange for all.", subhead "Auckland goes live Q3 2026 — more
   cities coming…". Form: **Move / Host / Both** toggle + email + suburb + submit. Success
   state swaps to a black confirmation card. *Prototype stores to `localStorage` key
   `stretchy_waitlist`; wire to a real backend/email provider (e.g. Resend + a DB or a
   form service).*

10. **Footer** (yellow, continuous with waitlist) — S mark, "Built in Aotearoa",
    **email `kimberley@stretchyyoga.co.nz`**, an "Explore" link column, and a "Follow the
    build" column linking **caike.club**, **@caike.club** (Instagram) and **@stretchy.yoga**.
    Bottom bar: "© 2026 STRETCHY · AOTEAROA NEW ZEALAND" · "MOVE TOGETHER · BETTER VALUE FOR ALL".

**Responsive:** below 900px the hero, mechanic and explore grids collapse to one column
(see `@media` block in `Stretchy Landing.html`). Phones stack; explore phone moves above
the chips.

---

## DELIVERABLE 2 — The App (`Stretchy Flow.html`) — 32 screens
Presented on a pannable/zoomable design canvas grouped into sections. Each screen is a
402×874 mobile frame. A global **menu drawer** (drop-down from the top-left S) provides
navigation; an iOS status-bar safe area (54px top padding) keeps content clear of the
notch/battery.

### Get In (3)
- **A0a Welcome** — olive full-bleed, large centered S (first branded moment), "A social
  movement.", "I'm new — sign up" / "log in".
- **Login · Attendee** — yellow wash, role tabs ("I'm here to move" / "I'm hosting"),
  magic-link auth (no passwords).
- **Login · Host** — purple wash, same tabs, "Apply to host →" footer.

### Onboarding A0 (3)
- **A0b Sign up** (name + email/phone + Apple/Google), **A0c Preferences** (neighbourhoods,
  movement types, notification toggles), **A0d Payment** (Stripe card-on-file, not charged).
  4-step progress indicator.

### Attendee · Funnel (3)
- **01 Home** — olive, large S, "A social movement.", subcopy "The larger the group gets,
  the better value for all. Join us.", 3 CTAs, yellow "How to Stretchy" card.
- **02 This Week** — browse session cards (movement-type tile, day/time/type pills, progress
  pips, yellow price pill, state border colour).
- **03 Session Detail** *(the hero screen)* — vetted-host badge, movement tile, **the
  pricing engine**: progress pips + "N MORE ATTENDEES TO CONFIRM", big yellow starting
  price tile, `PricingScale` SVG chart (solid plateau until min, dashed projected drop,
  pulsing live dot, "IF N JOIN → $X" ladder), "Hold my place — no charge yet" CTA, Where
  (map), Host card.

### Attendee · Hold → Confirmation (3)
- **04 Place Held** (hold-blue confirmation, numbered "How to Stretchy", bring-a-mate,
  Social Stretch teaser), **A4 Going Ahead** (blue full-bleed celebration, current price
  still falling), **A4b Cancelled** (calm cream, $0 receipt, "float it to the community").

### Attendee · Post-session (2)
- **05 Social Stretch** (venue card, say-hi, mates row, tip jar), **A6 Rate It** (5 tappable
  S-marks, vibe chips, photo slots).

### Attendee · Account (3)
- **A7 Notifications** (colour-coded cards), **A8 Suggest a Stretchy** (purple form + voted
  community list), **A9 Profile** (stats, HELD/CONFIRMED upcoming, settings).

### Host (7)
- **06 Apply** (vetting application), **09 Dashboard** (yellow earnings, formula, live
  session, payout), **07 Add a Session** (target slider, min-spots slider, live price
  preview table on black), **H1 Manage Session** (roster + check-in + run-of-show),
  **08 Floor Not Met** (orange, countdown, 3 options: share / lower floor / cancel),
  **H3 Host Inbox**, **H2 Monthly Payout** (big yellow total, per-session breakdown, flat-fee
  transparency note).

### Admin / Stretchy HQ (8) — also needed on mobile
- **ADM-01 Vetting Queue**, **ADM-02 Live Platform** (status grid + all live sessions),
  **ADM-03 Suggestions** (votes + best-match host + notify), **ADM-04 Financial Dashboard**
  (fees collected, payouts, tips, refunds, Stripe activity), **ADM-05 Attendee CRM**,
  **ADM-06 Host CRM** (health-score bars, vetting-renewal alerts), **ADM-07 Content
  Moderation** (card-stack approve/reject with AI-hint pills), **ADM-08 Analytics**
  (sessions bar chart, conversion grid, neighbourhood heat map).
  Admin screens carry a distinguishing black "STRETCHY HQ · …" pill in the top bar.

---

## Key reusable components (`components.jsx`)
- `STRETCHY` — token object (colours + font stacks). Port to your token system.
- `MOVEMENT` — movement-type → colour/label/glyph map.
- `SMark` — the brand logomark (currently traced SVG path; **swap for official vector**).
- `Wordmark` — the STRETCHY wordmark (traced; **swap for official vector**).
- `PillButton` — variants: primary (blue), secondary (cream), dark, ghost, ghostDark, pink/blue.
- `PricePill` — yellow money pill, states: open/filling/almostFull/confirmed/cancelled.
- `PricingScale` / `PricingCurve` — the SVG price-vs-attendance charts.
- `ProgressPips`, `MovementTile`, `SessionCard`, `SRating`, `NotificationCard`,
  `FormField`, `Chip`, `TopBar`, `MenuOverlay`/`MenuProvider` (the drop-down nav).

---

## Interactions & Behaviour
- **Live pricing recompute** (landing mechanic + Session Detail + Add a Session): price is a
  pure function of target/fee/people; recompute on every input change.
- **Confirmation threshold**: `people ≥ minSpots` flips state (UI colour + copy) from
  "needs N more" to "going ahead".
- **Menu drawer**: tap the top-left S → drop-down card with identity + actions (Profile,
  Switch to Host view [purple highlight], Pick your stretch, Float a Stretchy, Apply to be a
  host, Contact Stretchy, Sign out). Tip-arrow points to the S; tap-scrim to dismiss.
- **Waitlist submit**: validate email present → store → success state. Replace storage with
  a real API call.
- **Entrance/idle motion**: subtle; respect `prefers-reduced-motion`.

## State Management
- Pricing inputs (target, minSpots, people) — local component state.
- Waitlist form (role, email, suburb, submitted) — local state → POST to backend.
- Menu open/close — context (`MenuProvider`/`useMenu` in `components.jsx`).
- App proper will need: auth/session, user role (attendee/host/admin), session data,
  holds, payments (Stripe pre-auth + capture at lock-in), notifications.

## Backend notes (for the real app, beyond these mocks)
- **Stripe**: card saved at onboarding (pre-authorisation, not charged). Charge captured
  **2 hours before** the session at the final locked price. Host payout = their target;
  Stretchy keeps the flat **$20 + GST** per session (never a %). Lower/zero fee for
  fundraiser sessions.
- **Lifecycle**: hold (free) → 36h check (confirm if ≥ min, else release all, charge no one,
  no penalty to host) → price keeps dropping, locks 2h out → charge → session → ratings/social.
- **No cancellations** from 36h out (holds become bookings).

## Assets
- `/assets/s-mark.png` — official Stretchy **S logomark** (source PNG). Use this to produce
  a clean production **SVG**; replace the traced path in `s-mark-svg.js`.
- `/assets/wordmark.png` — official **STRETCHY wordmark** (source PNG). Same — vectorise for
  production.
- Fonts: Bagel Fat One, Space Grotesk, JetBrains Mono (Google Fonts).
- All other imagery in the mocks (maps, photos) are placeholders — supply real assets.

## Files in this bundle
```
design_handoff_stretchy/
├── README.md                  ← this file
├── prototypes/
│   ├── Stretchy Landing.html  ← marketing landing page (open in a browser)
│   ├── Stretchy Flow.html     ← the 32-screen app, on a design canvas
│   ├── landing.jsx            ← landing page components
│   ├── components.jsx         ← tokens + shared UI primitives (START HERE)
│   ├── screens.jsx            ← core attendee screens (Home, This Week, Detail, Held, Going Ahead, Host Dashboard)
│   ├── screens-attendee.jsx   ← onboarding payment, social stretch, rate, notifications, suggest, profile
│   ├── screens-host.jsx       ← apply, add session, manage, floor-not-met, inbox, payout
│   ├── screens-admin.jsx      ← the 8 Stretchy HQ admin screens + A4b Cancelled
│   ├── screens-auth.jsx       ← welcome, sign up, preferences, login (attendee/host)
│   ├── ios-frame.jsx          ← iPhone device bezel used to frame screens
│   └── s-mark-svg.js          ← traced S + wordmark vector paths (replace with official SVG)
└── assets/
    ├── s-mark.png             ← official S logomark (vectorise)
    └── wordmark.png           ← official wordmark (vectorise)
```

### How to view the prototypes
Open either HTML file directly in a browser. `Stretchy Landing.html` is the landing page;
`Stretchy Flow.html` shows all 32 app screens on a pannable canvas (use the ⤢ on any
artboard for fullscreen focus, ←/→/Esc to step through). Both rely on the source `.jsx`
modules sitting alongside them, loaded via Babel-in-browser — no build step required to
preview.
