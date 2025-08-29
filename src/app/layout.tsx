import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'PhonePay Prototype',
  description: 'A prototype of the PhonePe mobile app built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased bg-neutral-100 dark:bg-neutral-900')}>
        <Providers>
          <div className="relative mx-auto flex h-[100dvh] max-w-sm flex-col overflow-hidden border-x border-neutral-200 bg-background shadow-2xl dark:border-neutral-800">
            <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
            <BottomNav />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
