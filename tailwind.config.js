/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#f6f7fa',
          sidebar: '#ffffff',
          card: '#ffffff',
          border: '#eef0f5',
          dark: '#111827',
          muted: '#6b7280',
          emerald: '#10b981',
          rose: '#ef4444',
          indigo: '#4f46e5',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'button-dark': '0 4px 12px 0 rgba(17, 24, 39, 0.2)',
      },
    },
  },
  plugins: [],
};
