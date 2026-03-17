"use client"

import { Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/overview": { title: "Overview", subtitle: "Operational health and realtime activity" },
  "/channels": { title: "Channels", subtitle: "Manage active channels and subscriptions" },
  "/debug": { title: "Debug Console", subtitle: "Inspect live event traffic and diagnostics" },
  "/events": { title: "Events", subtitle: "Trigger and validate custom events" },
  "/analytics": { title: "Analytics", subtitle: "Track performance and channel metrics" },
  "/api-keys": { title: "API Keys", subtitle: "Manage integration credentials" },
  "/settings": { title: "Settings", subtitle: "Configure dashboard preferences" },
}

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const meta = pageMeta[pathname] ?? { title: "Poxa Dashboard", subtitle: "Realtime operations workspace" }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{meta.title}</p>
          <p className="hidden truncate text-xs text-muted-foreground md:block">{meta.subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
