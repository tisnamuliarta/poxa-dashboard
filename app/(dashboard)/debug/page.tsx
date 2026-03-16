// app/(dashboard)/debug/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function DebugPage() {
    return (
        <div>
            <h1>Debug Console</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Event Stream</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Real-time event debugging and filtering (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
