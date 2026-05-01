import { getMaskedCardLabel } from '@/data/salonConfig';
import type { Appointment, Service, Stylist } from '@/lib/types';
import { findService, getPaymentOptionLabel, getServiceName, getStylistName } from '@/lib/salonModel';

interface AppointmentsTableProps {
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
  onSelectAppointment: (appointment: Appointment) => void;
}

export function AppointmentsTable({ appointments, services, stylists, onSelectAppointment }: AppointmentsTableProps) {
  return (
    <section className="panel appointments-panel" data-demo="admin-appointments">
      <div className="section-heading">
        <p className="eyebrow">Appointments</p>
        <h2>Booking List</h2>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Barber</th>
              <th>Duration</th>
              <th>Payment</th>
              <th>Card</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={9}>No appointments match this filter.</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id} onClick={() => onSelectAppointment(appointment)}>
                  <td>{appointment.customerName}</td>
                  <td>{getServiceName(services, appointment.serviceId)}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{getStylistName(stylists, appointment.stylistId)}</td>
                  <td>{findService(services, appointment.serviceId)?.durationMinutes ?? 0} min</td>
                  <td>{getPaymentOptionLabel(appointment.paymentOption)} / {appointment.paymentStatus}</td>
                  <td>{appointment.cardOnFile ? getMaskedCardLabel(appointment.cardLast4) : 'No card'}</td>
                  <td>
                    <span className={`status-pill status-pill--${appointment.status}`}>{appointment.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
