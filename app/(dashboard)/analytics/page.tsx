// app/(dashboard)/analytics/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function AnalyticsPage() {
    return (
        <div>
            <h1>Analytics</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Analytics Charts</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Time-series analytics and metrics (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
