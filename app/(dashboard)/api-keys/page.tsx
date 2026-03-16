// app/(dashboard)/api-keys/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function ApiKeysPage() {
    return (
        <div>
            <h1>API Keys</h1>
            <Card style={{ marginTop: 'var(--space-lg)' }}>
                <CardHeader><h3>Credentials</h3></CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                        API key management and code snippets (coming soon)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
