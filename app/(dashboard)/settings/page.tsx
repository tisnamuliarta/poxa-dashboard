// app/(dashboard)/settings/page.tsx
import { Settings2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
                <p className="text-base text-muted-foreground">Configure dashboard behavior, notification preferences, and server options.</p>
            </div>
            <Card className="rounded-2xl">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Settings2 className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Dashboard settings and server configuration</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-xl border border-dashed border-border/70 bg-muted/30 p-6">
                        <div className="space-y-2">
                            <p className="font-medium">Settings workspace coming soon</p>
                            <p className="text-sm text-muted-foreground">Theme preferences, realtime polling, and channel-specific defaults will live here.</p>
                        </div>
                        <Badge variant="secondary" className="gap-1"><Sparkles className="h-3.5 w-3.5" /> Planned</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
