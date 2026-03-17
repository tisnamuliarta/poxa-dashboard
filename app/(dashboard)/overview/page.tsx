// app/(dashboard)/overview/page.tsx
'use client';

import { Activity } from 'lucide-react';
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
import { SimplePieChart } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStats, useChannels } from '@/hooks/useRealData';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';

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

export default function OverviewPage() {
    const { stats, loading: statsLoading } = useStats();
    const { channels, loading: channelsLoading } = useChannels();

    // Transform channels to chart data
    const channelDistributionData = channels.slice(0, 5).map((channel) => ({
        name: channel.name,
        value: channel.subscription_count,
    }));

    const overviewSeries = eventsChartData.map((item, index) => ({
        date: `2024-${String(index + 1).padStart(2, '0')}-01`,
        desktop: item.value,
        mobile: item.messages,
    }));

    const cardItems = stats ? [
        {
            title: 'Total Events',
            value: stats.totalSubscriptions.toLocaleString(),
            change: 8,
            summary: 'Active subscriptions are rising',
            detail: 'Measured against the previous month',
        },
        {
            title: 'Active Channels',
            value: stats.activeChannels.toString(),
            change: 3,
            summary: 'More channels are active',
            detail: 'Healthy realtime fan-out across workloads',
        },
        {
            title: 'Total Channels',
            value: stats.totalChannels.toString(),
            change: 0,
            summary: 'Channel inventory is stable',
            detail: 'No major structural changes detected',
        },
        {
            title: 'Connected Users',
            value: stats.totalUsers.toString(),
            change: 6,
            summary: 'User connectivity remains healthy',
            detail: 'Concurrent users trending upward',
        },
    ] : [];

    return (
        <div className="space-y-8">
            {/* Status Alert */}
            <Alert className="rounded-2xl border-blue-200/50 bg-blue-50/80 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/30">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-200">System Status</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-300">
                    {statsLoading
                        ? 'Loading server status...'
                        : `You have ${channels.length} channels with ${stats?.totalSubscriptions || 0} active subscriptions.`}
                </AlertDescription>
            </Alert>

            {/* Key Metrics - Real Data */}
            {stats && <SectionCards items={cardItems} />}

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Events Trend */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Events Trend</CardTitle>
                        <CardDescription>Last 7 months of event activity</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-0">
                        <ChartAreaInteractive
                            title="Event Traffic"
                            descriptionText="Events and messages for the last 7 months"
                            shortDescription="Last 7 months"
                            data={overviewSeries}
                            series={[
                                { key: 'desktop', label: 'Events', color: 'var(--chart-1)' },
                                { key: 'mobile', label: 'Messages', color: 'var(--chart-2)' },
                            ]}
                        />
                    </CardContent>
                </Card>

                {/* Channel Distribution - Real Data */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Channel Distribution</CardTitle>
                        <CardDescription>Active subscriptions per channel</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center px-6 pb-6 pt-0">
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
