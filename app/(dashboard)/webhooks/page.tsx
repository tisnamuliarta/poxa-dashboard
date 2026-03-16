// app/(dashboard)/webhooks/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function WebhooksPage() {
    return (
        <div>
            <h1>Webhooks</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Webhook Configuration</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        Webhook setup and delivery logs (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
