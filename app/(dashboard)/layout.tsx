// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-0">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-8 md:p-12 md:pl-6">{children}</main>
            </div>
        </div>
    );
}
