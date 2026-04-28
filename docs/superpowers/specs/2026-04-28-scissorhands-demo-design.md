# Scissorhands Demo Refresh Design

**Goal:** Update the existing Scissorhands salon app so it is demo-ready, with one canonical salon address, more confident logo sizing, realistic fallback/admin demo content, a polished cross-route walkthrough, and a mock payment/card-hold step in the booking flow.

## Current Context

- The app is a Vite + React + TypeScript project with routes for `/`, `/booking`, and `/admin`.
- Public-facing salon data currently comes from local files and UI copy spread across multiple sections.
- Booking state is coordinated in `src/hooks/useSalonState.ts`.
- Admin is appointment-focused and currently renders a single appointments table backed by Supabase when configured.
- The existing visual language is minimalist and premium; the request is to preserve that style rather than redesign the app.

## Design Decisions

### Centralized business and demo configuration

- Add a shared config layer for canonical business copy, especially the salon address `2728 NC-55, Cary, NC 27519`.
- Add a shared demo data layer for realistic services, stylists, appointments, customers, overview metrics, and recent activity.
- Keep demo names generic and polished rather than regionally or culturally specific.

### Payment and card-hold behavior

- Extend booking and appointment models with demo-safe payment metadata:
  - payment option
  - card on file flag
  - masked card last four
  - payment status
  - no-show policy acceptance
- Do not integrate a real processor.
- Do not store real card values. The UI may accept placeholder inputs, but only masked/non-sensitive values are retained in local state and summaries.
- Confirmation requires policy acknowledgement.

### Demo mode and walkthrough

- Support `?demo=1` as the activation entry point.
- Also expose a visible `Start Demo` trigger in the interface.
- Use one centralized cross-route walkthrough definition that can move the user between `/`, `/booking`, and `/admin`.
- Highlight UI regions via stable `data-demo` attributes.
- Implement a custom overlay that matches the existing editorial aesthetic rather than a generic third-party tour.

### Admin demo presentation

- Preserve the current appointment-management orientation.
- Enrich it with demo-ready surfaces:
  - overview cards
  - recent activity
  - payment-related appointment fields
  - richer appointment details in table/modal views
- In normal mode, keep live Supabase data as the primary source.
- In demo mode, explicitly show the mock dataset.
- Outside demo mode, if live data is missing or unavailable, fallback mock data may still be used to avoid empty-looking screens.

### Logo sizing

- Keep the current brand assets.
- Adjust sizing by context:
  - navbar logo increases modestly
  - home hero logo increases more prominently
  - booking/admin branding scales independently
- Preserve aspect ratio and spacing so the brand still feels refined.

## Architecture

### Shared data/config

- `src/data/salonConfig.ts` will hold reusable salon copy and address constants.
- `src/data/demoData.ts` will hold demo-friendly mock content and walkthrough step definitions.

### App-level demo state

- Introduce a small app-level demo controller that derives whether demo mode is enabled from the URL and tracks the current walkthrough step.
- Pages/components receive only the state they need: whether demo mode is active, which walkthrough step is active, and any spotlight selectors/handlers.

### Booking flow

- Extend `BookingDraft`, `Appointment`, and related model helpers to include payment/card-hold fields.
- Update booking summary logic so payment and policy status display alongside the appointment summary.
- Keep the booking flow submit path safe if Supabase schema does not yet include new payment fields.

### Admin flow

- Continue loading real appointments through the existing hook.
- Merge or replace with demo/fallback datasets according to mode:
  - demo mode: use curated mock data for presentation
  - normal mode with valid live data: use live data
  - normal mode with empty/unavailable live data: fallback mock data is allowed

## Error Handling and Risk Management

- If walkthrough targets are not present, the overlay falls back to a centered informational card rather than crashing.
- If Supabase write/update mappings do not support the new payment metadata, the app will still build and the UI will continue to function in demo-safe mode without claiming real payment persistence.
- Global address replacement will be verified by searching for stale visible address strings after implementation.

## Testing Strategy

- Update pure model tests first for booking summary/payment fields and appointment creation requirements.
- Update Supabase mapping tests only where the schema interaction is intentionally preserved or safely expanded.
- Run:
  - `pnpm test`
  - `pnpm exec tsc --noEmit`
  - `pnpm build`

## Success Criteria

- All visible addresses show `2728 NC-55, Cary, NC 27519`.
- Logo sizing is improved in navbar, homepage hero, booking page, and admin areas.
- Booking flow includes payment preference, mock card hold UI, required policy acknowledgement, and updated summary.
- Admin panel presents realistic data including payment-related fields and looks demo-ready.
- Demo mode launches from a clear trigger and from `?demo=1`, and the walkthrough spans public pages and admin views.
