import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

type SectionCardItem = {
  title: string
  value: string
  change: number
  summary: string
  detail: string
}

export function SectionCards({
  items,
}: {
  items?: SectionCardItem[]
}) {
  const cards = items ?? [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      change: 12.5,
      summary: "Trending up this month",
      detail: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: "1,234",
      change: -20,
      summary: "Down 20% this period",
      detail: "Acquisition needs attention",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      change: 12.5,
      summary: "Strong user retention",
      detail: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      change: 4.5,
      summary: "Steady performance increase",
      detail: "Meets growth projections",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((item) => {
        const isUp = item.change >= 0

        return (
          <Card key={item.title} className="@container/card">
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {isUp ? <IconTrendingUp /> : <IconTrendingDown />}
                  {isUp ? '+' : ''}{item.change}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {item.summary} {isUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
              </div>
              <div className="text-muted-foreground">{item.detail}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
