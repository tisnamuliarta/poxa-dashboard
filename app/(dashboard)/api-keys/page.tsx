// app/(dashboard)/api-keys/page.tsx
import { KeyRound, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ApiKeysPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">API Keys</h1>
                <p className="text-base text-muted-foreground">Manage credentials, rotate tokens, and review integration access.</p>
            </div>
            <Card className="rounded-2xl">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <KeyRound className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle>Credentials</CardTitle>
                            <CardDescription>API key management and code snippets</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-xl border border-dashed border-border/70 bg-muted/30 p-6">
                        <div className="space-y-2">
                            <p className="font-medium">Coming soon</p>
                            <p className="text-sm text-muted-foreground">Create, revoke, and scope API keys for client integrations.</p>
                        </div>
                        <Badge variant="info" className="gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Secure</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
