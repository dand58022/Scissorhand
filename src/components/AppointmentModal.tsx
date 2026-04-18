import { useEffect, useState } from 'react';
import type { Appointment, AppointmentStatus, Service, Stylist } from '@/lib/types';

interface AppointmentModalProps {
  appointment: Appointment | null;
  services: Service[];
  stylists: Stylist[];
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
  onCancelAppointment: (appointmentId: string) => void;
}

const statuses: AppointmentStatus[] = ['upcoming', 'completed', 'cancelled'];

export function AppointmentModal({ appointment, services, stylists, onClose, onSave, onCancelAppointment }: AppointmentModalProps) {
  const [draft, setDraft] = useState<Appointment | null>(appointment);

  useEffect(() => {
    setDraft(appointment);
  }, [appointment]);

  if (!appointment || !draft) {
    return null;
  }

  function updateField(field: keyof Appointment, value: string) {
    setDraft((current) => current ? { ...current, [field]: value } : current);
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit appointment">
      <form
        className="appointment-modal"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(draft);
        }}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Edit appointment</p>
            <h2>{appointment.customerName}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close appointment editor">
            x
          </button>
        </div>

        <div className="form-grid">
          <label className="field-group">
            <span>Name</span>
            <input value={draft.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
          </label>
          <label className="field-group">
            <span>Phone</span>
            <input value={draft.phone} onChange={(event) => updateField('phone', event.target.value)} />
          </label>
          <label className="field-group">
            <span>Email</span>
            <input type="email" value={draft.email} onChange={(event) => updateField('email', event.target.value)} />
          </label>
          <label className="field-group">
            <span>Date</span>
            <input type="date" value={draft.date} onChange={(event) => updateField('date', event.target.value)} />
          </label>
          <label className="field-group">
            <span>Time</span>
            <input value={draft.time} onChange={(event) => updateField('time', event.target.value)} placeholder="10:00" />
          </label>
          <label className="field-group">
            <span>Service</span>
            <select value={draft.serviceId} onChange={(event) => updateField('serviceId', event.target.value)}>
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </label>
          <label className="field-group">
            <span>Stylist</span>
            <select value={draft.stylistId} onChange={(event) => updateField('stylistId', event.target.value)}>
              {stylists.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
              ))}
            </select>
          </label>
          <label className="field-group">
            <span>Status</span>
            <select value={draft.status} onChange={(event) => updateField('status', event.target.value as AppointmentStatus)}>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="field-group">
          <span>Notes</span>
          <textarea value={draft.notes} onChange={(event) => updateField('notes', event.target.value)} rows={4} />
        </label>

        <div className="modal-actions">
          <button type="button" className="danger-action" onClick={() => onCancelAppointment(appointment.id)}>
            Cancel appointment
          </button>
          <div>
            <button type="button" className="secondary-action" onClick={onClose}>Close</button>
            <button type="submit" className="primary-action">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  );
}
