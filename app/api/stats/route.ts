// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import poxaClient from '@/lib/poxa-client';

export async function GET(request: NextRequest) {
    try {
        // Get all channels to calculate stats
        const channels = await poxaClient.getChannels();

        // Calculate channel statistics
        const stats = {
            totalChannels: channels.length,
            activeChannels: channels.filter((c) => c.occupied).length,
            totalSubscriptions: channels.reduce((sum, c) => sum + (c.subscription_count || 0), 0),
            totalUsers: channels.reduce((sum, c) => sum + (c.user_count || 0), 0),
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Failed to fetch stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
