// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Poxa Dashboard',
    description: 'Enterprise monitoring and management for Poxa Pusher server',
    keywords: ['poxa', 'pusher', 'realtime', 'dashboard', 'websocket'],
    authors: [{ name: 'Poxa Dashboard Team' }],
    openGraph: {
        title: 'Poxa Dashboard',
        description: 'Enterprise monitoring and management for Poxa Pusher server',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
