// types/poxa.ts

export interface Channel {
    name: string;
    occupied: boolean;
    subscription_count?: number;
    user_count?: number;
}

export interface ChannelInfo {
    name: string;
    occupied: boolean;
    subscription_count: number;
    user_count?: number;
}

export interface PresenceUser {
    user_id: string;
    user_info?: Record<string, any>;
}

export interface PoxaStats {
    channels: number;
    public_channels: number;
    private_channels: number;
    presence_channels: number;
    connections: number;
}

export interface PoxaEvent {
    name: string;
    channel?: string;
    socket_id?: string;
    data: string; // JSON string
}

export type PoxaEventResponse = {
    success: boolean;
    message?: string;
    error?: string;
};
