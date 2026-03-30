# LinkedIn Profile Builder AI 🚀

An AI-powered tool that scores, transforms, and builds LinkedIn profiles using Claude Vision. Upload screenshots of your LinkedIn profile — the AI reads every section including your profile photo and background banner — and rewrites everything for maximum personal brand impact.

**Live app → [linkedin-profile-builder.vercel.app](https://linkedin-profile-builder.vercel.app)**

---

## What it does

### 📊 Score my profile
Upload screenshots and get a detailed score across 10 sections — including profile photo and background cover assessed directly from the images.

| Section | What gets scored |
|---|---|
| Profile Photo | Quality, professionalism, framing |
| Background Cover | Branding, relevance, quality |
| Headline | Keyword density, brand-first vs job title |
| About / Summary | Hook strength, story, length, clichés |
| Experience | Bullet quality, metrics, verb strength |
| Skills | Count, relevance, ATS optimisation |
| Education | Completeness |
| Featured Section | Presence and quality |
| Recommendations | Count and quality |
| Activity & Posts | Content creation signals |

Each section gets a **0–100 score**, status badge (Strong / Good / Needs Work / Missing), specific feedback, and actionable tips. Overall score shown as an animated dial with letter grade A–D.

### ✦ Transform existing profile
Upload screenshots → Claude Vision reads every section → rewrites your entire profile. Output renders as a LinkedIn-style UI with:
- Brand-first headline (not just a job title)
- Story-driven About section with strong hook
- Impact-focused experience bullets with metrics
- ATS-optimised skills list
- Personal brand tagline and brand angles
- Featured section suggestion
- Recommendations note
- Profile strength score (before → after)
- 4 personalised next-step tips

### ＋ Build from scratch
No LinkedIn yet? Fill in your background and Claude crafts a complete profile from zero — headline, About, experience bullets, skills, education.

---

## How to take screenshots

1. Open your LinkedIn profile in Chrome
2. Take **up to 3 screenshots** scrolling down to capture all sections
3. Upload them all — compressed automatically to ~100KB each

**Recommended:**
- Screenshot 1: Profile header (photo, banner, headline, About)
- Screenshot 2: Experience section
- Screenshot 3: Skills, Education, Recommendations

**Mac:** `Cmd + Shift + 4`  **Windows:** `Win + Shift + S`

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML / CSS / JS |
| AI | Anthropic Claude `claude-sonnet-4-5` with Vision |
| GitHub enrichment | GitHub REST API v3 |
| Hosting | Vercel |
| Serverless | Vercel Node.js `/api/generate.js` |

---

## Project structure

```
linkedin-profile-builder/
├── api/
│   └── generate.js        # Serverless function — Claude Vision + GitHub API
├── public/
│   └── index.html         # Frontend — screenshot upload, scoring, output UI
├── vercel.json            # Vercel config
└── README.md
```

---

## Deploy your own

1. Fork this repo
2. Go to **[vercel.com](https://vercel.com)** → New Project → Import your fork → Deploy
3. Add environment variable: `ANTHROPIC_API_KEY` from **[console.anthropic.com](https://console.anthropic.com/settings/api-keys)**
4. Redeploy — done

---

## Built by

**Manu Barki** — Talent Partner at Atlan, building AI-powered recruiting tools at the intersection of talent and engineering.

- GitHub: [@Manubarki](https://github.com/Manubarki)
- LinkedIn: [linkedin.com/in/manubarki](https://linkedin.com/in/manubarki)
- Portfolio: [manubarki.github.io/my_portfolio](https://manubarki.github.io/my_portfolio)

Part of a suite of AI recruiting tools — including a GitHub contributor miner, LinkedIn profile scorer Chrome extension, X-ray sourcing agent, and system design interview evaluator.

---

## License

MIT
