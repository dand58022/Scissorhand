# Launch Checklist

## Hosting

- [ ] Choose frontend host: Vercel, Netlify, Cloudflare Pages, or similar.
- [ ] Add production environment variables in the hosting dashboard.
- [ ] Deploy the Vite frontend.
- [ ] Connect the production domain.
- [ ] Confirm HTTPS is active.
- [ ] Run a production booking test after deploy.

## Supabase

- [ ] Create Supabase project.
- [ ] Create `appointments` table.
- [ ] Add status check constraint for `upcoming`, `completed`, and `cancelled`.
- [ ] Add indexes for status and date/time.
- [ ] Add unique active-slot index for stylist/date/time.
- [ ] Add `VITE_SUPABASE_URL` to local `.env` and hosting env vars.
- [ ] Add `VITE_SUPABASE_ANON_KEY` to local `.env` and hosting env vars.
- [ ] Enable Row Level Security before public launch.
- [ ] Add public insert policy for booking submissions.
- [ ] Add protected read/update policies after admin auth is implemented.

## Content

- [ ] Replace placeholder gallery with approved salon/client images.
- [ ] Confirm final service names.
- [ ] Confirm real service pricing.
- [ ] Confirm real service durations.
- [ ] Confirm final address.
- [ ] Confirm final hours.
- [ ] Confirm contact phone/email.
- [ ] Confirm footer contact copy.
- [ ] Confirm homepage copy.

## Integrations

- [ ] Decide whether Yelp integration is needed for v1.
- [ ] If using Yelp, create server-side integration plan and credentials.
- [ ] Decide whether Google Maps should be iframe embed or API-based.
- [ ] If API-based, create Google Maps API key and restrict by domain.
- [ ] Replace map placeholder only after address is final.

## Security

- [ ] Protect `/admin` before public launch.
- [ ] Do not expose service role keys in frontend code.
- [ ] Keep `.env` out of git.
- [ ] Restrict Google/Yelp keys if added later.
- [ ] Add Supabase RLS policies.
- [ ] Test anonymous booking insert.
- [ ] Test admin read/update after auth is added.
- [ ] Consider spam protection if public form receives bot submissions.
