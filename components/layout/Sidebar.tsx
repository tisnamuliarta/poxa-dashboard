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
                'fixed left-0 top-0 h-screen w-64 border-r border-border bg-card transition-transform duration-300 ease-out',
                'flex flex-col z-40 md:relative md:translate-x-0',
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}>
                {/* Header */}
                <div className="border-b border-border px-6 py-5 flex items-center justify-between">
                    <Link href="/overview" className="flex items-center gap-3 font-semibold text-lg">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Lightbulb size={20} />
                        </div>
                        <span className="hidden md:inline">Poxa</span>
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
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                <Button
                                    variant={active ? 'default' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start gap-3',
                                        active && 'bg-primary text-primary-foreground'
                                    )}
                                >
                                    <Icon size={18} />
                                    <span className="hidden md:inline">{item.name}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-border px-4 py-3 text-center">
                    <p className="text-xs text-muted-foreground">v1.0.0</p>
                </div>
            </aside>
        </>
    );
}
