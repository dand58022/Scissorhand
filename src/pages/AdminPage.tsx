import { useEffect, useMemo, useState } from 'react';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import type { AdminMetric, Appointment, AppointmentStatus, CustomerProfile, RecentActivityItem, Service, Stylist } from '@/lib/types';
import { SALON_ADDRESS } from '@/data/salonConfig';
import { AppointmentsTable } from '@/components/AppointmentsTable';
import { AppointmentModal } from '@/components/AppointmentModal';

interface AdminPageProps {
  adminDataNotice: string;
  adminError: string;
  adminMetrics: AdminMetric[];
  customers: CustomerProfile[];
  filteredAppointments: Appointment[];
  isLoadingAppointments: boolean;
  recentActivity: RecentActivityItem[];
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
  adminDataNotice,
  adminError,
  adminMetrics,
  customers,
  filteredAppointments,
  isLoadingAppointments,
  recentActivity,
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
  const [stylistFilter, setStylistFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'scheduler'>('scheduler');
  const [scheduleDate, setScheduleDate] = useState('');
  const stylistOptions = useMemo(() => stylists.filter((stylist) => stylist.id !== 'no-preference'), [stylists]);
  const stylistFilteredAppointments = useMemo(() => (
    filteredAppointments.filter((appointment) => stylistFilter === 'all' || appointment.stylistId === stylistFilter)
  ), [filteredAppointments, stylistFilter]);
  const availableDates = useMemo(() => Array.from(new Set(stylistFilteredAppointments.map((appointment) => appointment.date))).sort(), [stylistFilteredAppointments]);

  useEffect(() => {
    if (!availableDates.length) {
      setScheduleDate('');
      return;
    }

    if (!scheduleDate || !availableDates.includes(scheduleDate)) {
      setScheduleDate(availableDates[0]);
    }
  }, [availableDates, scheduleDate]);

  return (
    <main className="view-shell view-shell--admin" id="top">
      <section className="admin-hero" data-demo="admin-overview">
        <div className="admin-hero__copy">
          <p className="eyebrow">Salon operations</p>
          <h1>Appointment management.</h1>
          <p className="admin-address">{SALON_ADDRESS}</p>
        </div>
        <p className="admin-hero__note">Daily schedule, payment status, and customer activity in one view.</p>
      </section>

      {adminDataNotice && <div className="availability-helper">{adminDataNotice}</div>}

      <section className="admin-metrics-grid">
        {adminMetrics.map((metric) => (
          <article key={metric.id} className="panel admin-metric-card">
            <p className="eyebrow">{metric.label}</p>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="panel admin-controls">
        <div>
          <p className="eyebrow">Status filter</p>
          <h2>{statusFilter} appointments - {stylistFilteredAppointments.length}</h2>
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
          <label className="admin-filter-select">
            <span>Stylist</span>
            <select value={stylistFilter} onChange={(event) => setStylistFilter(event.target.value)}>
              <option value="all">All stylists</option>
              {stylistOptions.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
              ))}
            </select>
          </label>
          <div className="segmented-control admin-view-toggle" aria-label="Appointment view mode">
            <button type="button" className={viewMode === 'table' ? 'is-active' : ''} onClick={() => setViewMode('table')}>
              Table
            </button>
            <button type="button" className={viewMode === 'scheduler' ? 'is-active' : ''} onClick={() => setViewMode('scheduler')}>
              Scheduler
            </button>
          </div>
          {viewMode === 'scheduler' && availableDates.length > 0 && (
            <label className="admin-filter-select">
              <span>Day</span>
              <select value={scheduleDate} onChange={(event) => setScheduleDate(event.target.value)}>
                {availableDates.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </label>
          )}
          <button type="button" className="secondary-action" onClick={onRefreshAppointments}>
            Refresh
          </button>
        </div>
      </section>

      {adminError && <div className="error-banner">{adminError}</div>}
      {isLoadingAppointments && <p className="availability-helper">Loading Supabase appointments...</p>}

      <section className="admin-dashboard-grid">
        <div className="admin-primary-column">
          {viewMode === 'table' ? (
            <AppointmentsTable
              appointments={stylistFilteredAppointments}
              services={services}
              stylists={stylists}
              onSelectAppointment={onSelectAppointment}
            />
          ) : (
            <AppointmentScheduler
              appointments={stylistFilteredAppointments}
              services={services}
              stylists={stylistOptions}
              selectedDate={scheduleDate}
              onSelectAppointment={onSelectAppointment}
            />
          )}
        </div>

        <div className="admin-secondary-column">
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Recent activity</p>
              <h2>Latest updates</h2>
            </div>
            <div className="admin-activity-list">
              {recentActivity.map((item) => (
                <div key={item.id} className="admin-activity-item">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.timestamp}</small>
                </div>
              ))}
            </div>
          </article>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Customers</p>
              <h2>Client snapshot</h2>
            </div>
            <div className="admin-customer-list">
              {customers.map((customer) => (
                <div key={customer.id} className="admin-customer-item">
                  <div>
                    <strong>{customer.name}</strong>
                    <p>{customer.visits} visits - last visit {customer.lastVisit}</p>
                  </div>
                  <span className={`status-pill admin-status-pill admin-status-pill--${customer.status}`}>{customer.status}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
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
