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

// Mock data
const timeSeriesData = [
    { name: 'Jan 1', events: 410, messages: 240, errors: 30 },
    { name: 'Jan 2', events: 380, messages: 221, errors: 15 },
    { name: 'Jan 3', events: 320, messages: 229, errors: 25 },
    { name: 'Jan 4', events: 450, messages: 200, errors: 10 },
    { name: 'Jan 5', events: 389, messages: 218, errors: 20 },
    { name: 'Jan 6', events: 520, messages: 250, errors: 15 },
    { name: 'Jan 7', events: 490, messages: 210, errors: 18 },
];

const errorRateData = [
    { name: 'Validation', value: 45 },
    { name: 'Timeout', value: 25 },
    { name: 'Auth', value: 20 },
    { name: 'Other', value: 10 },
];

const performanceData = [
    { name: 'p50', latency: 45 },
    { name: 'p75', latency: 78 },
    { name: 'p90', latency: 120 },
    { name: 'p95', latency: 180 },
    { name: 'p99', latency: 280 },
];

export default function AnalyticsPage() {
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
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42,580</div>
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
                        <div className="text-2xl font-bold">124ms</div>
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
                        <div className="text-2xl font-bold">0.42%</div>
                        <p className="text-xs text-muted-foreground">
                            <Badge variant="warning" className="mr-1">
                                ↑ 2%
                            </Badge>
                            slight increase
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Event Trends */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Event Volume Trend</CardTitle>
                        <CardDescription>Events, messages, and errors over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SimpleLineChart data={timeSeriesData} dataKey="events" stroke="#3b82f6" />
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
                            data={errorRateData}
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
                        <SimpleBarChart data={performanceData} dataKey="latency" fill="#10b981" />
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
                            data={timeSeriesData}
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
                            <p className="font-medium">Peak Traffic Hour</p>
                            <p className="text-sm text-muted-foreground">3:00 PM - 4:00 PM</p>
                        </div>
                        <Badge>4,287 events</Badge>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <div>
                            <p className="font-medium">Busiest Channel</p>
                            <p className="text-sm text-muted-foreground">analytics</p>
                        </div>
                        <Badge variant="secondary">12,430 events</Badge>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                        <div>
                            <p className="font-medium">Most Common Error</p>
                            <p className="text-sm text-muted-foreground">Validation errors</p>
                        </div>
                        <Badge variant="warning">45%</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
