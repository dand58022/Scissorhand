import { BrandMark } from '@/components/BrandMark';
import { BookingSection } from '@/sections/BookingSection';
import type { BookingDraft, Service, Stylist, ThemeMode, TimeSlotOption } from '@/lib/types';

interface BookingPageProps {
  draft: BookingDraft;
  bookingError: string;
  services: Service[];
  stylists: Stylist[];
  timeSlots: TimeSlotOption[];
  confirmed: boolean;
  isSubmittingBooking: boolean;
  theme: ThemeMode;
  onDraftChange: (draft: BookingDraft) => void;
  onConfirm: () => void;
  onResetConfirmation: () => void;
}

export function BookingPage(props: BookingPageProps) {
  return (
    <main className="view-shell view-shell--narrow" id="top">
      <section className="booking-page-intro">
        <BrandMark theme={props.theme} variant="small-icon" className="booking-brand" />
        <p className="eyebrow">Reservations</p>
        <h1>Reserve your Scissorhands appointment.</h1>
        <p>Select a service, stylist, date, and time. Pricing is shown for planning only.</p>
      </section>
      <BookingSection {...props} />
    </main>
  );
}
