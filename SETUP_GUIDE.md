# Poxa Dashboard - Setup & Installation Guide

## Quick Start

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+
- **Poxa Server**: Running on localhost:8080 (or configured POXA_HOST/POXA_PORT)
- **Docker** (optional): For containerized deployment

### 1. Clone & Install

```bash
cd poxa-dashboard
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and update for your environment:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Poxa Server (adjust if running remotely)
POXA_HOST=localhost
POXA_PORT=8080
POXA_APP_ID=app_id
POXA_APP_KEY=app_key
POXA_SECRET=secret

# NextAuth
NEXTAUTH_SECRET=your-secret-key (generate: `openssl rand -base64 32`)
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=file:./prisma/dev.db

# Admin User
ADMIN_EMAIL=admin@poxa.local
ADMIN_PASSWORD=admin123
```

### 3. Initialize Database

```bash
# Create SQLite database and run migrations
npx prisma db push

# Seed with default admin user
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000/login** and login with:
- Email: `admin@poxa.local`
- Password: `admin123`

---

## Docker Deployment

### Single Command Deployment

```bash
docker-compose up -d
```

This starts:
- **Poxa Server** on `http://localhost:8080`
- **Dashboard** on `http://localhost:3000`

### Build Custom Image

```bash
docker build -t poxa-dashboard:latest .
docker run -p 3000:3000 \
  -e POXA_HOST=poxa \
  -e NEXTAUTH_SECRET=your-secret \
  poxa-dashboard:latest
```

---

## Project Structure

```
poxa-dashboard/
├── app/                          # Next.js App Router
│   ├── (auth)/login              # Login page
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── overview              # Home page
│   │   ├── channels              # Channel management
│   │   ├── debug                 # Event console
│   │   ├── events                # Event creator
│   │   ├── analytics             # Analytics
│   │   ├── api-keys              # API credentials
│   │   ├── webhooks              # Webhooks
│   │   └── settings              # Settings
│   ├── api/                      # API endpoints
│   │   ├── auth/[...nextauth]    # NextAuth handler
│   │   ├── poxa/                 # Poxa proxy routes
│   │   └── analytics/            # Analytics routes
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Redirects to /overview
│   └── globals.css               # Design system tokens
├── components/
│   ├── ui/                       # Primitive components
│   ├── layout/                   # Sidebar, Topbar
│   └── dashboard/                # Feature components
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── poxa-client.ts            # Poxa API client
│   ├── prisma.ts                 # Prisma singleton
│   └── auth-handlers.ts          # Auth route handlers
├── hooks/
│   ├── useTheme.ts               # Dark/light mode
│   └── useRealtimeEvents.ts      # Real-time events hook
├── types/
│   ├── poxa.ts                   # Poxa types
│   └── dashboard.ts              # Dashboard types
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
├── docker-compose.yml            # Docker setup
├── Dockerfile                    # Container image
├── package.json
├── tsconfig.json
├── .env.example
└── .env.local                    # (create from .env.example)
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint

# Database
npx prisma db push    # Push schema to database
npx prisma db seed    # Seed default data
npx prisma studio    # Open Prisma Studio (visual editor)

# Docker
docker-compose up     # Start all services
docker-compose down   # Stop all services
```

---

## Features

✅ **Authentication**
- NextAuth.js v5 with credential provider
- JWT session management
- Protected routes

✅ **Dashboard Pages**
- **Overview**: Real-time stats, metrics, activity feed
- **Channels**: List, filter, and manage channels
- **Debug Console**: Real-time event logging and filtering
- **Event Creator**: Trigger events on channels
- **Analytics**: Time-series metrics and graphs
- **API Keys**: Credential display with code snippets
- **Webhooks**: Webhook configuration (when Poxa supports it)
- **Settings**: Dashboard preferences and server config

✅ **Design System**
- Comprehensive CSS custom properties (colors, spacing, radius, shadows)
- Dark & Light mode support
- Responsive design (mobile, tablet, desktop)
- Glassmorphism UI components

✅ **Technology Stack**
- Next.js 16 (App Router, React Compiler, Turbopack)
- React 19.2 with Server Components
- TypeScript 5
- Prisma + SQLite
- NextAuth.js v5
- Recharts for analytics
- Framer Motion for animations
- Lucide React icons

---

## Troubleshooting

### Database Issues

```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npx prisma db seed
```

### Poxa Connection Error

Check `.env.local`:
```env
POXA_HOST=localhost    # Match your Poxa server hostname
POXA_PORT=8080         # Match your Poxa server port
POXA_APP_ID=app_id     # Must match Poxa config
POXA_APP_KEY=app_key   # Must match Poxa config
POXA_SECRET=secret     # Must match Poxa secret
```

Verify Poxa is running:
```bash
curl http://localhost:8080/
```

### Login Issues

- **Clear cookies**: Browser Dev Tools → Application → Cookies → Clear all
- **Reset password**: Delete user from database and reseed
- **Check NEXTAUTH_SECRET**: Must be set (generate with `openssl rand -base64 32`)

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Update dependencies
npm install
```

---

## Security Notes

⚠️ **Development Only**
- Change `NEXTAUTH_SECRET` in production
- Use strong `ADMIN_PASSWORD`
- Enable HTTPS/SSL (`POXA_USE_SSL=true`)
- Restrict network access to dashboard

⚠️ **Production Checklist**
- [ ] Change `NEXTAUTH_SECRET` and `ADMIN_PASSWORD`
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Enable HTTPS
- [ ] Use strong database backup strategy
- [ ] Configure environment variables securely (never in code)
- [ ] Set up database backups
- [ ] Monitor server logs

---

## Development Workflow

###1. Add New Page

Create in `app/(dashboard)/[feature]/page.tsx`:
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feature | Poxa Dashboard',
};

export default function FeaturePage() {
  return <div><h1>Feature</h1></div>;
}
```

### 2. Add New Component

Create in `components/[category]/Component.tsx`:
```tsx
// Install dependencies: npm install component-library
import { Card } from '@/components/ui/Card';

export function Component() {
  return <Card>...</Card>;
}
```

### 3. Add API Route

Create in `app/api/[feature]/route.ts`:
```tsx
export async function GET(req: Request) {
  return Response.json({ status: 'ok' });
}
```

### 4. Add Database Model

Edit `prisma/schema.prisma`:
```prisma
model Feature {
  id    String  @id @default(cuid())
  name  String
  // ...
}
```

Then run:
```bash
npx prisma db push
```

---

## API Endpoints

### Poxa Proxy (Authenticated)
- `GET /api/poxa/channels` - List all channels
- `GET /api/poxa/channels/[name]` - Channel info
- `GET /api/poxa/channels/[name]/users` - Presence members
- `POST /api/poxa/events` - Trigger event

### Dashboard
- `GET /api/analytics` - Fetch analytics
- `POST /api/analytics` - Store snapshot
- `GET /api/audit` - Audit log
- `GET /api/settings` - Dashboard settings

### Auth
- `GET /api/auth/session` - Current session
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/signout` - Sign out

---

## Performance Tips

- Use React Server Components for data fetching
- Enable static generation with `generateStaticParams()`
- Cache API responses with `next/cache`
- Use Image optimization (`next/image`)
- Monitor Turbopack build times
- Lazy load heavy components with `React.lazy()`

---

## Contributing

Feel free to submit issues, fork, and send pull requests for any improvements.

---

## License

MIT

---

## Support

For issues with:
- **Poxa**: https://github.com/edgurgel/poxa
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **NextAuth**: https://authjs.dev
