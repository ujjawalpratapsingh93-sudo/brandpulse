'use client';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({
  label,
  value,
  change,
  trend,
  code = 'METRIC',
  index = 0,
}) {
  const isNumeric = typeof value === 'number';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="terminal-panel p-5 border border-[#1a212d] hover:border-[#ff5500]/60 transition-colors relative group"
    >
      {/* Top Header Tag */}
      <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
        <span className="text-[#5a667d] group-hover:text-[#00e5ff] transition-colors">
          #{code}
        </span>
        {change && (
          <span
            className={`px-1.5 py-0.5 border font-semibold ${
              trend === 'up'
                ? 'border-[#00f076]/30 bg-[#00f076]/10 text-[#00f076]'
                : 'border-[#ff2e4d]/30 bg-[#ff2e4d]/10 text-[#ff2e4d]'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="font-mono text-3xl font-bold tracking-tight text-white mb-2">
        {isNumeric ? <AnimatedCounter target={value} /> : value}
      </div>

      {/* Label and Sub-rule */}
      <div className="text-xs text-[#8a98ad] font-sans font-medium flex items-center justify-between border-t border-[#141a24] pt-2.5">
        <span>{label}</span>
        <div className="w-1.5 h-1.5 bg-[#232c3d] group-hover:bg-[#ff5500] transition-colors" />
      </div>
    </motion.div>
  );
}
