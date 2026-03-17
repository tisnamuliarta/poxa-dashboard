// app/(dashboard)/analytics/page.tsx
'use client';

import { Calendar, TrendingUp } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    SimpleAreaChart,
    SimpleBarChart,
    SimpleLineChart,
    SimplePieChart,
} from '@/components/ui/chart';
import { useAnalytics } from '@/hooks/useRealData';

export default function AnalyticsPage() {
    const { analytics, loading, error } = useAnalytics();

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-base text-muted-foreground">Time-series analytics and performance metrics</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Calendar className="h-5 w-5" />
                    Last 7 Days
                </Button>
            </div>

            {/* Key Metrics */}
            {error && <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-lg">{error}</div>}
            {analytics && (
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscriptions</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-bold">{analytics.summary.totalSubscriptions.toLocaleString()}</div>
                            <p className="text-xs font-medium text-muted-foreground mt-2">
                                Current total subscriptions across all channels
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Subs / Channel</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-bold">{analytics.summary.avgSubscriptionsPerChannel}</div>
                            <p className="text-xs font-medium text-muted-foreground mt-2">
                                Average subscriptions in the current snapshot
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/30">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Occupied Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-bold">{analytics.summary.occupiedRate}%</div>
                            <p className="text-xs font-medium text-muted-foreground mt-2">
                                Percentage of channels currently occupied
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading analytics...</div>
            ) : analytics ? (
                <>
                    {/* Main Charts */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Event Trends */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Top Channels by Subscription Count</CardTitle>
                                <CardDescription>Live snapshot of your busiest channels</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleLineChart data={analytics.timeSeriesData} dataKey="events" stroke="#3b82f6" />
                            </CardContent>
                        </Card>

                        {/* Error Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Channel Type Distribution</CardTitle>
                                <CardDescription>Public, private, presence, and inactive channels</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center">
                                <SimplePieChart
                                    data={analytics.distributionData}
                                    dataKey="value"
                                    nameKey="name"
                                    colors={['#ef4444', '#f59e0b', '#3b82f6', '#6b7280']}
                                />
                            </CardContent>
                        </Card>

                        {/* Performance Percentiles */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription Percentiles</CardTitle>
                                <CardDescription>Distribution of subscriptions per channel</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleBarChart data={analytics.percentileData} dataKey="value" fill="#10b981" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Area Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscriptions vs Presence Users</CardTitle>
                            <CardDescription>Comparison of subscription counts and reported users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <SimpleAreaChart
                                    data={analytics.timeSeriesData}
                                    dataKey="events"
                                    fill="#3b82f6"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Insights */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Presence Channels</p>
                                    <p className="text-sm text-muted-foreground">Channels exposing user lists through Poxa</p>
                                </div>
                                <Badge>{analytics.summary.presenceChannels}</Badge>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                                <div>
                                    <p className="font-medium">Private Channels</p>
                                    <p className="text-sm text-muted-foreground">Channels using the private- namespace</p>
                                </div>
                                <Badge variant="secondary">{analytics.summary.privateChannels}</Badge>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                                <div>
                                    <p className="font-medium">Public Channels</p>
                                    <p className="text-sm text-muted-foreground">Channels without private/presence prefixes</p>
                                </div>
                                <Badge variant="warning">{analytics.summary.publicChannels}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </>
            ) : null}
        </div>
    );
}
