// components/layout/Topbar.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Moon, Sun, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui';

export function Topbar() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-6">
                {/* Left side - empty for expansion */}
                <div className="flex-1" />

                {/* Right side - theme toggle and user menu */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                                    {session?.user?.email?.[0]?.toUpperCase() || 'A'}
                                </div>
                                <span className="hidden sm:inline text-sm">{session?.user?.email}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex flex-col space-y-1 p-2">
                                <p className="text-sm font-medium text-foreground">
                                    {session?.user?.email}
                                </p>
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <button className="w-full cursor-pointer flex items-center gap-2">
                                    <Settings size={16} />
                                    <span>Settings</span>
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/login' })}
                                    className="w-full cursor-pointer flex items-center gap-2 text-destructive"
                                >
                                    <LogOut size={16} />
                                    <span>Sign out</span>
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
