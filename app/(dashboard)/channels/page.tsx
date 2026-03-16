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

const channels = [
    {
        id: 1,
        name: 'default',
        status: 'active',
        eventCount: 1234,
        subscribers: 12,
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'notifications',
        status: 'active',
        eventCount: 567,
        subscribers: 8,
        createdAt: '2024-01-20',
    },
    {
        id: 3,
        name: 'analytics',
        status: 'active',
        eventCount: 3456,
        subscribers: 25,
        createdAt: '2024-01-25',
    },
    {
        id: 4,
        name: 'webhooks',
        status: 'inactive',
        eventCount: 234,
        subscribers: 3,
        createdAt: '2024-02-01',
    },
    {
        id: 5,
        name: 'monitoring',
        status: 'active',
        eventCount: 890,
        subscribers: 15,
        createdAt: '2024-02-05',
    },
];

export default function ChannelsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChannels = channels.filter((channel) =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-8 p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
                    <p className="text-muted-foreground">Manage your Poxa channels and subscriptions</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Channel
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardHeader>
                    <CardTitle>Search Channels</CardTitle>
                    <CardDescription>Find channels by name</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search channels..."
                                className="pl-8"
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
                    <CardTitle>Channels List</CardTitle>
                    <CardDescription>
                        {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''} found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Events</TableHead>
                                    <TableHead className="text-right">Subscribers</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredChannels.length > 0 ? (
                                    filteredChannels.map((channel) => (
                                        <TableRow key={channel.id}>
                                            <TableCell className="font-medium">{channel.name}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={channel.status === 'active' ? 'success' : 'outline'}
                                                >
                                                    {channel.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{channel.eventCount}</TableCell>
                                            <TableCell className="text-right">{channel.subscribers}</TableCell>
                                            <TableCell>{channel.createdAt}</TableCell>
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
                                        <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                            No channels found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
