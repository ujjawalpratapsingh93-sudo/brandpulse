const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchOverview(url = 'techstartup.io', budget = 125000) {
  try {
    const res = await fetch(`${API_BASE}/overview?url=${encodeURIComponent(url)}&budget=${budget}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset:', err);
    return null;
  }
}

export async function fetchLiveSEO(url = 'techstartup.io') {
  try {
    const res = await fetch(`${API_BASE}/seo/audit?url=${encodeURIComponent(url)}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset:', err);
    return null;
  }
}

export async function fetchSentiment() {
  try {
    const res = await fetch(`${API_BASE}/sentiment`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset:', err);
    return null;
  }
}

export async function analyzeNewReview(newReviewText) {
  try {
    const res = await fetch(`${API_BASE}/sentiment/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviews: [
          { text: newReviewText, source: 'Live Input', rating: 5 },
          { text: "Absolutely love the AI recommendations — saved us 40% on ad spend!", source: "Google", rating: 5 },
          { text: "The dashboard is incredibly intuitive. Best analytics tool we have used.", source: "Trustpilot", rating: 5 },
          { text: "Customer support went above and beyond to help us migrate.", source: "Twitter", rating: null },
          { text: "ROI tracking is spot on. We can finally see what is actually working.", source: "App Store", rating: 4 },
          { text: "Delivery took 3 weeks when the site said 5–7 days. Very disappointing.", source: "Google", rating: 2 },
          { text: "The setup process is way too complicated for small businesses.", source: "Trustpilot", rating: 2 },
          { text: "Had to contact support 4 times before getting a proper answer.", source: "Twitter", rating: null }
        ]
      })
    });
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    console.warn('API error:', err);
    return null;
  }
}

export async function fetchCampaignSimulation(budget = 125000, roas = 4.2) {
  try {
    const res = await fetch(`${API_BASE}/campaign?budget=${budget}&roas=${roas}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API offline');
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back to local dataset:', err);
    return null;
  }
}
