// app/(dashboard)/events/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function EventsPage() {
    return (
        <div>
            <h1>Event Creator</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Trigger Events</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Event creation and triggering tool (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
