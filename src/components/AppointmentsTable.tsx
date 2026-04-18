import type { Appointment, Service, Stylist } from '@/lib/types';
import { findService, getServiceName, getStylistName } from '@/lib/salonModel';

interface AppointmentsTableProps {
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
  onSelectAppointment: (appointment: Appointment) => void;
}

export function AppointmentsTable({ appointments, services, stylists, onSelectAppointment }: AppointmentsTableProps) {
  return (
    <section className="panel appointments-panel">
      <div className="section-heading">
        <p className="eyebrow">Appointments</p>
        <h2>Booking List</h2>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Stylist</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7}>No appointments match this filter.</td>
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
