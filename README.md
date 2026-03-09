# Scoggins Digital

> Freelance web development business website — built for small businesses and healthcare practices.

![Scoggins Digital Hero](screenshots/Scoggins-Digital.png)

🌐 **Live Site:** [scoggins-digital.vercel.app](https://scoggins-digital.vercel.app)

---

## Overview

This is the source code for Scoggins Digital, my freelance web development business. The site showcases services, portfolio work, and provides a working contact form for potential clients.

Built entirely from scratch — no page builders, no templates. Clean, custom code.

---

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Markup     | HTML5 (semantic)                        |
| Styling    | CSS3 (custom properties, grid, flexbox) |
| Scripts    | Vanilla JavaScript (ES6+)               |
| Forms      | Formspree                               |
| Fonts      | Google Fonts — Syne, DM Sans            |
| Hosting    | Vercel                                  |
| Dev Server | VS Code Live Server                     |

---

## Features

- **Fully responsive** — mobile-first layout
- **Scroll reveal animations** — IntersectionObserver-powered fade-in effects
- **Active nav highlighting** — updates on scroll
- **Contact form** — connected to Formspree, submits via `fetch()` with no page reload
- **Dark theme** with cyan accent and subtle noise texture overlay
- **Grid background** with radial glow effects on hero
- **Accessible** — semantic HTML, proper heading hierarchy, keyboard-navigable

---

## Project Structure

```
scoggins-digital/
├── index.html        # All markup and page structure
├── styles.css        # All styles, organized by section
├── script.js         # Scroll reveal, nav highlight, form submission
└── screenshots/      # Portfolio thumbnails and documentation
    ├── Scoggins-Digital.png         # Site hero screenshot
    ├── portfolio-2026-02-2.png      # Developer Portfolio thumbnail
    ├── BC-sweets.png                # BC's Sweets & Treats thumbnail
    └── dashboard.png                # Personal Financial Tracker thumbnail
```

---

## Sections

- **Hero** — headline, available badge, CTA buttons, stats
- **About** — profile card, skill tags, background highlights
- **Services** — 6 service cards with pricing
- **Portfolio** — 3 live projects with screenshots and links:
  - [Developer Portfolio](https://hunter-scoggins-portfolio.vercel.app/)
  - [BC's Sweets & Treats](https://bc-sweets.vercel.app/)
  - [Personal Financial Tracker](https://personal-financial-tracker-frontend-production.up.railway.app/)
- **Testimonials** — client feedback cards
- **Contact** — contact methods + Formspree-powered inquiry form
- **Social** — TikTok / LinkedIn / GitHub links

---

## Local Development

No build tools or dependencies required. Just open with a live server:

1. Clone the repo
   ```bash
   git clone https://github.com/imhunterblake/Scoggins-Digital.git
   ```
2. Open the folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

Or simply open `index.html` directly in any browser.

---

## Deployment

Deployed on **Vercel** (free tier, automatic deploys on push).

To deploy your own fork:

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Vercel auto-detects static site — no configuration needed

Custom domain (`scoggins.digital`) will be connected via Vercel's domain settings.

---

## Contact

**Hunter Scoggins**

- Email: hunter@scoggins.digital
- TikTok: [@ScogginsDigital](https://tiktok.com/@ScogginsDigital)
- LinkedIn: [linkedin.com/in/hunter-scoggins](https://linkedin.com/in/hunter-scoggins)
- GitHub: [github.com/imhunterblake](https://github.com/imhunterblake)

---

© 2025 Scoggins Digital. Built with ♥ in Oxford, Mississippi.
