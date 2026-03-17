import { NextRequest, NextResponse } from 'next/server';
import poxaClient from '@/lib/poxa-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { channel, eventName, data, socketId } = body ?? {};

        if (!channel || !eventName) {
            return NextResponse.json(
                { success: false, message: 'Channel and event name are required.' },
                { status: 400 }
            );
        }

        const result = await poxaClient.triggerEvent(channel, eventName, data ?? {}, socketId);

        return NextResponse.json({
            success: result.success,
            message: result.success
                ? `Event \"${eventName}\" was sent to \"${channel}\".`
                : 'Poxa did not confirm event delivery.',
        });
    } catch (error) {
        console.error('Failed to trigger Poxa event:', error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to trigger event.',
            },
            { status: 500 }
        );
    }
}
