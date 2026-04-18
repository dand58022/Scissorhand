# Scissorhands Salon Booking

Scissorhands is a lightweight salon booking website built with React, Vite, TypeScript, and Supabase. It presents a branded public salon site, a customer booking flow, and a minimal admin appointment manager.

The current system is intentionally small: Supabase stores appointment records, while services, stylists, and simple availability windows are defined locally in code.

## Features

- Public homepage for Scissorhands with salon branding, services, stylist specialty cards, reviews placeholder, gallery placeholder, location placeholder, and booking CTA.
- Light/dark theme toggle with logo asset switching.
- Booking page with service selection, optional stylist selection, date selection, available time slots, customer contact fields, notes, and appointment summary.
- Supabase-backed appointment creation.
- Client-side duplicate and overlap checks before appointment insert.
- Admin page that reads appointments from Supabase.
- Admin status filters for `upcoming`, `completed`, and `cancelled`.
- Admin appointment edit modal for customer details, service, stylist, date, time, status, and notes.
- Appointment cancellation through status update.
- No payment, checkout, customer accounts, or CRM features.

## Tech Stack

- React 18
- Vite 6
- TypeScript
- React Router
- Supabase JavaScript client
- Vitest
- Custom CSS theme system
- Logo/image assets in `src/assets`

Note: the project is described as a shadcn/ui project in earlier direction, but the current codebase does not include a shadcn/ui dependency or generated shadcn components. The implemented UI uses custom React components and CSS.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add Supabase values to `.env`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run locally:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

## Environment Variables

Required:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Reserved for future integrations:

```bash
VITE_GOOGLE_MAPS_API_KEY=
VITE_YELP_API_KEY=
```

## Supabase Appointments Table

The app expects one table named `appointments`.

```sql
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  stylist text not null,
  date date not null,
  time text not null,
  notes text,
  status text not null default 'upcoming' check (status in ('upcoming', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index appointments_status_idx on public.appointments(status);
create index appointments_date_time_idx on public.appointments(date, time);
create unique index appointments_active_slot_idx
  on public.appointments(stylist, date, time)
  where status = 'upcoming';
```

The unique active-slot index is recommended because the frontend checks availability, but the database should still protect against simultaneous duplicate bookings.

## Project Structure

```text
src/
  assets/                 logo and image assets
  components/             reusable UI and booking/admin components
  data/                   local services, stylists, and availability
  hooks/                  shared app state and Supabase orchestration
  integrations/supabase/  Supabase client and appointment API wrapper
  lib/                    shared types and pure booking helpers
  pages/                  route-level pages
  sections/               homepage and booking page sections
  styles/                 global CSS, theme, and font imports
```

## Current Limitations

- Admin route is not authenticated.
- Services, stylists, and availability are local static data, not Supabase tables.
- Availability is simple and date-based; there is no recurring schedule engine.
- Duplicate and overlap checks run in the frontend before insert; use the database index above for stronger protection.
- Yelp gallery and review sections are polished placeholders only.
- Google Maps is a polished placeholder only.
- Email/SMS confirmations are not implemented.
- There is no payment flow.
