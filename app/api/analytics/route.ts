// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import poxaClient from '@/lib/poxa-client';

export async function GET(request: NextRequest) {
    try {
        const channels = await poxaClient.getChannels();

        const totalChannels = channels.length;
        const activeChannels = channels.filter((c) => c.occupied).length;
        const totalSubscriptions = channels.reduce((sum, c) => sum + (c.subscription_count || 0), 0);
        const occupiedRate = totalChannels === 0 ? 0 : Number(((activeChannels / totalChannels) * 100).toFixed(1));

        const presenceChannels = channels.filter((c) => c.name.startsWith('presence-')).length;
        const privateChannels = channels.filter((c) => c.name.startsWith('private-')).length;
        const publicChannels = totalChannels - presenceChannels - privateChannels;

        const truncateName = (name: string) => name.length > 16 ? `${name.slice(0, 13)}...` : name;

        const timeSeriesData = [...channels]
            .sort((a, b) => (b.subscription_count || 0) - (a.subscription_count || 0))
            .slice(0, 7)
            .map((channel) => ({
                name: truncateName(channel.name),
                events: channel.subscription_count || 0,
                messages: channel.user_count || 0,
            }));

        const distributionData = [
            { name: 'Public', value: publicChannels },
            { name: 'Private', value: privateChannels },
            { name: 'Presence', value: presenceChannels },
            { name: 'Inactive', value: channels.filter((c) => !c.occupied).length },
        ].filter((item) => item.value > 0);

        const subscriptionCounts = channels
            .map((channel) => channel.subscription_count || 0)
            .sort((a, b) => a - b);

        const percentile = (values: number[], ratio: number) => {
            if (values.length === 0) return 0;
            const index = Math.min(values.length - 1, Math.floor((values.length - 1) * ratio));
            return values[index];
        };

        const percentileData = [
            { name: 'p50', value: percentile(subscriptionCounts, 0.5) },
            { name: 'p75', value: percentile(subscriptionCounts, 0.75) },
            { name: 'p90', value: percentile(subscriptionCounts, 0.9) },
            { name: 'p95', value: percentile(subscriptionCounts, 0.95) },
            { name: 'p99', value: percentile(subscriptionCounts, 0.99) },
        ];

        return NextResponse.json({
            summary: {
                totalSubscriptions,
                activeChannels,
                totalChannels,
                occupiedRate,
                avgSubscriptionsPerChannel: totalChannels === 0 ? 0 : Number((totalSubscriptions / totalChannels).toFixed(2)),
                presenceChannels,
                privateChannels,
                publicChannels,
            },
            timeSeriesData,
            distributionData,
            percentileData,
        });
    } catch (error) {
        console.error('Failed to fetch analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
