// app/(dashboard)/overview/page.tsx
'use client';

import { Metadata } from 'next';
import { TrendingUp, Activity, Radio, Zap } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/Button';
import {
    SimpleAreaChart,
    SimpleLineChart,
    SimpleBarChart,
    SimplePieChart,
} from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for charts
const eventsChartData = [
    { name: 'Jan', value: 400, messages: 240 },
    { name: 'Feb', value: 300, messages: 221 },
    { name: 'Mar', value: 200, messages: 229 },
    { name: 'Apr', value: 278, messages: 200 },
    { name: 'May', value: 189, messages: 218 },
    { name: 'Jun', value: 239, messages: 250 },
    { name: 'Jul', value: 349, messages: 210 },
];

const channelDistribution = [
    { name: 'Channel-1', value: 400 },
    { name: 'Channel-2', value: 300 },
    { name: 'Channel-3', value: 200 },
    { name: 'Channel-4', value: 278 },
    { name: 'Channel-5', value: 189 },
];

const recentEvents = [
    { id: 1, event: 'user.signup', channel: 'Channel-1', timestamp: '2 hours ago', status: 'success' },
    { id: 2, event: 'payment.completed', channel: 'Channel-2', timestamp: '5 hours ago', status: 'success' },
    { id: 3, event: 'order.shipped', channel: 'Channel-1', timestamp: '1 day ago', status: 'success' },
    { id: 4, event: 'notification.sent', channel: 'Channel-3', timestamp: '2 days ago', status: 'pending' },
    { id: 5, event: 'error.occurred', channel: 'Channel-2', timestamp: '3 days ago', status: 'error' },
];

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
                <p className="text-xs text-muted-foreground">
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                </p>
            )}
        </CardContent>
    </Card>
);

export default function OverviewPage() {
    return (
        <div className="flex-1 space-y-8 p-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">Real-time Poxa server monitoring and management</p>
            </div>

            {/* Status Alert */}
            <Alert>
                <Activity className="h-4 w-4" />
                <AlertTitle>System Status</AlertTitle>
                <AlertDescription>
                    All services are running normally. You have 12 pending webhooks waiting to be sent.
                </AlertDescription>
            </Alert>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatCard icon={Zap} label="Total Events" value="42,580" trend={12} />
                <StatCard icon={Radio} label="Active Channels" value="8" trend={2} />
                <StatCard icon={Activity} label="Messages Today" value="1,234" trend={8} />
                <StatCard icon={TrendingUp} label="Success Rate" value="99.8%" trend={0.5} />
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Events Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Events Trend</CardTitle>
                        <CardDescription>Last 7 months of event activity</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <SimpleAreaChart data={eventsChartData} dataKey="value" />
                    </CardContent>
                </Card>

                {/* Channel Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Distribution</CardTitle>
                        <CardDescription>Events per channel</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <SimplePieChart
                            data={channelDistribution}
                            dataKey="value"
                            nameKey="name"
                            colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Charts */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Events vs Messages over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <SimpleLineChart data={eventsChartData} dataKey="value" stroke="#3b82f6" />
                    </div>
                </CardContent>
            </Card>

            {/* Recent Events Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Events</CardTitle>
                        <CardDescription>Latest 5 events from your system</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.event}</TableCell>
                                    <TableCell>{event.channel}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                event.status === 'success'
                                                    ? 'success'
                                                    : event.status === 'error'
                                                        ? 'destructive'
                                                        : 'warning'
                                            }
                                        >
                                            {event.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        {event.timestamp}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button>Create Event</Button>
                    <Button variant="outline">View Logs</Button>
                    <Button variant="outline">Manage Webhooks</Button>
                    <Button variant="outline">API Keys</Button>
                </CardContent>
            </Card>
        </div>
    );
}
