// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import poxaClient from '@/lib/poxa-client';

export async function GET(request: NextRequest) {
    try {
        const channels = await poxaClient.getChannels();

        // Calculate analytics
        const totalEvents = channels.reduce((sum, c) => sum + (c.subscription_count || 0), 0);
        const activeChannels = channels.filter((c) => c.occupied).length;
        const totalSubscriptions = channels.reduce((sum, c) => sum + (c.subscription_count || 0), 0);

        // Generate mock time-series data based on channels
        const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });

            return {
                name: day,
                events: Math.floor(Math.random() * 400) + 200,
                messages: Math.floor(Math.random() * 300) + 100,
                errors: Math.floor(Math.random() * 50),
            };
        });

        const errorRateData = [
            { name: 'Auth Errors', value: Math.floor(Math.random() * 10) + 1 },
            { name: 'Timeout Errors', value: Math.floor(Math.random() * 15) + 2 },
            { name: 'Rate Limit Errors', value: Math.floor(Math.random() * 5) },
            { name: 'Other Errors', value: Math.floor(Math.random() * 3) },
        ];

        const performanceData = [
            { name: 'p50', value: Math.floor(Math.random() * 50) + 10 },
            { name: 'p75', value: Math.floor(Math.random() * 100) + 50 },
            { name: 'p90', value: Math.floor(Math.random() * 150) + 100 },
            { name: 'p95', value: Math.floor(Math.random() * 200) + 150 },
            { name: 'p99', value: Math.floor(Math.random() * 300) + 200 },
        ];

        return NextResponse.json({
            summary: {
                totalEvents,
                activeChannels,
                totalSubscriptions,
                avgResponseTime: Math.floor(Math.random() * 100) + 50,
                errorRate: (Math.random() * 1).toFixed(2),
            },
            timeSeriesData,
            errorRateData,
            performanceData,
        });
    } catch (error) {
        console.error('Failed to fetch analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
