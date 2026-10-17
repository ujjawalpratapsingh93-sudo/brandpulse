def calculate_campaign_metrics(budget: float = 125000, target_roas: float = 4.2):
    # Dynamic calculations based on input budget
    google_spend = round(budget * 0.416, 2)
    meta_spend = round(budget * 0.328, 2)
    insta_spend = round(budget * 0.176, 2)
    linkedin_spend = round(budget * 0.08, 2)

    google_roas = round(target_roas * 1.06, 2)
    meta_roas = round(target_roas * 1.00, 2)
    insta_roas = round(target_roas * 0.94, 2)
    linkedin_roas = round(target_roas * 0.82, 2)

    google_rev = round(google_spend * google_roas, 2)
    meta_rev = round(meta_spend * meta_roas, 2)
    insta_rev = round(insta_spend * insta_roas, 2)
    linkedin_rev = round(linkedin_spend * linkedin_roas, 2)

    total_revenue = round(google_rev + meta_rev + insta_rev + linkedin_rev, 2)
    actual_roas = round(total_revenue / budget, 2) if budget > 0 else 0
    roi = round(((total_revenue - budget) / budget) * 100, 1) if budget > 0 else 0

    impressions = int(budget * 19.6)
    clicks = int(impressions * 0.036)
    leads = int(clicks * 0.14)
    conversions = int(leads * 0.30)

    return {
        "totalBudget": budget,
        "totalRevenue": total_revenue,
        "totalROAS": actual_roas,
        "totalROI": roi,
        "funnel": [
            {"stage": "Impressions", "value": impressions, "color": "#7c3aed"},
            {"stage": "Clicks", "value": clicks, "color": "#3b82f6"},
            {"stage": "Leads", "value": leads, "color": "#06b6d4"},
            {"stage": "Conversions", "value": conversions, "color": "#10b981"},
        ],
        "platforms": [
            {
                "name": "Google Ads",
                "spend": google_spend,
                "revenue": google_rev,
                "roas": google_roas,
                "clicks": int(clicks * 0.43),
                "impressions": int(impressions * 0.40),
                "conversions": int(conversions * 0.44),
                "ctr": 3.9,
                "cpc": round(google_spend / max(int(clicks * 0.43), 1), 2),
                "cpa": round(google_spend / max(int(conversions * 0.44), 1), 2),
                "color": "#3b82f6",
            },
            {
                "name": "Meta Ads",
                "spend": meta_spend,
                "revenue": meta_rev,
                "roas": meta_roas,
                "clicks": int(clicks * 0.33),
                "impressions": int(impressions * 0.35),
                "conversions": int(conversions * 0.33),
                "ctr": 3.5,
                "cpc": round(meta_spend / max(int(clicks * 0.33), 1), 2),
                "cpa": round(meta_spend / max(int(conversions * 0.33), 1), 2),
                "color": "#8b5cf6",
            },
            {
                "name": "Instagram",
                "spend": insta_spend,
                "revenue": insta_rev,
                "roas": insta_roas,
                "clicks": int(clicks * 0.17),
                "impressions": int(impressions * 0.17),
                "conversions": int(conversions * 0.16),
                "ctr": 3.6,
                "cpc": round(insta_spend / max(int(clicks * 0.17), 1), 2),
                "cpa": round(insta_spend / max(int(conversions * 0.16), 1), 2),
                "color": "#ec4899",
            },
            {
                "name": "LinkedIn",
                "spend": linkedin_spend,
                "revenue": linkedin_rev,
                "roas": linkedin_roas,
                "clicks": int(clicks * 0.07),
                "impressions": int(impressions * 0.08),
                "conversions": int(conversions * 0.07),
                "ctr": 2.9,
                "cpc": round(linkedin_spend / max(int(clicks * 0.07), 1), 2),
                "cpa": round(linkedin_spend / max(int(conversions * 0.07), 1), 2),
                "color": "#06b6d4",
            },
        ],
        "monthlyPerformance": [
            {"month": "May", "spend": round(budget * 0.148), "revenue": round(budget * 0.148 * (actual_roas * 0.82)), "roas": round(actual_roas * 0.82, 2)},
            {"month": "Jun", "spend": round(budget * 0.153), "revenue": round(budget * 0.153 * (actual_roas * 0.89)), "roas": round(actual_roas * 0.89, 2)},
            {"month": "Jul", "spend": round(budget * 0.166), "revenue": round(budget * 0.166 * (actual_roas * 0.94)), "roas": round(actual_roas * 0.94, 2)},
            {"month": "Aug", "spend": round(budget * 0.172), "revenue": round(budget * 0.172 * (actual_roas * 0.99)), "roas": round(actual_roas * 0.99, 2)},
            {"month": "Sep", "spend": round(budget * 0.176), "revenue": round(budget * 0.176 * (actual_roas * 1.06)), "roas": round(actual_roas * 1.06, 2)},
            {"month": "Oct", "spend": round(budget * 0.184), "revenue": round(budget * 0.184 * (actual_roas * 1.22)), "roas": round(actual_roas * 1.22, 2)},
        ],
        "topCampaigns": [
            {"name": "Autumn Retargeting 2026", "platform": "Google", "spend": round(budget * 0.096), "revenue": round(budget * 0.096 * 4.87), "roas": 4.87, "status": "active"},
            {"name": "AI Product Launch Campaign", "platform": "Meta", "spend": round(budget * 0.12), "revenue": round(budget * 0.12 * 4.55), "roas": 4.55, "status": "active"},
            {"name": "Brand Awareness Push", "platform": "Instagram", "spend": round(budget * 0.064), "revenue": round(budget * 0.064 * 3.70), "roas": 3.70, "status": "completed"},
            {"name": "Enterprise B2B Lead Gen", "platform": "LinkedIn", "spend": round(budget * 0.08), "revenue": round(budget * 0.08 * 3.46), "roas": 3.46, "status": "active"},
            {"name": "Abandoned Cart Sequence", "platform": "Meta", "spend": round(budget * 0.052), "revenue": round(budget * 0.052 * 5.91), "roas": 5.91, "status": "active"},
        ]
    }
