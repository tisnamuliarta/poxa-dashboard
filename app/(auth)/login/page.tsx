// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lightbulb } from 'lucide-react';
import '../auth.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@poxa.local');
    const [password, setPassword] = useState('admin123');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error || 'Invalid email or password');
            } else if (result?.ok) {
                router.push('/overview');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <Lightbulb size={32} />
                        <span>Poxa</span>
                    </div>
                    <h1 className="login-title">Dashboard</h1>
                    <p className="login-subtitle">Monitoring & Management</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@poxa.local"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-actions">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                    <p style={{ color: 'white', fontSize: 'var(--text-xs)', margin: 0 }}>
                        Demo credentials:<br />
                        admin@poxa.local / admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
