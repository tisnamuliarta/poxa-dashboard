// components/layout/Topbar.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import styles from './Topbar.module.css';

export function Topbar() {
    const { data: session } = useSession();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.topbar}>
            <div className={styles.spacer} />

            <div className={styles.actions}>
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={styles.iconButton}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* User Menu */}
                <div className={styles.userMenu}>
                    <div className={styles.userInfo}>
                        <UserIcon size={20} />
                        <span>{session?.user?.email || 'Admin'}</span>
                    </div>
                    <button
                        onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                        className={styles.iconButton}
                        title="Sign out"
                        aria-label="Sign out"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
