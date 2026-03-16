// app/(dashboard)/channels/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function ChannelsPage() {
    return (
        <div>
            <h1>Channels</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Channels List</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Channel management and filtering (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
