// lib/poxa-client.ts
import crypto from 'crypto';
import { Channel, ChannelInfo, PresenceUser, PoxaStats } from '@/types/poxa';

/**
 * HMAC Auth for Pusher-compatible requests
 * Based on: https://pusher.com/docs/channels/library_auth_reference/rest-api#authentication
 */
function signRequest(method: string, path: string, params: Record<string, string>) {
    const sortedParams = Object.keys(params)
        .sort()
        .map((k) => `${k}=${encodeURIComponent(params[k])}`)
        .join('&');

    const stringToSign = `${method}\n${path}\n${sortedParams}`;

    const signature = crypto
        .createHmac('sha256', process.env.POXA_SECRET || '')
        .update(stringToSign)
        .digest('hex');

    return signature;
}

/**
 * Make authenticated request to Poxa
 */
async function request<T>(
    method: 'GET' | 'POST',
    path: string,
    data?: Record<string, any>
): Promise<T> {
    const host = process.env.POXA_HOST || 'localhost';
    const port = process.env.POXA_PORT || '8080';
    const scheme = process.env.POXA_SCHEME || 'http';
    const appId = process.env.POXA_APP_ID || 'app_id';
    const appKey = process.env.POXA_APP_KEY || 'app_key';

    const baseUrl = `${scheme}://${host}:${port}`;

    // Build query params
    const params: Record<string, string> = {
        auth_key: appKey,
        auth_timestamp: Math.floor(Date.now() / 1000).toString(),
        auth_version: '1.0',
    };

    // For GET requests, add data as query params
    if (method === 'GET' && data) {
        Object.assign(params, data);
    }

    const signature = signRequest(method, path, params);
    params.auth_signature = signature;

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}${path}?${queryString}`;

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method === 'POST' && data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Poxa request failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Poxa API Client
 */
export const poxaClient = {
    /**
     * Get all channels
     */
    async getChannels(prefixFilter?: string): Promise<Channel[]> {
        const path = `/apps/${process.env.POXA_APP_ID}/channels`;
        const result = await request<{ channels: Record<string, Channel> }>('GET', path, {
            ...(prefixFilter && { filter_by_prefix: prefixFilter }),
        });
        // Convert object with channel names as keys to array with name property
        return Object.entries(result.channels || {}).map(([name, channel]) => ({
            ...channel,
            name,
        }));
    },

    /**
     * Get channel info
     */
    async getChannel(name: string): Promise<ChannelInfo> {
        const path = `/apps/${process.env.POXA_APP_ID}/channels/${name}`;
        const data = await request<ChannelInfo>('GET', path);
        return { ...data, name };
    },

    /**
     * Get presence channel users
     */
    async getChannelUsers(channelName: string): Promise<PresenceUser[]> {
        const path = `/apps/${process.env.POXA_APP_ID}/channels/${channelName}/users`;
        const result = await request<{ users: PresenceUser[] }>('GET', path);
        return result.users || [];
    },

    /**
     * Trigger an event
     */
    async triggerEvent(
        channel: string,
        eventName: string,
        data: Record<string, any>,
        socketId?: string
    ): Promise<{ success: boolean }> {
        const path = `/apps/${process.env.POXA_APP_ID}/events`;
        const payload = {
            name: eventName,
            channels: [channel],
            data: JSON.stringify(data),
            ...(socketId && { socket_id: socketId }),
        };

        return request<{ success: boolean }>('POST', path, payload);
    },

    /**
     * Health check - test connection to Poxa
     */
    async healthCheck(): Promise<boolean> {
        try {
            await poxaClient.getChannels();
            return true;
        } catch {
            return false;
        }
    },
};

export default poxaClient;
