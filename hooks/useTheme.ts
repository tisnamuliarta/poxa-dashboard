// hooks/useTheme.ts
'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('system');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        } else {
            applyTheme('system');
        }
    }, []);

    const applyTheme = (t: Theme) => {
        const html = document.documentElement;
        const isDark =
            t === 'dark' ||
            (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    };

    const toggleTheme = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    };

    return { theme: mounted ? theme : 'system', toggleTheme };
}
