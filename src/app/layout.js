import './globals.css';

export const metadata = {
  title: 'BrandPulse — Marketing Intelligence Dashboard',
  description: 'AI-Powered SEO Auditing, Sentiment Analysis & Campaign Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#f6f7fa] text-[#111827] selection:bg-[#111827] selection:text-white">
        {children}
      </body>
    </html>
  );
}
