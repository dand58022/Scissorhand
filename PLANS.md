# Roadmap

## Phase 1: Current MVP

- Branded Scissorhands homepage.
- Dark/light theme toggle.
- Logo switching for navbar, hero, booking page, and footer.
- Service pricing display.
- Customer booking flow.
- Supabase appointment storage.
- Admin appointment table.
- Admin filters for upcoming, completed, and cancelled appointments.
- Admin edit/cancel flow.
- Polished placeholders for Yelp gallery, Yelp reviews, and Google Maps.

## Supabase Table Needed

Current MVP needs one table: `appointments`.

Required columns:

- `id`
- `name`
- `phone`
- `email`
- `service`
- `stylist`
- `date`
- `time`
- `notes`
- `status`
- `created_at`

Allowed status values:

- `upcoming`
- `completed`
- `cancelled`

Recommended database protection:

- Index `status`.
- Index `date, time`.
- Unique active-slot index on `stylist, date, time` where `status = 'upcoming'`.
- Enable RLS before public launch.

## Phase 2: Near-Term Improvements

- Add admin authentication.
- Add Supabase RLS policies.
- Improve availability logic beyond hardcoded dates.
- Add blocked-off days.
- Improve mobile booking progress and form ergonomics.
- Add clearer booking error states for Supabase/database conflicts.
- Confirm final service pricing, durations, address, contact, and copy.

## Phase 3: Integrations

- Yelp review integration through a server-side function.
- Yelp/client gallery integration through a server-side function or approved content workflow.
- Google Maps embed or Maps JavaScript integration.
- Optional email confirmation through a service such as Resend, Postmark, or SendGrid.
- Optional SMS confirmation through Twilio or similar.

## Phase 4: Optional Future

- Customer reminder messages.
- Stylist schedules stored in Supabase.
- Recurring weekly availability.
- Blocked dates and vacation holds.
- Reschedule/cancel links for customers.
- Basic booking analytics.
- Lightweight reporting for service volume and peak days.
- Multi-location support only if the salon expands.
