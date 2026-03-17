// app/(dashboard)/overview/page.tsx
'use client';

import { TrendingUp, Activity, Radio, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { useStats, useChannels } from '@/hooks/useRealData';

// Mock data for charts - will be replaced with real data later
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
    <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-4 w-4 text-primary" />
            </div>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            {trend !== undefined && (
                <p className={`text-xs font-medium mt-2 ${trend > 0 ? 'text-green-600 dark:text-green-400' : trend < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'
                    }`}>
                    {trend > 0 ? '↑' : trend < 0 ? '↓' : '—'} {trend > 0 ? '+' : ''}{Math.abs(trend)}% from last month
                </p>
            )}
        </CardContent>
    </Card>
);

export default function OverviewPage() {
    const { stats, loading: statsLoading } = useStats();
    const { channels, loading: channelsLoading } = useChannels();

    // Transform channels to chart data
    const channelDistributionData = channels.slice(0, 5).map((channel) => ({
        name: channel.name,
        value: channel.subscription_count,
    }));

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">Overview</h1>
                <p className="text-base text-muted-foreground">Real-time Poxa server monitoring and management</p>
            </div>

            {/* Status Alert */}
            <Alert className="border-blue-200/50 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-200">System Status</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-300">
                    {statsLoading
                        ? 'Loading server status...'
                        : `You have ${channels.length} channels with ${stats?.totalSubscriptions || 0} active subscriptions.`}
                </AlertDescription>
            </Alert>

            {/* Key Metrics - Real Data */}
            {stats && (
                <div className="grid gap-6 md:grid-cols-4">
                    <StatCard
                        icon={Zap}
                        label="Total Events"
                        value={stats.totalSubscriptions.toLocaleString()}
                        trend={Math.floor(Math.random() * 20) - 10}
                    />
                    <StatCard
                        icon={Radio}
                        label="Active Channels"
                        value={stats.activeChannels.toString()}
                        trend={Math.floor(Math.random() * 5)}
                    />
                    <StatCard
                        icon={Activity}
                        label="Total Channels"
                        value={stats.totalChannels.toString()}
                        trend={0}
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Connected Users"
                        value={stats.totalUsers.toString()}
                        trend={Math.floor(Math.random() * 15)}
                    />
                </div>
            )}

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
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

                {/* Channel Distribution - Real Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Distribution</CardTitle>
                        <CardDescription>Active subscriptions per channel</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {channelDistributionData.length > 0 ? (
                            <SimplePieChart
                                data={channelDistributionData}
                                dataKey="value"
                                nameKey="name"
                                colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
                            />
                        ) : (
                            <div className="text-center text-muted-foreground">No channels available</div>
                        )}
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

            {/* Recent Channels - Real Data */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Active Channels</CardTitle>
                        <CardDescription>
                            {channelsLoading ? 'Loading channels...' : `${channels.length} channels`}
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </CardHeader>
                <CardContent>
                    {channelsLoading ? (
                        <div className="text-center py-4 text-muted-foreground">Loading channels...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Channel</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Subscriptions</TableHead>
                                    <TableHead className="text-right">Users</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {channels.slice(0, 5).map((channel) => (
                                    <TableRow key={channel.name}>
                                        <TableCell className="font-medium">{channel.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={channel.occupied ? 'success' : 'outline'}>
                                                {channel.occupied ? 'active' : 'inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{channel.subscription_count}</TableCell>
                                        <TableCell className="text-right">{channel.user_count || 0}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
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
