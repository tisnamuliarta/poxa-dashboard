// app/api/channels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import poxaClient from '@/lib/poxa-client';

export async function GET(request: NextRequest) {
    try {
        const channels = await poxaClient.getChannels();

        // Fetch detailed info for each channel
        const channelDetails = await Promise.all(
            channels.map(async (channel) => {
                try {
                    const info = await poxaClient.getChannel(channel.name);
                    return info;
                } catch {
                    return {
                        name: channel.name,
                        occupied: channel.occupied,
                        subscription_count: channel.subscription_count || 0,
                        user_count: channel.user_count || 0,
                    };
                }
            })
        );

        return NextResponse.json({ channels: channelDetails });
    } catch (error) {
        console.error('Failed to fetch channels:', error);
        return NextResponse.json(
            { error: 'Failed to fetch channels' },
            { status: 500 }
        );
    }
}
