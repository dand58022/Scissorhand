# Agent Guide

This file is for future AI agents or developers continuing the Scissorhands project.

## Project Intent

Scissorhands is a minimalist salon booking platform. It should feel like a premium salon website, not an enterprise scheduling system or generic SaaS dashboard.

Keep the system lightweight. The current business need is simple: customers submit appointment requests, and the salon can view/edit/cancel appointments.

## Key Rules

- Do not overengineer.
- Prefer the current one-table Supabase appointment structure unless a real requirement justifies more tables.
- Do not add payment processing.
- Do not turn this into a CRM.
- Preserve Scissorhands branding, logo switching, typography direction, and dark/light theme.
- Keep admin functionality appointment-focused until authentication and real operational needs are defined.
- Do not delete anything in `src/assets`.
- Do not hardcode Supabase keys or future integration credentials.

## Architecture Summary

- `src/App.tsx` defines routes for `/`, `/booking`, and `/admin`.
- `src/pages/HomePage.tsx` renders the public salon website.
- `src/pages/BookingPage.tsx` renders the booking flow.
- `src/pages/AdminPage.tsx` renders the appointment admin table, status filter, and edit modal.
- `src/hooks/useSalonState.ts` coordinates local booking state, local services/stylists/availability, and Supabase appointment calls.
- `src/integrations/supabase/client.ts` creates the Supabase client from Vite env vars.
- `src/integrations/supabase/appointments.ts` maps Supabase rows to the app model and exposes appointment CRUD helpers.
- `src/lib/salonModel.ts` contains pure helpers for service lookup, stylist compatibility, availability, appointment creation, and overlap checks.
- `src/data/salonData.ts` contains local services, stylists, and date-specific availability.

## Booking Flow

1. Customer selects service.
2. Customer optionally selects stylist or leaves `No preference`.
3. Customer selects date.
4. Available slots are computed from local availability plus existing Supabase appointments.
5. Customer enters name, phone, email, and notes.
6. `useSalonState.confirmBooking` validates with `createAppointment`.
7. `insertAppointment` writes the appointment to Supabase.

If no stylist is selected, the local model assigns the first compatible available stylist for the selected slot.

## Admin Behavior

- Admin loads appointments from Supabase.
- Default filter is `upcoming`.
- Admin can filter `upcoming`, `completed`, and `cancelled`.
- Admin can edit appointment details and status in `AppointmentModal`.
- Cancel sets status to `cancelled`; deletion is not implemented.
- Admin is not protected yet. Do not publish the admin route without adding protection.

## How To Safely Modify

- Change appointment persistence in `src/integrations/supabase/appointments.ts`.
- Change booking validation in `src/lib/salonModel.ts`.
- Change shared state orchestration in `src/hooks/useSalonState.ts`.
- Change customer booking UI in `src/components/BookingForm.tsx` and `src/components/TimeSlotSelector.tsx`.
- Change admin UI in `src/pages/AdminPage.tsx`, `src/components/AppointmentsTable.tsx`, and `src/components/AppointmentModal.tsx`.
- If you change appointment shape or status values, update `src/lib/types.ts`, Supabase mapping, tests, README SQL, and admin filters together.

## Future Work Guidelines

### Yelp

Use a server-side function or backend endpoint. Do not call Yelp directly from the browser with a private API key. Confirm Yelp display and attribution rules before rendering reviews or images.

### Google Maps

Use a restricted Google Maps API key or an iframe embed. Keep the key domain-restricted. Replace the current location placeholder only after final address and Google Business details are confirmed.

### Admin Auth

The simplest path is Supabase Auth with one admin user. After auth exists, add RLS policies so only authenticated/admin users can read and update appointments. Public anonymous users should only be able to insert booking requests.

### Availability

Only add availability tables when static date-based availability becomes too limiting. The likely next tables would be stylist schedules, blocked dates, and appointment holds.
