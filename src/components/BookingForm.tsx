import { getAvailabilityContext, getCompatibleStylists, findService, findStylist } from '@/lib/salonModel';
import type { BookingDraft, Service, Stylist, TimeSlotOption } from '@/lib/types';
import { AppointmentSummary } from './AppointmentSummary';
import { TimeSlotSelector } from './TimeSlotSelector';

interface BookingFormProps {
  draft: BookingDraft;
  bookingError: string;
  services: Service[];
  stylists: Stylist[];
  timeSlots: TimeSlotOption[];
  confirmed: boolean;
  isSubmittingBooking: boolean;
  onDraftChange: (draft: BookingDraft) => void;
  onConfirm: () => void;
  onResetConfirmation: () => void;
}

export function BookingForm({
  draft,
  bookingError,
  services,
  stylists,
  timeSlots,
  confirmed,
  isSubmittingBooking,
  onDraftChange,
  onConfirm,
  onResetConfirmation
}: BookingFormProps) {
  const selectedService = findService(services, draft.serviceId);
  const selectedStylist = findStylist(stylists, draft.stylistId);
  const compatibleStylists = getCompatibleStylists(stylists, draft.serviceId);
  const showSlots = Boolean(draft.serviceId && draft.date);
  const availabilityContext = getAvailabilityContext(selectedService, selectedStylist);

  function updateField(field: keyof BookingDraft, value: string) {
    const nextDraft = { ...draft, [field]: value };

    if (field === 'serviceId') {
      nextDraft.time = '';
      if (draft.stylistId !== 'no-preference') {
        const nextServiceStylists = getCompatibleStylists(stylists, value);
        if (!nextServiceStylists.some((stylist) => stylist.id === draft.stylistId)) {
          nextDraft.stylistId = 'no-preference';
        }
      }
    }

    if (field === 'stylistId' || field === 'date') {
      nextDraft.time = '';
    }

    onDraftChange(nextDraft);
  }

  return (
    <div className="booking-layout">
      <form
        className="panel booking-form"
        onSubmit={(event) => {
          event.preventDefault();
          onConfirm();
        }}
      >
        {confirmed && (
          <div className="success-banner">
            Appointment confirmed. Your visit is reserved with Scissorhands.
            <button type="button" onClick={onResetConfirmation}>Book another</button>
          </div>
        )}

        {bookingError && (
          <div className="error-banner">
            {bookingError}
          </div>
        )}

        <div className="booking-step">
          <p className="step-label">Step 1</p>
          <label className="field-group">
            <span>Service</span>
            <select value={draft.serviceId} onChange={(event) => updateField('serviceId', event.target.value)} required>
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price} / {service.durationMinutes} min
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="booking-step">
          <p className="step-label">Step 2</p>
          <label className="field-group">
            <span>Stylist</span>
            <select value={draft.stylistId} onChange={(event) => updateField('stylistId', event.target.value)}>
              {compatibleStylists.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>
                  {stylist.name} - {stylist.specialty}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="booking-step">
          <p className="step-label">Step 3</p>
          <label className="field-group">
            <span>Date</span>
            <input type="date" value={draft.date} onChange={(event) => updateField('date', event.target.value)} required />
          </label>
        </div>

        <TimeSlotSelector
          contextText={availabilityContext}
          selectedTime={draft.time}
          showSlots={showSlots}
          slots={timeSlots}
          onSelect={(time) => updateField('time', time)}
        />

        <div className="booking-step">
          <p className="step-label">Your details</p>
          <div className="form-grid">
            <label className="field-group">
              <span>Name</span>
              <input value={draft.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your name" required />
            </label>
            <label className="field-group">
              <span>Phone number</span>
              <input value={draft.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="(919) 555-0123" required />
            </label>
            <label className="field-group form-grid__wide">
              <span>Email</span>
              <input type="email" value={draft.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" required />
            </label>
          </div>
        </div>

        <label className="field-group booking-step">
          <span>Notes</span>
          <textarea value={draft.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Hair goals, maintenance preferences, or anything we should know." rows={4} />
        </label>

        <button className="primary-action" type="submit" disabled={isSubmittingBooking || !draft.serviceId || !draft.date || !draft.time}>
          {isSubmittingBooking ? 'Confirming...' : 'Confirm Appointment'}
        </button>
      </form>

      <AppointmentSummary draft={draft} services={services} stylists={stylists} />
    </div>
  );
}
