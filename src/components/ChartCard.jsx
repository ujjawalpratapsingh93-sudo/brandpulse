'use client';
import { motion } from 'framer-motion';

export default function ChartCard({
  title,
  subtitle,
  tag = 'SYS_VIZ',
  children,
  className = '',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`terminal-panel border border-[#1a212d] p-6 relative ${className}`}
    >
      {(title || subtitle) && (
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-[#141a24]">
          <div>
            {title && (
              <h3 className="font-display text-sm tracking-wider font-bold text-white uppercase">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-mono text-[11px] text-[#6b778d] mt-1">
                // {subtitle}
              </p>
            )}
          </div>
          <span className="font-mono text-[10px] text-[#4a5568] px-1.5 py-0.5 border border-[#192230] bg-[#0c1017]">
            [{tag}]
          </span>
        </div>
      )}
      {children}
    </motion.div>
  );
}
