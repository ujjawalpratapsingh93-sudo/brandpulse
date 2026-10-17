from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from seo_engine import analyze_url
from sentiment_engine import analyze_sentiment
from campaign_engine import calculate_campaign_metrics

app = FastAPI(
    title="BrandPulse Marketing Intelligence API",
    description="Python FastAPI backend powering real-time SEO scraping, NLP sentiment analysis, and campaign ROI simulations.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewItem(BaseModel):
    text: str
    source: Optional[str] = "Web"
    rating: Optional[int] = None

class SentimentRequest(BaseModel):
    reviews: Optional[List[ReviewItem]] = None

class CampaignRequest(BaseModel):
    budget: Optional[float] = 125000
    target_roas: Optional[float] = 4.2

# 1. Health check
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "BrandPulse Python Engine", "version": "1.0.0"}

# 2. Executive Dashboard Overview Endpoint
@app.get("/api/overview")
def get_overview(url: Optional[str] = "techstartup.io", budget: Optional[float] = 125000):
    seo = analyze_url(url)
    sentiment = analyze_sentiment()
    campaign = calculate_campaign_metrics(budget=budget)

    overview_stats = [
        {
            "label": "Total Campaigns",
            "value": len(campaign["topCampaigns"]) * 4,
            "change": "+12%",
            "trend": "up",
            "color": "violet",
            "icon": "Megaphone",
        },
        {
            "label": "Avg. SEO Score",
            "value": seo["overallScore"],
            "change": "+5pts",
            "trend": "up",
            "color": "blue",
            "icon": "Search",
        },
        {
            "label": "Sentiment Score",
            "value": sentiment["overall"]["positive"],
            "change": "+8%",
            "trend": "up",
            "color": "emerald",
            "icon": "Heart",
        },
        {
            "label": "Overall ROAS",
            "value": f"{campaign['totalROAS']}x",
            "change": "+0.6x",
            "trend": "up",
            "color": "cyan",
            "icon": "TrendingUp",
        },
    ]

    return {
        "overviewStats": overview_stats,
        "seoAuditData": seo,
        "sentimentData": sentiment,
        "campaignData": campaign,
    }

# 3. Dynamic Live SEO Endpoint
@app.get("/api/seo/audit")
def get_seo_audit(url: str = Query(default="techstartup.io", description="Website URL to audit")):
    return analyze_url(url)

# 4. Dynamic Sentiment Analysis Endpoint
@app.post("/api/sentiment/analyze")
def post_sentiment_analyze(req: SentimentRequest):
    reviews_data = [r.dict() for r in req.reviews] if req.reviews else None
    return analyze_sentiment(reviews_data)

@app.get("/api/sentiment")
def get_sentiment():
    return analyze_sentiment()

# 5. Dynamic Campaign Simulator Endpoint
@app.post("/api/campaign/simulate")
def post_campaign_simulate(req: CampaignRequest):
    return calculate_campaign_metrics(budget=req.budget or 125000, target_roas=req.target_roas or 4.2)

@app.get("/api/campaign")
def get_campaign(budget: float = 125000, roas: float = 4.2):
    return calculate_campaign_metrics(budget=budget, target_roas=roas)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
