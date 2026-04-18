import type { Appointment, AppointmentStatus, Service, Stylist } from '@/lib/types';
import { AppointmentsTable } from '@/components/AppointmentsTable';
import { AppointmentModal } from '@/components/AppointmentModal';

interface AdminPageProps {
  adminError: string;
  filteredAppointments: Appointment[];
  isLoadingAppointments: boolean;
  selectedAppointment: Appointment | null;
  services: Service[];
  statusFilter: AppointmentStatus;
  stylists: Stylist[];
  onSelectAppointment: (appointment: Appointment) => void;
  onCloseModal: () => void;
  onSaveAppointment: (appointment: Appointment) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onRefreshAppointments: () => void;
  onStatusFilterChange: (status: AppointmentStatus) => void;
}

export function AdminPage({
  adminError,
  filteredAppointments,
  isLoadingAppointments,
  selectedAppointment,
  services,
  stylists,
  statusFilter,
  onSelectAppointment,
  onCloseModal,
  onSaveAppointment,
  onCancelAppointment,
  onRefreshAppointments,
  onStatusFilterChange
}: AdminPageProps) {
  return (
    <main className="view-shell" id="top">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Salon operations</p>
          <h1>Appointment management.</h1>
        </div>
        <p>Supabase-backed appointments. Add password protection before publishing this page.</p>
      </section>

      <section className="panel admin-controls">
        <div>
          <p className="eyebrow">Status filter</p>
          <h2>{statusFilter} appointments</h2>
        </div>
        <div className="admin-filter-row">
          {(['upcoming', 'completed', 'cancelled'] as AppointmentStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-chip ${statusFilter === status ? 'is-active' : ''}`}
              onClick={() => onStatusFilterChange(status)}
            >
              {status}
            </button>
          ))}
          <button type="button" className="secondary-action" onClick={onRefreshAppointments}>
            Refresh
          </button>
        </div>
      </section>

      {adminError && <div className="error-banner">{adminError}</div>}
      {isLoadingAppointments && <p className="availability-helper">Loading Supabase appointments...</p>}

      <AppointmentsTable
        appointments={filteredAppointments}
        services={services}
        stylists={stylists}
        onSelectAppointment={onSelectAppointment}
      />
      <AppointmentModal
        appointment={selectedAppointment}
        services={services}
        stylists={stylists}
        onClose={onCloseModal}
        onSave={onSaveAppointment}
        onCancelAppointment={onCancelAppointment}
      />
    </main>
  );
}
