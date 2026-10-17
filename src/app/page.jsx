'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Info,
  CreditCard,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import AnimatedCounter from '@/components/AnimatedCounter';
import { fetchOverview } from '@/data/api';
import { overviewStats as fallbackStats, campaignData as fallbackCampaign, seoAuditData as fallbackSEO, sentimentData as fallbackSentiment } from '@/data/demo';

const dualLineData = [
  { month: 'Jan', moneyIn: 48000, moneyOut: 32000 },
  { month: 'Feb', moneyIn: 52000, moneyOut: 38000 },
  { month: 'Mar', moneyIn: 61000, moneyOut: 41000 },
  { month: 'Apr', moneyIn: 58000, moneyOut: 36000 },
  { month: 'May', moneyIn: 72000, moneyOut: 45000 },
  { month: 'Jun', moneyIn: 68000, moneyOut: 52000 },
  { month: 'Jul', moneyIn: 84000, moneyOut: 49000 },
  { month: 'Aug', moneyIn: 79000, moneyOut: 58000 },
  { month: 'Sep', moneyIn: 93000, moneyOut: 62000 },
  { month: 'Oct', moneyIn: 118600, moneyOut: 60899 },
  { month: 'Nov', moneyIn: 104000, moneyOut: 56000 },
  { month: 'Dec', moneyIn: 125000, moneyOut: 64000 },
];

const transactions = [
  { id: 1, name: 'Google Ads Attribution', date: 'Oct 17, 2026', method: 'ROAS 4.8x', amount: '+$58,400', status: 'Completed', logo: 'G', color: 'bg-blue-500' },
  { id: 2, name: 'Meta Campaign Spend', date: 'Oct 16, 2026', method: 'Ad Pool', amount: '-$15,000', status: 'Completed', logo: 'M', color: 'bg-indigo-600' },
  { id: 3, name: 'Client Retainer Payment', date: 'Oct 15, 2026', method: 'Wire Transfer', amount: '+$12,500', status: 'Pending', logo: 'P', color: 'bg-emerald-500' },
  { id: 4, name: 'SEMrush & Ahrefs Tooling', date: 'Oct 14, 2026', method: 'Card •••• 4356', amount: '-$499', status: 'Completed', logo: 'S', color: 'bg-amber-500' },
  { id: 5, name: 'Instagram Sponsored Push', date: 'Oct 12, 2026', method: 'Card •••• 7382', amount: '-$4,200', status: 'Completed', logo: 'I', color: 'bg-pink-500' },
];

const invoices = [
  { id: 1, date: 'July 19', due: 'in 2 weeks', status: 'Unpaid', statusColor: 'bg-rose-500', client: 'Emma John', amount: '$200.00' },
  { id: 2, date: 'July 26', due: 'in 3 weeks', status: 'Paid', statusColor: 'bg-emerald-500', client: 'Liam Smith', amount: '$180.00' },
  { id: 3, date: 'August 2', due: 'in 4 weeks', status: 'Overdue', statusColor: 'bg-amber-500', client: 'Olivia Brown', amount: '$220.00' },
  { id: 4, date: 'August 9', due: 'in 5 weeks', status: 'Paid', statusColor: 'bg-emerald-500', client: 'Noah Davis', amount: '$150.00' },
  { id: 5, date: 'August 16', due: 'in 6 weeks', status: 'Pending', statusColor: 'bg-blue-500', client: 'Ava Wilson', amount: '$175.00' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#111827] text-white px-3.5 py-2.5 rounded-xl text-xs shadow-xl space-y-1.5">
      <div className="flex items-center gap-2">
        <ArrowUp className="w-3.5 h-3.5 text-[#10b981]" />
        <span className="text-[#9ca3af]">Money In:</span>
        <span className="font-bold text-[#10b981]">${payload[0]?.value?.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <ArrowDown className="w-3.5 h-3.5 text-[#ef4444]" />
        <span className="text-[#9ca3af]">Money Out:</span>
        <span className="font-bold text-[#ef4444]">${payload[1]?.value?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState({
    seoAuditData: fallbackSEO,
    sentimentData: fallbackSentiment,
    campaignData: fallbackCampaign
  });

  useEffect(() => {
    fetchOverview().then((res) => {
      if (res) setData(res);
    });
  }, []);

  return (
    <PageWrapper title="Overview">
      {/* Top Main Section: Balance + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left Column (5 cols): Total Balance & Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Total Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="finora-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#6b7280]">Total Balance</span>
              <div className="flex items-center gap-1.5 bg-[#f3f4f6] px-2.5 py-1 rounded-full text-xs font-medium text-[#374151] cursor-pointer">
                <span>🇺🇸 USD</span>
                <ChevronDown className="w-3 h-3 text-[#9ca3af]" />
              </div>
            </div>

            <div className="mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">
                $<AnimatedCounter target={689372} />.00
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-semibold mb-6">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+5%</span>
              <span className="text-[#9ca3af] font-normal">than last month</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-[#111827] text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-button-dark transition-all"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Transfer</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-[#f9fafb] border border-[#e5e7eb] text-[#374151] py-2.5 px-4 rounded-xl text-xs font-semibold hover:bg-[#f3f4f6] transition-all"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Request</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Your Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="finora-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#111827]">Your Cards</span>
              <button className="text-[#9ca3af] hover:text-[#111827] p-1 rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Credit Cards Stack */}
            <div className="space-y-3 mb-4">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-6 bg-white/20 rounded-md flex items-center justify-center text-[10px] font-mono">
                    VISA
                  </div>
                  <div>
                    <p className="text-xs font-mono font-medium tracking-wider">•••• •••• 4356</p>
                    <p className="text-[10px] text-blue-100 opacity-80">09/29</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold">$22,426.10</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-6 bg-white/20 rounded-md flex items-center justify-center text-[10px] font-mono">
                    MC
                  </div>
                  <div>
                    <p className="text-xs font-mono font-medium tracking-wider">•••• •••• 7382</p>
                    <p className="text-[10px] text-rose-100 opacity-80">08/28</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold">$22,426.10</span>
              </motion.div>
            </div>

            {/* Add Card Button */}
            <button className="w-full py-2.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-xs font-semibold text-[#374151] hover:bg-[#f3f4f6] flex items-center justify-center gap-1.5 transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Card</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column (7 cols): Money Management Chart */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="finora-card p-6 h-full flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#111827]">Money Management Overview</h3>
                  <Info className="w-3.5 h-3.5 text-[#9ca3af]" />
                </div>
                <div className="flex items-center gap-1.5 bg-[#f3f4f6] px-3 py-1 rounded-full text-xs font-medium text-[#374151] cursor-pointer">
                  <span>Yearly</span>
                  <ChevronDown className="w-3 h-3 text-[#9ca3af]" />
                </div>
              </div>

              {/* Net Changes */}
              <div className="mb-6">
                <span className="text-xs text-[#9ca3af]">Net changes this year</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <h2 className="text-2xl font-extrabold text-[#111827]">
                    -$342,323.44
                  </h2>
                  <span className="text-xs text-[#9ca3af]">
                    vs, <span className="text-rose-500 font-semibold">$80,899.00</span> last year
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Dual Line Chart */}
            <div className="w-full h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dualLineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#9ca3af" />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="moneyIn"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, fill: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moneyOut"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, fill: '#ef4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Legend */}
            <div className="flex items-center justify-center gap-8 pt-4 border-t border-[#f3f4f6] text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[#6b7280]">Money In</span>
                <span className="font-bold text-[#111827]">+$80,899.00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="text-[#6b7280]">Money Out</span>
                <span className="font-bold text-[#111827]">-$60,899.00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Main Section: Transactions + Invoice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Transactions (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-8 finora-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-[#111827]">Recent Transactions</h3>
            <button className="text-xs font-semibold text-[#6b7280] hover:text-[#111827] transition-colors">
              See All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#9ca3af] font-medium border-b border-[#f3f4f6]">
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f9fafb]">
                {transactions.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                    className="transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl ${tx.color} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                          {tx.logo}
                        </div>
                        <span className="font-semibold text-[#111827]">{tx.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-[#6b7280]">{tx.date}</td>
                    <td className="py-3.5 text-[#6b7280]">{tx.method}</td>
                    <td className={`py-3.5 font-bold ${tx.amount.startsWith('+') ? 'text-[#10b981]' : 'text-[#111827]'}`}>
                      {tx.amount}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                        <span className={`font-medium ${tx.status === 'Completed' ? 'text-[#10b981]' : 'text-amber-500'}`}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="text-[#9ca3af] hover:text-[#111827] p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right: Invoice (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-4 finora-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#111827]">Invoice</h3>
            <button className="text-[#9ca3af] hover:text-[#111827] p-1 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Payment Score Mini Gauge */}
          <div className="flex items-center justify-between bg-[#f9fafb] p-3 rounded-2xl mb-4 border border-[#f3f4f6]">
            <span className="text-xs font-semibold text-[#374151]">Payment Score</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded-full ${i < 8 ? 'bg-[#10b981]' : 'bg-[#e5e7eb]'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#111827]">80 <span className="text-[10px] text-[#9ca3af] font-normal">/100</span></span>
            </div>
          </div>

          {/* Invoices List */}
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-2 hover:bg-[#f9fafb] rounded-xl transition-colors text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111827]">{inv.date}</span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <span className={`w-1.5 h-1.5 rounded-full ${inv.statusColor}`} />
                      <span className="text-[#6b7280]">{inv.status}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9ca3af]">{inv.due}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#111827]">{inv.amount}</p>
                  <p className="text-[10px] text-[#9ca3af]">{inv.client}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
