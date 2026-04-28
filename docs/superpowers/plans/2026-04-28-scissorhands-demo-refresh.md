# Scissorhands Demo Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Scissorhands app demo-ready by centralizing the salon address, improving logo sizing, adding polished fallback/demo data, extending the booking flow with mock payment/card-hold behavior, and implementing a cross-route walkthrough demo mode.

**Architecture:** Add shared salon/demo configuration, extend the booking and appointment models with demo-safe payment fields, and introduce a lightweight app-level walkthrough controller keyed off `?demo=1`. Keep the current route structure and visual language intact while enriching the admin and booking experiences with reusable data and guided overlays.

**Tech Stack:** React 18, React Router 7, TypeScript, Vitest, Vite

---

## Chunk 1: Shared Configuration And Model Extensions

### Task 1: Centralize salon address and demo-safe business copy

**Files:**
- Create: `src/data/salonConfig.ts`
- Modify: `src/sections/LocationSection.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: any other public/admin UI files that render address text

- [ ] **Step 1: Add centralized salon config exports**
- [ ] **Step 2: Replace hardcoded address/UI copy with config references**
- [ ] **Step 3: Search for stale address strings and replace remaining visible occurrences**

### Task 2: Extend models for payment and demo metadata

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/salonModel.ts`
- Test: `src/lib/salonModel.test.ts`

- [ ] **Step 1: Write failing tests for payment summary and policy acknowledgement requirements**
- [ ] **Step 2: Run the targeted tests to verify they fail for the expected reason**
- [ ] **Step 3: Extend types and model helpers with payment/card-hold fields**
- [ ] **Step 4: Re-run targeted tests and make them pass**

### Task 3: Add curated demo data for admin and walkthrough use

**Files:**
- Create: `src/data/demoData.ts`
- Modify: `src/data/salonData.ts` if local service/stylist content needs alignment

- [ ] **Step 1: Define consistent generic services, stylists, appointments, metrics, and activity data**
- [ ] **Step 2: Keep payment fields and appointment details internally consistent**

## Chunk 2: Booking Flow And Admin UX

### Task 4: Add payment/card-hold step to booking flow

**Files:**
- Modify: `src/hooks/useSalonState.ts`
- Modify: `src/components/BookingForm.tsx`
- Modify: `src/components/AppointmentSummary.tsx`
- Modify: `src/pages/BookingPage.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Write failing tests for booking confirmation requirements involving payment/policy fields**
- [ ] **Step 2: Run the targeted tests to verify the new cases fail**
- [ ] **Step 3: Add booking draft defaults and state updates for payment/card-hold data**
- [ ] **Step 4: Add the payment preference UI, safe placeholder card form, and policy acknowledgement**
- [ ] **Step 5: Update summary output to show payment choice, card on file, and acknowledgement**
- [ ] **Step 6: Re-run the targeted tests and fix any regressions**

### Task 5: Enrich the admin experience with demo-ready content

**Files:**
- Modify: `src/pages/AdminPage.tsx`
- Modify: `src/components/AppointmentsTable.tsx`
- Modify: `src/components/AppointmentModal.tsx`
- Modify: `src/hooks/useSalonState.ts`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Add overview cards and recent activity surfaces using shared demo data**
- [ ] **Step 2: Add payment-related appointment fields to admin table/modal**
- [ ] **Step 3: Use demo data in demo mode and fallback data when live records are unavailable**
- [ ] **Step 4: Keep live Supabase refresh/edit flows intact outside demo mode**

## Chunk 3: Walkthrough Demo Mode And Visual Polish

### Task 6: Implement cross-route walkthrough demo mode

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/DemoWalkthrough.tsx`
- Create: `src/lib/demoMode.ts` or similar helper
- Modify: public/admin pages and sections to add stable `data-demo` targets
- Modify: `src/styles/app.css`

- [ ] **Step 1: Add app-level demo mode detection from `?demo=1`**
- [ ] **Step 2: Define centralized step metadata for homepage, booking, payment, summary, and admin views**
- [ ] **Step 3: Build the overlay/spotlight component with next/back/close controls**
- [ ] **Step 4: Route the walkthrough across `/`, `/booking`, and `/admin`**
- [ ] **Step 5: Add visible `Start Demo` entry points**

### Task 7: Refine logo sizing per context

**Files:**
- Modify: `src/styles/app.css`
- Modify: any page/component wrappers that need context-specific brand containers

- [ ] **Step 1: Increase navbar logo scale modestly**
- [ ] **Step 2: Increase homepage hero logo scale more prominently**
- [ ] **Step 3: Adjust booking/admin logo sizing independently**
- [ ] **Step 4: Verify spacing remains balanced on desktop and mobile**

## Chunk 4: Verification

### Task 8: Run verification and confirm scope

**Files:**
- Review: changed source files

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm exec tsc --noEmit`**
- [ ] **Step 3: Run `pnpm build`**
- [ ] **Step 4: Search the repo for stale displayed address strings**
- [ ] **Step 5: Confirm walkthrough includes the payment/card-hold step**
- [ ] **Step 6: Confirm admin demo data includes payment-related fields**
