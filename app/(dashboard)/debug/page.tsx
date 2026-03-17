// app/(dashboard)/debug/page.tsx
'use client';

import { useState } from 'react';
import { Play, Pause, RotateCcw, Filter } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const mockEvents = [
    { id: 1, timestamp: '14:32:45.123', channel: 'default', event: 'user.signup', status: 'success', latency: '12ms' },
    { id: 2, timestamp: '14:32:44.891', channel: 'notifications', event: 'email.sent', status: 'success', latency: '45ms' },
    { id: 3, timestamp: '14:32:43.567', channel: 'analytics', event: 'track.event', status: 'error', latency: '2100ms' },
    { id: 4, timestamp: '14:32:42.234', channel: 'default', event: 'payment.completed', status: 'success', latency: '87ms' },
    { id: 5, timestamp: '14:32:41.789', channel: 'webhooks', event: 'webhook.triggered', status: 'pending', latency: '...' },
    { id: 6, timestamp: '14:32:40.456', channel: 'notifications', event: 'sms.sent', status: 'success', latency: '23ms' },
    { id: 7, timestamp: '14:32:39.123', channel: 'analytics', event: 'session.start', status: 'success', latency: '5ms' },
    { id: 8, timestamp: '14:32:38.891', channel: 'default', event: 'error.occurred', status: 'error', latency: '0ms' },
];

export default function DebugPage() {
    const [isRunning, setIsRunning] = useState(true);
    const [filterChannel, setFilterChannel] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = mockEvents.filter((event) => {
        const matchChannel = filterChannel === 'all' || event.channel === filterChannel;
        const matchStatus = filterStatus === 'all' || event.status === filterStatus;
        const matchSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase());
        return matchChannel && matchStatus && matchSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'success';
            case 'error':
                return 'destructive';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                    Realtime diagnostics
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Debug Console</h1>
                <p className="text-base text-muted-foreground">Inspect event traffic, filter activity, and review status in a structured console view.</p>
            </div>

            {/* Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>Event Stream Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Button
                        size="sm"
                        variant={isRunning ? 'default' : 'outline'}
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? (
                            <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" />
                                Resume
                            </>
                        )}
                    </Button>
                    <Button size="sm" variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                    <div className="flex-1" />
                    <Badge variant={isRunning ? 'success' : 'outline'}>
                        {isRunning ? 'Live' : 'Paused'}
                    </Badge>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Channel</label>
                            <Select value={filterChannel} onValueChange={setFilterChannel}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Channels</SelectItem>
                                    <SelectItem value="default">default</SelectItem>
                                    <SelectItem value="notifications">notifications</SelectItem>
                                    <SelectItem value="analytics">analytics</SelectItem>
                                    <SelectItem value="webhooks">webhooks</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="error">Error</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search</label>
                            <Input
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Event Stream */}
            <Card>
                <CardHeader>
                    <CardTitle>Event Stream</CardTitle>
                    <CardDescription>{filteredEvents.length} events displayed</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                        {/* Console Header */}
                        <div className="flex items-center gap-4 border-b pb-2 text-xs font-semibold text-muted-foreground">
                            <div className="w-32">TIME</div>
                            <div className="w-24">CHANNEL</div>
                            <div className="flex-1">EVENT</div>
                            <div className="w-20">STATUS</div>
                            <div className="w-16 text-right">LATENCY</div>
                        </div>

                        {/* Events */}
                        <div className="space-y-1 max-h-[600px] overflow-y-auto">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center gap-4 rounded px-2 py-1 hover:bg-muted"
                                    >
                                        <div className="w-32 text-muted-foreground">{event.timestamp}</div>
                                        <div className="w-24">
                                            <Badge variant="outline" className="text-xs">
                                                {event.channel}
                                            </Badge>
                                        </div>
                                        <div className="flex-1 text-foreground">{event.event}</div>
                                        <div className="w-20">
                                            <Badge variant={getStatusColor(event.status)} className="text-xs">
                                                {event.status}
                                            </Badge>
                                        </div>
                                        <div className="w-16 text-right text-muted-foreground">{event.latency}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">No events match filters</div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Success</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">6</div>
                        <p className="text-xs text-muted-foreground">events processed</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">1</div>
                        <p className="text-xs text-muted-foreground">events failed</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">1</div>
                        <p className="text-xs text-muted-foreground">in progress</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
