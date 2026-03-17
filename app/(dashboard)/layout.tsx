// app/(dashboard)/layout.tsx
import * as React from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '16rem',
                    '--header-height': '4rem',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" collapsible="icon" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
