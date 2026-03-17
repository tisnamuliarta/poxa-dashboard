'use client';

import { useMemo, useState } from 'react';
import { Activity, RefreshCcw, Search } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useChannels, useStats } from '@/hooks/useRealData';

function getChannelType(name: string) {
    if (name.startsWith('presence-')) return 'presence';
    if (name.startsWith('private-')) return 'private';
    return 'public';
}

export default function DebugPage() {
    const { channels, loading, error, refetch } = useChannels();
    const { stats } = useStats();
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChannels = useMemo(() => {
        return channels.filter((channel) => {
            const type = getChannelType(channel.name);
            const status = channel.occupied ? 'active' : 'inactive';
            const matchesType = filterType === 'all' || type === filterType;
            const matchesStatus = filterStatus === 'all' || status === filterStatus;
            const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesStatus && matchesSearch;
        });
    }, [channels, filterStatus, filterType, searchTerm]);

    const counts = useMemo(() => ({
        active: channels.filter((channel) => channel.occupied).length,
        inactive: channels.filter((channel) => !channel.occupied).length,
        presence: channels.filter((channel) => channel.name.startsWith('presence-')).length,
    }), [channels]);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                    Live management snapshot
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Debug Console</h1>
                <p className="text-base text-muted-foreground">
                    Live diagnostics from the Poxa management API. Poxa does not expose a raw event log over REST,
                    so this page shows the current channel and presence snapshot instead.
                </p>
            </div>

            <Alert variant="info">
                <Activity className="h-4 w-4" />
                <AlertTitle>What is real here?</AlertTitle>
                <AlertDescription>
                    Channel names, occupied state, subscriptions, and presence user counts are live from Poxa. Historical
                    events and per-event latency are not available from the Poxa REST API.
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle>Diagnostic Controls</CardTitle>
                    <CardDescription>Filter the live snapshot and refresh on demand.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Button size="sm" variant="outline" onClick={() => refetch()}>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Refresh now
                    </Button>
                    <Badge variant="success">Auto refresh: 5s</Badge>
                    {stats ? <Badge variant="secondary">{stats.totalChannels} total channels</Badge> : null}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Channel type</label>
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All types</SelectItem>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="presence">Presence</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search channels..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Live Channel Diagnostics</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading channels…' : `${filteredChannels.length} live channel records`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error ? <div className="text-sm text-destructive">{error}</div> : null}
                    {loading ? (
                        <div className="py-8 text-center text-muted-foreground">Loading channel diagnostics...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Channel</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Subscriptions</TableHead>
                                    <TableHead className="text-right">Users</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredChannels.length > 0 ? (
                                    filteredChannels.map((channel) => {
                                        const type = getChannelType(channel.name);
                                        return (
                                            <TableRow key={channel.name}>
                                                <TableCell className="font-medium">{channel.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{type}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={channel.occupied ? 'success' : 'outline'}>
                                                        {channel.occupied ? 'active' : 'inactive'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{channel.subscription_count || 0}</TableCell>
                                                <TableCell className="text-right">{channel.user_count || 0}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                            No channels match the current filters.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{counts.active}</div>
                        <p className="text-xs text-muted-foreground">occupied channels</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{counts.inactive}</div>
                        <p className="text-xs text-muted-foreground">channels without subscribers</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Presence</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{counts.presence}</div>
                        <p className="text-xs text-muted-foreground">presence channels exposing user lists</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
