'use client';
import Sidebar from './Sidebar';
import { Search, Bell, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageWrapper({ children, title = 'Overview' }) {
  return (
    <div className="flex min-h-screen w-full bg-[#f6f7fa] text-[#111827]">
      <Sidebar />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="px-8 py-5 flex items-center justify-between sticky top-0 bg-[#f6f7fa]/90 backdrop-blur-md z-20">
          <h1 className="text-xl font-bold tracking-tight text-[#111827]">
            {title}
          </h1>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative flex items-center bg-white border border-[#eef0f5] rounded-full px-4 py-2 w-72 shadow-sm focus-within:border-[#111827] transition-all">
              <Search className="w-4 h-4 text-[#9ca3af] mr-2" />
              <input
                type="text"
                placeholder="Search metrics, reports..."
                className="bg-transparent border-none outline-none text-xs text-[#111827] placeholder-[#9ca3af] w-full"
              />
            </div>

            {/* Invite & Earn Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white border border-[#eef0f5] text-xs font-semibold px-4 py-2 rounded-full shadow-sm text-[#374151] hover:bg-[#f9fafb] transition-all"
            >
              <Gift className="w-3.5 h-3.5 text-[#111827]" />
              <span>Export Audit</span>
            </motion.button>

            {/* Notification Bell */}
            <button className="p-2 bg-white border border-[#eef0f5] rounded-full shadow-sm text-[#4b5563] hover:text-[#111827] transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#ef4444] absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-200 via-rose-300 to-indigo-300 ring-2 ring-white shadow-sm flex items-center justify-center font-bold text-xs text-[#111827]">
                UK
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="px-8 pb-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
