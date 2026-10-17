'use client';
import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import {
  Sliders,
  ArrowUpRight,
  Target,
  DollarSign,
  TrendingUp,
  CreditCard,
  ChevronDown
} from 'lucide-react';
import { fetchCampaignSimulation } from '@/data/api';
import { campaignData as fallbackCampaign } from '@/data/demo';

export default function Campaign() {
  const [d, setD] = useState(fallbackCampaign);
  const [budgetInput, setBudgetInput] = useState(125000);
  const [roasInput, setRoasInput] = useState(4.2);

  const runSimulation = async (budget, roas) => {
    const result = await fetchCampaignSimulation(budget, roas);
    if (result) setD(result);
  };

  return (
    <PageWrapper title="Campaign ROI & Funnel">
      {/* Budget Allocation Controls Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="finora-card p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Marketing Capital Allocation</h3>
            <p className="text-xs text-[#6b7280]">Adjust dynamic budget sliders to recalculate channel ROI in real-time</p>
          </div>
          <span className="px-3 py-1 bg-[#f3f4f6] text-[#374151] rounded-full text-xs font-semibold">
            Dynamic Simulator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6b7280]">Total Ad Spend Pool</span>
              <span className="text-[#111827] font-bold text-sm">${budgetInput.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="500000"
              step="5000"
              value={budgetInput}
              onChange={(e) => {
                const val = Number(e.target.value);
                setBudgetInput(val);
                runSimulation(val, roasInput);
              }}
              className="w-full accent-[#111827] cursor-pointer h-2 bg-[#f3f4f6] rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6b7280]">Target Multiplier (ROAS)</span>
              <span className="text-[#10b981] font-bold text-sm">{roasInput}x</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="8.0"
              step="0.1"
              value={roasInput}
              onChange={(e) => {
                const val = Number(e.target.value);
                setRoasInput(val);
                runSimulation(budgetInput, val);
              }}
              className="w-full accent-[#10b981] cursor-pointer h-2 bg-[#f3f4f6] rounded-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Main KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="finora-card p-6"
        >
          <span className="text-xs font-semibold text-[#6b7280] block mb-2">Total Capital</span>
          <h2 className="text-2xl font-extrabold text-[#111827]">${(d.totalBudget / 1000).toFixed(0)}k</h2>
          <span className="text-xs text-[#9ca3af] mt-1 block">Active Ad Budget</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="finora-card p-6"
        >
          <span className="text-xs font-semibold text-[#6b7280] block mb-2">Estimated Revenue</span>
          <h2 className="text-2xl font-extrabold text-[#10b981]">${(d.totalRevenue / 1000).toFixed(0)}k</h2>
          <span className="text-xs text-[#10b981] font-semibold mt-1 block">+22% vs baseline</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="finora-card p-6"
        >
          <span className="text-xs font-semibold text-[#6b7280] block mb-2">Overall ROAS</span>
          <h2 className="text-2xl font-extrabold text-[#111827]">{d.totalROAS}x</h2>
          <span className="text-xs text-[#10b981] font-semibold mt-1 block">High Return</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="finora-card p-6"
        >
          <span className="text-xs font-semibold text-[#6b7280] block mb-2">Net ROI</span>
          <h2 className="text-2xl font-extrabold text-[#111827]">{d.totalROI}%</h2>
          <span className="text-xs text-[#9ca3af] mt-1 block">Net Profit Margin</span>
        </motion.div>
      </div>

      {/* Funnel & Platform Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel Card (5 cols) */}
        <div className="lg:col-span-5 finora-card p-6">
          <h3 className="text-sm font-bold text-[#111827] mb-4">Conversion Funnel Drop-off</h3>
          <div className="space-y-3">
            {d.funnel.map((step, i) => {
              const conversionRate = i > 0 ? ((step.value / d.funnel[i - 1].value) * 100).toFixed(1) : '100';
              return (
                <div key={step.stage} className="p-3.5 bg-[#f9fafb] rounded-2xl border border-[#f3f4f6]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#111827]">{step.stage}</span>
                    <span className="text-xs font-extrabold text-[#111827]">
                      {step.value >= 1000000 ? `${(step.value / 1000000).toFixed(1)}M` : step.value >= 1000 ? `${(step.value / 1000).toFixed(0)}K` : step.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#9ca3af]">
                    <span>Stage Conversion</span>
                    <span className="text-[#10b981] font-semibold">{conversionRate}% yield</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Attribution Table (7 cols) */}
        <div className="lg:col-span-7 finora-card p-6">
          <h3 className="text-sm font-bold text-[#111827] mb-4">Platform Attribution Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#9ca3af] font-medium border-b border-[#f3f4f6]">
                  <th className="pb-3">Platform</th>
                  <th className="pb-3">Spend</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">ROAS</th>
                  <th className="pb-3 text-right">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f9fafb]">
                {d.platforms.map((p) => (
                  <tr key={p.name} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="py-3.5 font-bold text-[#111827]">{p.name}</td>
                    <td className="py-3.5 text-[#6b7280]">${(p.spend / 1000).toFixed(1)}k</td>
                    <td className="py-3.5 font-bold text-[#10b981]">${(p.revenue / 1000).toFixed(1)}k</td>
                    <td className="py-3.5 font-extrabold text-[#111827]">{p.roas}x</td>
                    <td className="py-3.5 text-right font-bold text-[#111827]">{p.conversions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
