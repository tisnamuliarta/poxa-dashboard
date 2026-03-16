// app/(dashboard)/settings/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function SettingsPage() {
    return (
        <div>
            <h1>Settings</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Preferences</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Dashboard settings and server configuration (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
