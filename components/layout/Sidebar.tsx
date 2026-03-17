// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    BarChart3,
    Bug,
    Lightbulb,
    Menu,
    Settings,
    LayoutDashboard,
    Radio,
    Zap,
    Key,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Overview', href: '/overview', icon: LayoutDashboard },
    { name: 'Channels', href: '/channels', icon: Radio },
    { name: 'Debug Console', href: '/debug', icon: Bug },
    { name: 'Events', href: '/events', icon: Zap },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'API Keys', href: '/api-keys', icon: Key },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="fixed left-4 top-4 z-40 md:hidden"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </Button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border/60 bg-background/95 shadow-sm backdrop-blur transition-transform duration-300 ease-out',
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                    <Link href="/overview" className="flex items-center gap-3 font-semibold text-lg">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            <Lightbulb size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold leading-none">Poxa</span>
                            <span className="text-xs text-muted-foreground">Realtime dashboard</span>
                        </div>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="md:hidden"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Navigation */}
                <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Navigation
                </div>
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                <Button
                                    variant={active ? 'default' : 'ghost'}
                                    className={cn(
                                        'h-11 w-full justify-start gap-3 rounded-xl px-3 text-sm font-medium',
                                        active
                                            ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-border/60 px-4 py-4">
                    <div className="rounded-xl bg-muted/50 px-3 py-3 text-center">
                        <p className="text-xs font-medium text-foreground">Poxa Dashboard</p>
                        <p className="text-xs text-muted-foreground">v1.0.0</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
