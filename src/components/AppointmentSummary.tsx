import type { BookingDraft, Service, Stylist } from '@/lib/types';
import { formatPrice, getAppointmentSummary } from '@/lib/salonModel';

interface AppointmentSummaryProps {
  draft: BookingDraft;
  services: Service[];
  stylists: Stylist[];
}

export function AppointmentSummary({ draft, services, stylists }: AppointmentSummaryProps) {
  const summary = getAppointmentSummary(draft, services, stylists);

  return (
    <aside className="summary-panel">
      <p className="eyebrow">Appointment Summary</p>
      <h3>{summary.serviceName}</h3>
      <dl>
        <div>
          <dt>Price</dt>
          <dd>{summary.price === undefined ? 'Select service' : formatPrice(summary.price)}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{summary.durationMinutes === undefined ? 'Select service' : `${summary.durationMinutes} min`}</dd>
        </div>
        <div>
          <dt>Stylist</dt>
          <dd>{summary.stylistName}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{draft.date || 'Choose date'}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{draft.time || 'Choose time'}</dd>
        </div>
        <div>
          <dt>Reservation</dt>
          <dd>{summary.dateTime}</dd>
        </div>
      </dl>
      <p className="summary-note">Payment is handled in salon. This booking only reserves your appointment.</p>
    </aside>
  );
}
