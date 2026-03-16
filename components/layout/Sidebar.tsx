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
import styles from './Sidebar.module.css';

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
            <button
                onClick={() => setIsOpen(true)}
                className={styles.mobileMenuButton}
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <Lightbulb size={28} className={styles.logoIcon} />
                        <span>Poxa</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className={styles.closeButton}
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className={styles.nav}>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${active ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} className={styles.icon} />
                                <span>{item.name}</span>
                                {active && <div className={styles.indicator} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.footer}>
                    <p className={styles.version}>v1.0.0</p>
                </div>
            </aside>
        </>
    );
}
