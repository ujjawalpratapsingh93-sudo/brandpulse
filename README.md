# BrandPulse

### Marketing signals, in one clear view.

BrandPulse is a marketing analytics dashboard with a Next.js interface and a Python API. Explore website SEO checks, text sentiment analysis, and an interactive campaign performance simulator from one place.

> **Project status:** This is a local-development/demo project. Some dashboard content is sample data, campaign results are simulated, and no advertising or review platform is connected.

---

## Contents

- [What you can do](#what-you-can-do)
- [How it works](#how-it-works)
- [Built with](#built-with)
- [Getting started](#getting-started)
- [API reference](#api-reference)
- [Project layout](#project-layout)
- [Notes and limitations](#notes-and-limitations)

## What you can do

| Area | Route | What it does |
| --- | --- | --- |
| **Dashboard** | `/` | Brings campaign, SEO, and sentiment summaries together. |
| **SEO audit** | `/seo-audit` | Fetches a page and inspects its title, description, headings, images, links, and other HTML signals. |
| **Sentiment analysis** | `/sentiment` | Classifies submitted review text as positive, neutral, or negative using TextBlob polarity. |
| **Campaign simulator** | `/campaign` | Adjusts a budget and target ROAS to estimate spend, revenue, return, and funnel volumes across sample channels. |

## How it works

```text
┌───────────────────────────────────┐
│       Next.js / React UI          │
│ Dashboard · SEO · Sentiment · ROI │
│          localhost:3000           │
└─────────────────┬─────────────────┘
                  │ JSON over HTTP
                  ▼
┌───────────────────────────────────┐
│         FastAPI service           │
│ SEO scraper · TextBlob · Simulator│
│          127.0.0.1:8000           │
└───────────────────────────────────┘
```

The frontend calls the API at `http://127.0.0.1:8000/api`. Dashboard views include local sample data, so some content can still be explored when the API is offline. Live SEO requests and submitted sentiment analyses require the backend.

## Built with

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Framer Motion, Recharts, Lucide
- **Backend:** Python, FastAPI, Uvicorn, Requests, Beautiful Soup, TextBlob

## Getting started

### Prerequisites

- Node.js 18.17 or later and npm
- Python 3 with pip

### 1. Install frontend dependencies

From the project root:

```bash
npm install
```

### 2. Install backend dependencies

Create and activate a virtual environment, then install the packages used by the API:

**Windows PowerShell**

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install fastapi uvicorn requests beautifulsoup4 textblob
```

**macOS / Linux**

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install fastapi uvicorn requests beautifulsoup4 textblob
```

### 3. Start the API

In the `backend` directory, with the virtual environment active:

```bash
python main.py
```

The API listens on `http://127.0.0.1:8000`. Interactive API documentation is available at [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs).

### 4. Start the frontend

Open a second terminal at the project root:

```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000).

To create and run a production frontend build:

```bash
npm run build
npm run start
```

## API reference

All endpoints are served from `http://127.0.0.1:8000`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check API status. |
| `GET` | `/api/overview?url=<website>&budget=<amount>` | Get combined dashboard, SEO, sentiment, and campaign data. |
| `GET` | `/api/seo/audit?url=<website>` | Analyze a website URL. The default is `techstartup.io`. |
| `GET` | `/api/sentiment` | Get sentiment results for the built-in sample reviews. |
| `POST` | `/api/sentiment/analyze` | Analyze supplied reviews. Send JSON such as `{"reviews":[{"text":"Great experience","source":"Web","rating":5}]}`. |
| `GET` | `/api/campaign?budget=<amount>&roas=<target>` | Calculate a campaign simulation. |
| `POST` | `/api/campaign/simulate` | Calculate a campaign simulation from a JSON request body, e.g. `{"budget":125000,"target_roas":4.2}`. |

## Project layout

```text
.
├── backend/
│   ├── main.py                 # FastAPI app and API routes
│   ├── seo_engine.py           # Website fetch and HTML SEO checks
│   ├── sentiment_engine.py     # TextBlob sentiment analysis
│   └── campaign_engine.py      # Campaign and funnel calculations
├── src/
│   ├── app/                    # Dashboard and feature pages
│   ├── components/             # Shared UI components
│   └── data/                   # API client and sample dashboard data
├── package.json
└── README.md
```

## Notes and limitations

- Campaign projections are calculated from preset assumptions; they are **not** live results from Google Ads, Meta, Instagram, or LinkedIn.
- Sentiment analysis processes the text supplied to the API and the included sample reviews. It does not collect reviews from external platforms.
- The SEO auditor fetches a page from the machine running the backend. Some sites may block automated requests; results can be incomplete or based on fallback HTML when a fetch fails.
- The API is configured for local development and currently allows cross-origin requests broadly. Do not expose it to the public internet without adding appropriate security controls.
- The frontend API address is currently set to `http://127.0.0.1:8000/api` in `src/data/api.js`.

---

<p align="center">Built as a hands-on marketing analytics project.</p>
