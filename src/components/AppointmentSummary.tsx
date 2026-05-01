import { SALON_ADDRESS, SALON_POLICY_COPY } from '@/data/salonConfig';
import type { BookingDraft, Service, Stylist } from '@/lib/types';
import { formatDuration, formatPrice, getAppointmentSummary } from '@/lib/salonModel';

interface AppointmentSummaryProps {
  draft: BookingDraft;
  services: Service[];
  stylists: Stylist[];
}

export function AppointmentSummary({ draft, services, stylists }: AppointmentSummaryProps) {
  const summary = getAppointmentSummary(draft, services, stylists);

  return (
    <aside className="summary-panel" data-demo="booking-summary">
      <p className="eyebrow">Appointment Summary</p>
      <h3>{summary.serviceName}</h3>
      <dl>
        <div>
          <dt>Price</dt>
          <dd>{summary.price === undefined ? 'Select service' : formatPrice(summary.price)}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{summary.durationMinutes === undefined ? 'Select service' : formatDuration(summary.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Barber</dt>
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
        <div>
          <dt>Payment</dt>
          <dd>{summary.paymentOptionLabel}</dd>
        </div>
        <div>
          <dt>Card on file</dt>
          <dd>{summary.cardOnFileLabel}</dd>
        </div>
        <div>
          <dt>Card</dt>
          <dd>{summary.cardLabel}</dd>
        </div>
        <div>
          <dt>Policy</dt>
          <dd>{summary.policyAcceptedLabel}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{SALON_ADDRESS}</dd>
        </div>
      </dl>
      <p className="summary-note">{SALON_POLICY_COPY}</p>
    </aside>
  );
}
