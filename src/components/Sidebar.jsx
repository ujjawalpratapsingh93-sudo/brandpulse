'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  Heart,
  BarChart3,
  Wallet,
  Settings,
  ShieldCheck,
  HelpCircle,
  Users,
  CreditCard,
  FileText,
  Sidebar as SidebarIcon
} from 'lucide-react';

const mainNav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/seo-audit', label: 'SEO Audit', icon: Search },
  { href: '/sentiment', label: 'Sentiment AI', icon: Heart },
  { href: '/campaign', label: 'Campaign ROI', icon: BarChart3 },
];

const secondaryNav = [
  { href: '#', label: 'User Management', icon: Users },
  { href: '#', label: 'Subscriptions', icon: CreditCard },
  { href: '#', label: 'Reports', icon: FileText },
];

const bottomNav = [
  { href: '#', label: 'Settings', icon: Settings },
  { href: '#', label: 'Security', icon: ShieldCheck },
  { href: '#', label: 'Help Center', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#eef0f5] flex flex-col justify-between fixed top-0 bottom-0 left-0 z-30 select-none px-4 py-5">
      {/* Brand & Logo Header */}
      <div>
        <div className="flex items-center justify-between px-2 mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            {/* 4-diamond geometric logo matching image */}
            <div className="w-8 h-8 rounded-xl bg-[#111827] flex items-center justify-center text-white shadow-sm">
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="w-1.5 h-1.5 bg-white rounded-[2px]" />
                <div className="w-1.5 h-1.5 bg-white rounded-[2px] opacity-80" />
                <div className="w-1.5 h-1.5 bg-white rounded-[2px] opacity-60" />
                <div className="w-1.5 h-1.5 bg-white rounded-[2px] opacity-90" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight text-[#111827]">
              BrandPulse
            </span>
          </Link>
          <button className="text-[#9ca3af] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#f3f4f6] transition-colors">
            <SidebarIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 mb-8">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all relative ${
                    isActive
                      ? 'bg-[#111827] text-white shadow-button-dark'
                      : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6b7280]'}`} />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div>
          <div className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] cursor-pointer transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#9ca3af]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Settings Menu */}
      <div className="pt-4 border-t border-[#f3f4f6] space-y-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] cursor-pointer transition-colors"
            >
              <Icon className="w-4 h-4 text-[#9ca3af]" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
