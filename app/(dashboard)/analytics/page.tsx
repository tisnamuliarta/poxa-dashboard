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
        <div className="flex-1 space-y-8 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Time-series analytics and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 7 Days
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            {error && <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-lg">{error}</div>}
            {analytics && (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.summary.totalEvents.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                <Badge variant="success" className="mr-1">
                                    ↑ 12%
                                </Badge>
                                vs last period
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.summary.avgResponseTime}ms</div>
                            <p className="text-xs text-muted-foreground">
                                <Badge variant="success" className="mr-1">
                                    ↓ 5%
                                </Badge>
                                improved
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{analytics.summary.errorRate}%</div>
                            <p className="text-xs text-muted-foreground">
                                <Badge variant="warning" className="mr-1">
                                    ↑ 2%
                                </Badge>
                                slight increase
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
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Event Trends */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Event Volume Trend</CardTitle>
                                <CardDescription>Events over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleLineChart data={analytics.timeSeriesData} dataKey="events" stroke="#3b82f6" />
                            </CardContent>
                        </Card>

                        {/* Error Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Error Distribution</CardTitle>
                                <CardDescription>Breakdown of error types</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center">
                                <SimplePieChart
                                    data={analytics.errorRateData}
                                    dataKey="value"
                                    nameKey="name"
                                    colors={['#ef4444', '#f59e0b', '#3b82f6', '#6b7280']}
                                />
                            </CardContent>
                        </Card>

                        {/* Performance Percentiles */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Latency Percentiles</CardTitle>
                                <CardDescription>Response time distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleBarChart data={analytics.performanceData} dataKey="value" fill="#10b981" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Area Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Event Analytics</CardTitle>
                            <CardDescription>Cumulative view of all metrics</CardDescription>
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
                                    <p className="font-medium">Peak Activity</p>
                                    <p className="text-sm text-muted-foreground">Maximum concurrent connections</p>
                                </div>
                                <Badge>{analytics.summary.totalUsers} users</Badge>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                                <div>
                                    <p className="font-medium">Active Channels</p>
                                    <p className="text-sm text-muted-foreground">Currently processing events</p>
                                </div>
                                <Badge variant="secondary">{analytics.summary.activeChannels}</Badge>
                            </div>
                            <div className="flex items-center justify-between border-t pt-4">
                                <div>
                                    <p className="font-medium">Error Rate Trend</p>
                                    <p className="text-sm text-muted-foreground">Last 7 days average</p>
                                </div>
                                <Badge variant="warning">{analytics.summary.errorRate}%</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </>
            ) : null}
        </div>
    );
}
