// hooks/useRealData.ts
import { useEffect, useState, useCallback } from 'react';

export interface StatsData {
    totalChannels: number;
    activeChannels: number;
    totalSubscriptions: number;
    totalUsers: number;
}

export interface ChannelData {
    name: string;
    occupied: boolean;
    subscription_count: number;
    user_count?: number;
}

export interface AnalyticsData {
    summary: {
        totalSubscriptions: number;
        activeChannels: number;
        totalChannels: number;
        occupiedRate: number;
        avgSubscriptionsPerChannel: number;
        presenceChannels: number;
        privateChannels: number;
        publicChannels: number;
    };
    timeSeriesData: Array<{
        name: string;
        events: number;
        messages: number;
    }>;
    distributionData: Array<{ name: string; value: number }>;
    percentileData: Array<{ name: string; value: number }>;
}

export function useStats() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setStats(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
        // Refresh every 5 seconds
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
}

export function useChannels() {
    const [channels, setChannels] = useState<ChannelData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChannels = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/channels');
            if (!response.ok) throw new Error('Failed to fetch channels');
            const data = await response.json();
            setChannels(data.channels || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setChannels([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChannels();
        // Refresh every 5 seconds
        const interval = setInterval(fetchChannels, 5000);
        return () => clearInterval(interval);
    }, [fetchChannels]);

    return { channels, loading, error, refetch: fetchChannels };
}

export function useAnalytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/analytics');
            if (!response.ok) throw new Error('Failed to fetch analytics');
            const data = await response.json();
            setAnalytics(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setAnalytics(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnalytics();
        // Refresh every 10 seconds
        const interval = setInterval(fetchAnalytics, 10000);
        return () => clearInterval(interval);
    }, [fetchAnalytics]);

    return { analytics, loading, error, refetch: fetchAnalytics };
}
