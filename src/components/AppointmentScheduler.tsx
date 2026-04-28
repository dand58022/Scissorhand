import { getMaskedCardLabel } from '@/data/salonConfig';
import { findService, formatPrice, getPaymentOptionLabel } from '@/lib/salonModel';
import type { Appointment, Service, Stylist } from '@/lib/types';

interface AppointmentSchedulerProps {
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
  selectedDate: string;
  onSelectAppointment: (appointment: Appointment) => void;
}

export function AppointmentScheduler({
  appointments,
  services,
  stylists,
  selectedDate,
  onSelectAppointment
}: AppointmentSchedulerProps) {
  const visibleAppointments = appointments.filter((appointment) => appointment.date === selectedDate);
  const visibleStylists = stylists.filter((stylist) => stylist.id !== 'no-preference');
  const timeSlots = buildTimeSlots(visibleAppointments);

  return (
    <section className="panel appointments-panel">
      <div className="section-heading">
        <p className="eyebrow">Scheduler</p>
        <h2>Daily schedule</h2>
      </div>

      {visibleAppointments.length === 0 ? (
        <p className="availability-helper">No appointments are scheduled for this day.</p>
      ) : (
        <div className="scheduler-wrap">
          <div
            className="scheduler-grid"
            style={{ gridTemplateColumns: `104px repeat(${visibleStylists.length}, minmax(220px, 1fr))` }}
          >
            <div className="scheduler-grid__header scheduler-grid__corner">Time</div>
            {visibleStylists.map((stylist) => (
              <div key={stylist.id} className="scheduler-grid__header">
                <strong>{stylist.name}</strong>
                <span>{stylist.specialty}</span>
              </div>
            ))}

            {timeSlots.map((timeSlot) => (
              <div className="scheduler-grid__row" key={timeSlot} style={{ display: 'contents' }}>
                <div className="scheduler-grid__time">
                  {formatTimeLabel(timeSlot)}
                </div>
                {visibleStylists.map((stylist) => {
                  const appointment = visibleAppointments.find((candidate) => (
                    candidate.time === timeSlot && candidate.stylistId === stylist.id
                  ));

                  return (
                    <div key={`${timeSlot}-${stylist.id}`} className="scheduler-grid__cell">
                      {appointment && (
                        <button
                          type="button"
                          className={`scheduler-card scheduler-card--${appointment.status}`}
                          onClick={() => onSelectAppointment(appointment)}
                        >
                          <strong>{appointment.customerName}</strong>
                          <span>{findService(services, appointment.serviceId)?.name ?? 'Service'}</span>
                          <span>{formatTimeLabel(appointment.time)} - {findService(services, appointment.serviceId)?.durationMinutes ?? 0} min</span>
                          <span>{getPaymentOptionLabel(appointment.paymentOption)} - {appointment.paymentStatus}</span>
                          <span>{appointment.cardOnFile ? getMaskedCardLabel(appointment.cardLast4) : 'No card on file'}</span>
                          <small>{appointment.status} - {formatPrice(findService(services, appointment.serviceId)?.price)}</small>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function buildTimeSlots(appointments: Appointment[]) {
  if (appointments.length === 0) {
    return [];
  }

  const minutes = appointments.map((appointment) => toMinutes(appointment.time));
  const earliest = Math.max(Math.min(...minutes) - 30, 9 * 60);
  const latest = Math.min(Math.max(...minutes) + 120, 18 * 60);
  const slots: string[] = [];

  for (let cursor = earliest; cursor <= latest; cursor += 30) {
    slots.push(toTime(cursor));
  }

  return slots;
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function toTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatTimeLabel(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}
