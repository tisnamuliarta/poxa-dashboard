// app/(dashboard)/channels/page.tsx
'use client';

import { useState } from 'react';
import { Search, Plus, Settings } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChannels } from '@/hooks/useRealData';

export default function ChannelsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { channels, loading, error } = useChannels();

    const filteredChannels = (channels || []).filter((channel) =>
        (channel?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight">Channels</h1>
                    <p className="text-base text-muted-foreground">Manage your Poxa channels and subscriptions</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Channel
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Search Channels</CardTitle>
                    <CardDescription>Find channels by name</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search channels..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Channels Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Channels List</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `${filteredChannels.length} channel${filteredChannels.length !== 1 ? 's' : ''} found`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <div className="text-destructive text-sm mb-4">{error}</div>}
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading channels...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Subscriptions</TableHead>
                                        <TableHead className="text-right">Users</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredChannels.length > 0 ? (
                                        filteredChannels.map((channel) => (
                                            <TableRow key={channel.name}>
                                                <TableCell className="font-medium">{channel.name}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={channel.occupied ? 'success' : 'outline'}
                                                    >
                                                        {channel.occupied ? 'active' : 'inactive'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {channel.subscription_count}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {channel.user_count || 0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <Settings className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Clear Events</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                                No channels found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
