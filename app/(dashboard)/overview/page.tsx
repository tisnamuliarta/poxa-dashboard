'use client';

import Link from 'next/link';
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
import { SimpleBarChart, SimplePieChart } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStats, useChannels } from '@/hooks/useRealData';
import { SectionCards } from '@/components/section-cards';

export default function OverviewPage() {
    const { stats, loading: statsLoading } = useStats();
    const { channels, loading: channelsLoading } = useChannels();

    const topChannelsData = [...channels]
        .sort((a, b) => (b.subscription_count || 0) - (a.subscription_count || 0))
        .slice(0, 7)
        .map((channel) => ({
            name: channel.name.length > 14 ? `${channel.name.slice(0, 11)}...` : channel.name,
            value: channel.subscription_count || 0,
        }));

    const channelDistributionData = [...channels]
        .sort((a, b) => (b.subscription_count || 0) - (a.subscription_count || 0))
        .slice(0, 5)
        .map((channel) => ({
            name: channel.name,
            value: channel.subscription_count || 0,
        }));

    const activeRatio = stats && stats.totalChannels > 0
        ? Number(((stats.activeChannels / stats.totalChannels) * 100).toFixed(1))
        : 0;

    const avgSubscriptions = stats && stats.totalChannels > 0
        ? Number((stats.totalSubscriptions / stats.totalChannels).toFixed(2))
        : 0;

    const cardItems = stats
        ? [
            {
                title: 'Total Subscriptions',
                value: stats.totalSubscriptions.toLocaleString(),
                badge: 'Live',
                badgeVariant: 'info' as const,
                summary: 'Current live subscription count',
                detail: 'Directly aggregated from the Poxa channels API',
            },
            {
                title: 'Active Channels',
                value: stats.activeChannels.toString(),
                badge: `${activeRatio}% active`,
                badgeVariant: 'success' as const,
                summary: 'Channels currently marked occupied',
                detail: 'Computed from the latest management API snapshot',
            },
            {
                title: 'Total Channels',
                value: stats.totalChannels.toString(),
                badge: `${avgSubscriptions} avg subs`,
                badgeVariant: 'outline' as const,
                summary: 'All channels returned by Poxa',
                detail: 'Average subscriptions per channel in the current snapshot',
            },
            {
                title: 'Connected Users',
                value: stats.totalUsers.toString(),
                badge: 'Presence only',
                badgeVariant: 'secondary' as const,
                summary: 'Users reported by presence channels',
                detail: 'Poxa only reports users where presence data exists',
            },
        ]
        : [];

    return (
        <div className="space-y-8">
            <Alert className="rounded-2xl border-blue-200/50 bg-blue-50/80 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/30">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-200">System Status</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-300">
                    {statsLoading
                        ? 'Loading server status...'
                        : `You have ${channels.length} channels with ${stats?.totalSubscriptions || 0} active subscriptions.`}
                </AlertDescription>
            </Alert>

            {stats && <SectionCards items={cardItems} />}

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Top Channels by Subscriptions</CardTitle>
                        <CardDescription>Current live snapshot from Poxa</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-0">
                        {topChannelsData.length > 0 ? (
                            <SimpleBarChart data={topChannelsData} dataKey="value" fill="var(--color-chart-1)" />
                        ) : (
                            <div className="text-center text-muted-foreground">No channel activity available</div>
                        )}
                    </CardContent>
                </Card>

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

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Active Channels</CardTitle>
                        <CardDescription>
                            {channelsLoading ? 'Loading channels...' : `${channels.length} channels`}
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/channels">View All</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {channelsLoading ? (
                        <div className="py-4 text-center text-muted-foreground">Loading channels...</div>
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
                                        <TableCell>{channel.subscription_count || 0}</TableCell>
                                        <TableCell className="text-right">{channel.user_count || 0}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Button asChild>
                        <Link href="/events">Create Event</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/debug">View Diagnostics</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/webhooks">Manage Webhooks</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/api-keys">API Keys</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
