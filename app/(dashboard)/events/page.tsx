// app/(dashboard)/events/page.tsx
'use client';

import { useState } from 'react';
import { Send, Copy, Share2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/Badge';

const eventTemplates = {
    simple: {
        channel: 'default',
        event: 'user.signup',
        data: {
            userId: 'usr_123456',
            email: 'user@example.com',
            createdAt: new Date().toISOString(),
        },
    },
    payment: {
        channel: 'payments',
        event: 'payment.completed',
        data: {
            orderId: 'ord_789012',
            amount: 99.99,
            currency: 'USD',
            status: 'completed',
        },
    },
    error: {
        channel: 'errors',
        event: 'error.occurred',
        data: {
            errorCode: 'ERR_500',
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
        },
    },
};

export default function EventsPage() {
    const [channel, setChannel] = useState('default');
    const [eventName, setEventName] = useState('user.signup');
    const [eventData, setEventData] = useState(JSON.stringify(eventTemplates.simple.data, null, 2));
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTemplateSelect = (template: keyof typeof eventTemplates) => {
        const t = eventTemplates[template];
        setChannel(t.channel);
        setEventName(t.event);
        setEventData(JSON.stringify(t.data, null, 2));
    };

    const handleSendEvent = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setResponse({
                success: true,
                message: 'Event sent successfully',
                eventId: `evt_${Math.random().toString(36).substr(2, 9)}`,
            });
        } catch (error) {
            setResponse({
                success: false,
                message: 'Failed to send event',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                    Trigger custom events
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Event Creator</h1>
                <p className="text-base text-muted-foreground">Compose payloads, reuse templates, and send events through a cleaner shadcn-style workflow.</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="create" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="create">Create Event</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="docs">Documentation</TabsTrigger>
                </TabsList>

                {/* Create Event Tab */}
                <TabsContent value="create" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>Configure and send your event</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Channel Selection */}
                            <div className="space-y-2">
                                <Label>Channel</Label>
                                <Input
                                    placeholder="e.g., default, notifications, analytics"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                />
                            </div>

                            {/* Event Name */}
                            <div className="space-y-2">
                                <Label>Event Name</Label>
                                <Input
                                    placeholder="e.g., user.signup, payment.completed"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>

                            {/* Event Data */}
                            <div className="space-y-2">
                                <Label>Event Data (JSON)</Label>
                                <Textarea
                                    placeholder='{"key": "value"}'
                                    value={eventData}
                                    onChange={(e) => setEventData(e.target.value)}
                                    rows={12}
                                    className="font-mono text-xs"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button onClick={handleSendEvent} disabled={isLoading}>
                                    <Send className="mr-2 h-4 w-4" />
                                    {isLoading ? 'Sending...' : 'Send Event'}
                                </Button>
                                <Button variant="outline">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy JSON
                                </Button>
                                <Button variant="outline">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Response */}
                    {response && (
                        <Alert variant={response.success ? 'success' : 'destructive'}>
                            <AlertTitle>{response.success ? 'Success' : 'Error'}</AlertTitle>
                            <AlertDescription className="space-y-2">
                                <p>{response.message}</p>
                                {response.eventId && (
                                    <p className="font-mono text-xs">ID: {response.eventId}</p>
                                )}
                            </AlertDescription>
                        </Alert>
                    )}
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(eventTemplates).map(([key, template]) => (
                            <Card
                                key={key}
                                className="cursor-pointer transition-colors hover:bg-muted"
                                onClick={() => {
                                    handleTemplateSelect(key as keyof typeof eventTemplates);
                                    const tabsElement = document.querySelector('[value="create"]');
                                    tabsElement?.click();
                                }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-base capitalize">{key} Event</CardTitle>
                                    <CardDescription>{template.event}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="text-sm">
                                        <Badge variant="outline">{template.channel}</Badge>
                                    </div>
                                    <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                                        {JSON.stringify(template.data, null, 2)}
                                    </pre>
                                    <Button className="w-full" size="sm">
                                        Use Template
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Documentation Tab */}
                <TabsContent value="docs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Documentation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold mb-2">Channel</h3>
                                <p className="text-muted-foreground">
                                    The channel where you want to send the event. Channels are created automatically
                                    when you send your first event.
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Event Name</h3>
                                <p className="text-muted-foreground">
                                    A unique identifier for your event. Use dot notation for namespacing
                                    (e.g., user.signup, order.completed).
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Event Data</h3>
                                <p className="text-muted-foreground mb-2">
                                    A JSON object containing the event payload. This can be any valid JSON structure.
                                </p>
                                <pre className="rounded bg-muted p-2 text-xs overflow-auto">
                                    {JSON.stringify(
                                        {
                                            userId: 'usr_123456',
                                            email: 'user@example.com',
                                            metadata: {
                                                source: 'api',
                                                version: '1.0',
                                            },
                                        },
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Best Practices</h3>
                                <ul className="list-inside space-y-1 text-muted-foreground">
                                    <li>• Use consistent event naming conventions</li>
                                    <li>• Include timestamps in your events</li>
                                    <li>• Keep event data minimal and relevant</li>
                                    <li>• Use semantic channel names</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
