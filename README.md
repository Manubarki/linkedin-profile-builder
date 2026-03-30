# LinkedIn Profile Builder AI 🚀

An AI-powered tool that scores, transforms, and builds LinkedIn profiles using Claude Vision. Upload screenshots of your LinkedIn profile — the AI reads every section including your profile photo and background banner.

**Live app → [linkedin-profile-builder.vercel.app](https://linkedin-profile-builder.vercel.app)**

---

## What it does

### 📊 Score my profile
Upload screenshots of your LinkedIn profile and get a detailed score across 10 sections:
- Profile Photo & Background Cover (assessed from screenshots)
- Headline, About/Summary, Experience, Skills
- Education, Featured Section, Recommendations, Activity

Each section gets a 0–100 score, a status badge (Strong / Good / Needs Work / Missing), specific feedback, and actionable improvement tips. Overall score with letter grade A–D.

### ✦ Transform existing profile
Upload screenshots → Claude Vision reads every section → rewrites your entire profile for maximum personal brand impact. Outputs a LinkedIn-style UI with:
- Brand-first headline and tagline
- Rewritten About section with story arc
- Impact-focused experience bullets with metrics
- ATS-optimised skills list
- Featured section suggestion
- Recommendations assessment

### ＋ Build from scratch
No LinkedIn yet? Fill in your background and Claude generates a complete profile from zero.

---

## How to take good screenshots

1. Open your LinkedIn profile in Chrome
2. Take **3 screenshots** scrolling down:
   - Screenshot 1: Profile header (photo, banner, headline, About)
   - Screenshot 2: Experience section
   - Screenshot 3: Skills, Education, Recommendations
3. Upload all 3 — they're compressed automatically to ~100KB each

**Mac:** `Cmd + Shift + 4`  
**Windows:** `Win + Shift + S`

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML/CSS/JS |
| AI | Anthropic Claude (`claude-sonnet-4-5`) with Vision |
| GitHub enrichment | GitHub REST API v3 |
| Hosting | Vercel |
| Serverless function | Vercel Node.js (`/api/generate.js`) |

---

## Project structure

```
linkedin-profile-builder/
├── api/
│   └── generate.js        # Serverless function — Claude Vision + GitHub API
├── public/
│   └── index.html         # Full frontend — screenshot upload, scoring, output UI
├── vercel.json            # Vercel config
└── README.md
```

---

## How to deploy your own

### 1. Fork and deploy to Vercel

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your fork
3. No build settings needed — Vercel auto-detects everything
4. Add environment variable: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
5. Deploy

### 2. Get your Anthropic API key

1. Go to [console.anthropic.com/settings/api-keys](https://console.anthropic.com/settings/api-keys)
2. Create a new key
3. Add it to Vercel: Project Settings → Environment Variables

---

## Built by

**Manu Barki** — Talent Partner at Atlan, specialising in Recruitment Engineering and AI Automation.

- GitHub: [@Manubarki](https://github.com/Manubarki)
- LinkedIn: [linkedin.com/in/manubarki](https://linkedin.com/in/manubarki)
- Portfolio: [manubarki.github.io/my_portfolio](https://manubarki.github.io/my_portfolio)

Part of a suite of AI-powered recruiting tools built to make talent work smarter.

---

## License

MIT
