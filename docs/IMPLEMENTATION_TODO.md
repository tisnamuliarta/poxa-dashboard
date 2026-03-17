# Poxa Dashboard - Implementation Plan Summary

## 🎯 Project Overview

**Goal**: Build an enterprise-grade monitoring dashboard for Poxa (self-hosted Pusher server)

**Stack**: 
- Next.js 16 (Turbopack, React Compiler, App Router)
- TypeScript 5.x
- Prisma + SQLite
- NextAuth.js v5
- Recharts (analytics)
- Pusher-js (real-time WebSocket)

---

## 📋 Todo List Breakdown (25 Items)

### Phase 1: Foundation (7 tasks)
```
[1] ✅ Install dependencies
[2] [ ] Design system (globals.css - color tokens, spacing, typography)
[3] [ ] Layout components (Sidebar, Topbar, ThemeToggle)
[4] [ ] Prisma schema + SQLite setup
[5] [ ] NextAuth.js v5 configuration
[6] [ ] Login page
[7] [ ] Poxa REST API client library
```

### Phase 2: Core Pages (5 tasks)
```
[8] [ ] Overview page (stats cards, gauges, activity feed)
[9] [ ] Channels page (list with filters)
[10] [ ] Channel detail page (/channels/[name])
[11] [ ] Debug console (real-time event stream)
[12] [ ] Event creator (trigger events with JSON)
```

### Phase 3: Analytics (5 tasks)
```
[13] [ ] Analytics page (time-series charts)
[14] [ ] Background analytics collector (30s poller)
[15] [ ] API Keys page (with code snippets in 6 languages)
[16] [ ] Webhooks page (configuration + delivery log)
[17] [ ] Settings page (server config + preferences)
```

### Phase 4: Polish & Deploy (8 tasks)
```
[18] [ ] UI Primitive components (Button, Card, Badge, Input, Modal, etc.)
[19] [ ] Responsive design (mobile drawer, tablet breakpoints)
[20] [ ] Framer Motion animations (hover effects, transitions)
[21] [ ] View Transitions (React 19.2 page navigation)
[22] [ ] Error boundaries + loading states
[23] [ ] Docker Dockerfile + compose file
[24] [ ] SEO meta tags + Metadata API
[25] [ ] Manual verification & browser testing
```

---

## 🏗️ Project Structure

```
poxa-dashboard/
├── app/
│   ├── layout.tsx (root layout - sidebar + theme)
│   ├── page.tsx (redirect to /overview)
│   ├── globals.css (design tokens)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx (centered auth layout)
│   ├── (dashboard)/
│   │   ├── layout.tsx (dashboard shell with sidebar)
│   │   ├── overview/page.tsx (home - 4 stats + charts)
│   │   ├── channels/
│   │   │   ├── page.tsx (list + filters)
│   │   │   └── [name]/page.tsx (detail)
│   │   ├── debug/page.tsx (event stream console)
│   │   ├── events/page.tsx (event creator)
│   │   ├── analytics/page.tsx (time-series charts)
│   │   ├── api-keys/page.tsx (credentials + snippets)
│   │   ├── webhooks/page.tsx (config + delivery log)
│   │   └── settings/page.tsx (preferences)
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── poxa/
│       │   ├── channels/route.ts
│       │   ├── channels/[name]/route.ts
│       │   ├── channels/[name]/users/route.ts
│       │   ├── events/route.ts
│       │   └── stats/route.ts
│       ├── analytics/route.ts
│       ├── audit/route.ts
│       └── settings/route.ts
├── components/
│   ├── ui/ (primitives)
│   ├── layout/ (Sidebar, Topbar, ThemeToggle)
│   ├── dashboard/ (StatsCard, ConnectionGauge, ActivityFeed, etc.)
│   ├── channels/ (ChannelTable, ChannelDetail, PresenceMembers)
│   ├── debug/ (EventStream, EventFilter, EventDetail)
│   ├── events/ (EventCreator, EventHistory)
│   ├── analytics/ (ConnectionChart, MessageChart, PeakStats)
│   └── settings/ (ServerConfig, DashboardPrefs)
├── lib/
│   ├── poxa-client.ts (REST API wrapper)
│   ├── poxa-auth.ts (HMAC signing)
│   ├── pusher-client.ts (Browser pusher-js instance)
│   ├── prisma.ts (Prisma singleton)
│   ├── analytics-collector.ts (Background poller)
│   └── utils.ts (Formatters, helpers)
├── hooks/
│   ├── useRealtimeEvents.ts
│   ├── usePolling.ts
│   └── useTheme.ts
├── types/
│   ├── poxa.ts
│   ├── analytics.ts
│   └── dashboard.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 🎨 Design System

### Color Tokens
```css
Primary: hsl(252, 87%, 64%)        /* Vibrant indigo */
Success: hsl(142, 71%, 45%)        /* Green */
Warning: hsl(38, 92%, 50%)         /* Amber */
Danger: hsl(0, 84%, 60%)           /* Red */
Info: hsl(199, 89%, 48%)           /* Blue */

Background: hsl(220, 20%, 98%)     /* Light gray */
Surface: hsl(0, 0%, 100%)          /* White */
Border: hsl(220, 13%, 91%)         /* Light gray border */
Text: hsl(220, 15%, 15%)           /* Dark gray text */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (for JSON/code)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Radius
- sm: 6px
- md: 10px
- lg: 16px
- full: 9999px (pill)

### Shadows
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 12px rgba(0,0,0,0.08)
- lg: 0 12px 40px rgba(0,0,0,0.12)

---

## 💾 Prisma Data Models

```prisma
model User {
  id        String @id @default(cuid())
  email     String @unique
  password  String  // bcrypt hashed
  name      String?
  role      String @default("admin")
  createdAt DateTime @default(now())
}

model AnalyticsSnapshot {
  id              String @id @default(cuid())
  timestamp       DateTime @default(now())
  connections     Int
  channels        Int
  publicChannels  Int
  privateChannels Int
  messagesPerMin  Float
}

model EventLog {
  id       String @id @default(cuid())
  channel  String
  event    String
  data     String  // JSON
  socketId String?
  source   String  // "api" | "client" | "console"
  createdAt DateTime @default(now())
}

model AuditLog {
  id       String @id @default(cuid())
  action   String
  actor    String
  details  String? // JSON
  ip       String?
  createdAt DateTime @default(now())
}

model WebhookConfig {
  id        String @id @default(cuid())
  url       String
  secret    String
  events    String  // JSON array
  active    Boolean @default(true)
  createdAt DateTime @default(now())
}

model DashboardSettings {
  id             String @id @default("default")
  theme          String @default("system")
  refreshInterval Int    @default(5000)
  maxLogSize     Int    @default(500)
  timezone       String @default("UTC")
}
```

---

## 🔐 Environment Variables Template

```env
# Poxa Server Connection
POXA_HOST=localhost
POXA_PORT=8080
POXA_APP_ID=app_id
POXA_APP_KEY=app_key
POXA_SECRET=secret
POXA_USE_SSL=false

# Dashboard
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./prisma/dev.db

# Admin Seed User
ADMIN_EMAIL=admin@poxa.local
ADMIN_PASSWORD=admin123
```

---

## 🚀 Key Pages & Features

### 1. Login (`/login`)
- Centered glassmorphism card
- Email + password form
- Remember me checkbox
- CSRF protection

### 2. Overview (`/overview`)
- 4 stat cards (active connections, total channels, messages/min, uptime)
- Connection gauge (animated radial)
- Live activity feed (50 latest events)
- Channel distribution donut chart
- 24h message volume area chart

### 3. Channels (`/channels`)
- Sortable/filterable table
- Type filters (public, private, presence)
- Real-time subscriber count badges
- Detail view with subscriber list + presence members

### 4. Debug Console (`/debug`)
- Full-height split panel layout
- Filter by channel, event name, type, time range
- Color-coded events (connection, subscription, message, webhook)
- Expandable JSON payload viewer
- Pause/resume stream, export logs

### 5. Event Creator (`/events`)
- Channel autocomplete input
- Event name input
- JSON editor with syntax highlighting
- Optional socket ID (exclusion pattern)
- Response display + history table

### 6. Analytics (`/analytics`)
- Connections over time (1h / 6h / 24h / 7d / 30d)
- Messages by type stacked bar
- Peak connections indicator
- Channel growth area chart
- Top channels bar chart
- Exportable data table

### 7. API Keys (`/api-keys`)
- Masked credential display (App ID, App Key, Secret, Cluster)
- Reveal/Copy buttons
- Code snippets in 6 languages (JS, Python, PHP, Ruby, Go, Elixir)

### 8. Webhooks (`/webhooks`)
- Webhook URL configuration
- Event type toggles
- Secret key setup
- Test webhook button
- Delivery log table (status, response code, latency, retry)

### 9. Settings (`/settings`)
- Server config display (read-only)
- Dashboard preferences (theme, refresh interval, timezone)
- Export settings button

---

## 🐳 Docker Deployment

### docker-compose.yml
```yaml
services:
  poxa:
    image: edgurgel/poxa-automated:latest
    ports:
      - "8080:8080"
    environment:
      POXA_APP_KEY: app_key
      POXA_SECRET: secret
      POXA_APP_ID: app_id
      PORT: 8080

  dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      POXA_HOST: poxa
      POXA_PORT: 8080
      NEXTAUTH_SECRET: change-me
      NEXTAUTH_URL: http://localhost:3000
    depends_on:
      - poxa
```

---

## ⚙️ Installation & Setup

```bash
# Install dependencies
npm install

# Initialize Prisma
npx prisma migrate dev --name init
npx prisma db seed

# Start development server
npm run dev

# Build for production
npm run build
npm run start
```

---

## ✅ Verification Checklist

- [ ] Login page loads and authenticates
- [ ] Overview stats cards fetch data from Poxa
- [ ] Charts render with sample data
- [ ] Real-time event stream works
- [ ] Event creator triggers events successfully
- [ ] Analytics accumulate data over time
- [ ] Dark/light theme toggle works
- [ ] Mobile responsive layout
- [ ] All API routes handle errors gracefully
- [ ] Docker builds and runs successfully

---

## 🔗 Key Resources

- **Poxa**: https://github.com/edgurgel/poxa
- **Next.js 16**: https://nextjs.org
- **Prisma**: https://www.prisma.io
- **NextAuth.js v5**: https://authjs.dev
- **Recharts**: https://recharts.org
- **Pusher-js**: https://pusher.com/docs/channels/library_auth_reference/javascript
