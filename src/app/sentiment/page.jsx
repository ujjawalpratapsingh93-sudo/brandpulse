'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import {
  Send,
  Heart,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { fetchSentiment, analyzeNewReview } from '@/data/api';
import { sentimentData as fallbackSentiment } from '@/data/demo';

export default function Sentiment() {
  const [d, setD] = useState(fallbackSentiment);
  const [testComment, setTestComment] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchSentiment().then((res) => {
      if (res) setD(res);
    });
  }, []);

  const handleTestReview = async (e) => {
    e.preventDefault();
    if (!testComment.trim()) return;
    setIsAnalyzing(true);
    const updated = await analyzeNewReview(testComment);
    if (updated) {
      setD(updated);
      setTestComment('');
    }
    setIsAnalyzing(false);
  };

  const donutData = [
    { name: 'Positive', value: d.overall.positive, color: '#10b981' },
    { name: 'Neutral', value: d.overall.neutral, color: '#6366f1' },
    { name: 'Negative', value: d.overall.negative, color: '#ef4444' },
  ];

  return (
    <PageWrapper title="Customer Sentiment AI">
      {/* Live Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="finora-card p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Live TextBlob NLP Testing</h3>
            <p className="text-xs text-[#6b7280]">Enter customer feedback to evaluate real-time sentiment polarity</p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#ecfdf5] text-[#059669] text-xs font-semibold rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NLP Active</span>
          </span>
        </div>

        <form onSubmit={handleTestReview} className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            value={testComment}
            onChange={(e) => setTestComment(e.target.value)}
            placeholder="Type feedback: 'Customer support was quick and resolved everything!' or 'Disappointing delivery'..."
            className="flex-1 w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl px-4 py-3 text-xs font-semibold text-[#111827] focus:bg-white focus:border-[#111827] transition-all outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isAnalyzing}
            className="w-full md:w-auto bg-[#111827] text-white py-3 px-6 rounded-2xl text-xs font-semibold shadow-button-dark flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? "Analyzing..." : "Analyze Feedback"}</span>
          </motion.button>
        </form>
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Polarity Ratio Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 finora-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#111827]">Sentiment Distribution</h3>
            <span className="text-xs text-[#9ca3af] font-medium">{d.totalReviews} Ingested</span>
          </div>

          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-[#111827]">{d.overall.positive}%</span>
              <span className="text-xs text-[#10b981] font-semibold">Positive</span>
            </div>
          </div>

          <div className="flex items-center justify-around pt-4 border-t border-[#f3f4f6] text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span className="text-[#4b5563]">Positive:</span>
              <span className="text-[#111827]">{d.overall.positive}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
              <span className="text-[#4b5563]">Neutral:</span>
              <span className="text-[#111827]">{d.overall.neutral}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="text-[#4b5563]">Negative:</span>
              <span className="text-[#111827]">{d.overall.negative}%</span>
            </div>
          </div>
        </motion.div>

        {/* Temporal Drift Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-7 finora-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#111827]">Monthly Sentiment Drift</h3>
            <div className="flex items-center gap-1.5 bg-[#f3f4f6] px-3 py-1 rounded-full text-xs font-medium text-[#374151]">
              <span>6 Months</span>
              <ChevronDown className="w-3 h-3 text-[#9ca3af]" />
            </div>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={d.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#9ca3af" />
                <YAxis tickLine={false} axisLine={false} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} dot={false} name="Positive %" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} name="Negative %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#f3f4f6] text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              <span className="text-[#6b7280]">Positive Sentiment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="text-[#6b7280]">Negative Flagged</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Raw Reviews Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="finora-card p-6">
          <h3 className="text-sm font-bold text-[#111827] mb-4">Positive Customer Quotes</h3>
          <div className="space-y-3">
            {d.topPositive.map((r, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#f9fafb] border border-[#f3f4f6] text-xs">
                <p className="text-[#374151] font-medium mb-2 italic">"{r.text}"</p>
                <div className="flex items-center justify-between text-[11px] text-[#9ca3af]">
                  <span className="font-semibold text-[#10b981]">{r.source}</span>
                  <span>Polarity: Positive</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="finora-card p-6">
          <h3 className="text-sm font-bold text-[#111827] mb-4">Critical / Action Items</h3>
          <div className="space-y-3">
            {d.topNegative.map((r, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#f9fafb] border border-[#f3f4f6] text-xs">
                <p className="text-[#374151] font-medium mb-2 italic">"{r.text}"</p>
                <div className="flex items-center justify-between text-[11px] text-[#9ca3af]">
                  <span className="font-semibold text-[#ef4444]">{r.source}</span>
                  <span>Polarity: Critical</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
