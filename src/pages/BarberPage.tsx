import { useEffect, useMemo, useState } from 'react';
import { AppointmentModal } from '@/components/AppointmentModal';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import { AppointmentsTable } from '@/components/AppointmentsTable';
import { barberProfiles, barberReports, defaultBarberId, payoutAccounts, productSales } from '@/data/ownerDemoData';
import { SALON_ADDRESS } from '@/data/salonConfig';
import type { Appointment, AppointmentStatus, CustomerProfile, RecentActivityItem, Service, Stylist } from '@/lib/types';

interface BarberPageProps {
  adminDataNotice: string;
  adminError: string;
  appointments: Appointment[];
  customers: CustomerProfile[];
  isLoadingAppointments: boolean;
  recentActivity: RecentActivityItem[];
  selectedAppointment: Appointment | null;
  services: Service[];
  stylists: Stylist[];
  onSelectAppointment: (appointment: Appointment) => void;
  onCloseModal: () => void;
  onSaveAppointment: (appointment: Appointment) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onRefreshAppointments: () => void;
  onStatusFilterChange: (status: AppointmentStatus) => void;
}

export function BarberPage({
  adminDataNotice,
  adminError,
  appointments,
  customers,
  isLoadingAppointments,
  recentActivity,
  selectedAppointment,
  services,
  stylists,
  onSelectAppointment,
  onCloseModal,
  onSaveAppointment,
  onCancelAppointment,
  onRefreshAppointments,
  onStatusFilterChange
}: BarberPageProps) {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus>('upcoming');
  const [viewMode, setViewMode] = useState<'table' | 'scheduler'>('scheduler');
  const [scheduleDate, setScheduleDate] = useState('');
  const barberProfile = barberProfiles.find((barber) => barber.id === defaultBarberId);
  const barberSchedulerIds = useMemo(() => getSchedulerIdsForBarber(defaultBarberId), []);
  const barberAppointments = useMemo(
    () => appointments.filter((appointment) => barberSchedulerIds.includes(appointment.stylistId)),
    [appointments, barberSchedulerIds]
  );
  const filteredAppointments = useMemo(
    () => barberAppointments.filter((appointment) => appointment.status === statusFilter),
    [barberAppointments, statusFilter]
  );
  const availableDates = useMemo(
    () => Array.from(new Set(filteredAppointments.map((appointment) => appointment.date))).sort(),
    [filteredAppointments]
  );
  const myReport = barberReports.find((report) => report.barberId === defaultBarberId);
  const myPayout = payoutAccounts.find((account) => account.barberId === defaultBarberId);
  const myProductSales = productSales.filter((sale) => sale.barberId === defaultBarberId);
  const myClients = customers.filter((customer) => barberSchedulerIds.includes(customer.preferredStylistId));
  const myRecentAppointments = barberAppointments.slice(0, 3);
  const estimatedNextPayout = myPayout?.pendingPayout ?? 0;
  const recentClientNotes = [
    'Prepaid booking confirmed',
    'Card hold captured for no-show policy',
    'Consultation note attached to upcoming visit',
    'Refund adjustment reflected in payout estimate'
  ];

  useEffect(() => {
    if (!availableDates.length) {
      setScheduleDate('');
      return;
    }

    if (!scheduleDate || !availableDates.includes(scheduleDate)) {
      setScheduleDate(availableDates[0]);
    }
  }, [availableDates, scheduleDate]);

  useEffect(() => {
    onStatusFilterChange(statusFilter);
  }, [onStatusFilterChange, statusFilter]);

  return (
    <main className="view-shell view-shell--admin" id="top">
      <section className="admin-hero" data-demo="barber-overview">
        <div className="admin-hero__copy">
          <p className="eyebrow">Barber view</p>
          <h1>My Barber Dashboard.</h1>
          <p className="admin-address">{SALON_ADDRESS}</p>
        </div>
        <p className="admin-hero__note">Manage your appointments, client activity, product sales, and payout status.</p>
      </section>

      {adminDataNotice && <div className="availability-helper">{adminDataNotice.replace(/Admin/g, 'Barber').replace(/admin/g, 'barber')}</div>}

      <section className="admin-metrics-grid barber-metrics-grid">
        <article className="panel admin-metric-card">
          <p className="eyebrow">Today&apos;s service revenue</p>
          <strong>$540</strong>
          <p>Five booked services with one prepaid arrival already cleared.</p>
        </article>
        <article className="panel admin-metric-card">
          <p className="eyebrow">Weekly service revenue</p>
          <strong>${myReport?.serviceRevenue ?? 0}</strong>
          <p>Refunds and discounts are reflected before payout estimates.</p>
        </article>
        <article className="panel admin-metric-card">
          <p className="eyebrow">Tips</p>
          <strong>${myReport?.tips ?? 0}</strong>
          <p>Captured across in-shop checkout and prepaid bookings.</p>
        </article>
        <article className="panel admin-metric-card">
          <p className="eyebrow">Estimated next payout</p>
          <strong>${estimatedNextPayout.toFixed(2)}</strong>
          <p>{barberProfile?.bankStatus} bank setup with {barberProfile?.stripeStatus.toLowerCase()} payout status.</p>
        </article>
      </section>

      <section className="panel admin-controls">
        <div>
          <p className="eyebrow">My schedule</p>
          <h2>{statusFilter} appointments - {filteredAppointments.length}</h2>
        </div>
        <div className="admin-filter-row">
          {(['upcoming', 'completed', 'cancelled'] as AppointmentStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-chip ${statusFilter === status ? 'is-active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
          <div className="segmented-control admin-view-toggle" aria-label="Barber appointment view mode">
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
      {isLoadingAppointments && <p className="availability-helper">Loading live shop appointments...</p>}

      <section className="admin-dashboard-grid">
        <div className="admin-primary-column">
          {viewMode === 'table' ? (
            <AppointmentsTable
              appointments={filteredAppointments}
              services={services}
              stylists={stylists}
              onSelectAppointment={onSelectAppointment}
            />
          ) : (
            <AppointmentScheduler
              appointments={filteredAppointments}
              services={services}
              stylists={stylists.filter((stylist) => barberSchedulerIds.includes(stylist.id))}
              selectedDate={scheduleDate}
              onSelectAppointment={onSelectAppointment}
            />
          )}
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">My clients</p>
              <h2>Upcoming and recent client activity</h2>
            </div>
            <div className="admin-customer-list">
              {myClients.map((client, index) => (
                <div key={client.id} className="admin-customer-item">
                  <div>
                    <strong>{client.name}</strong>
                    <p>{client.visits} visits - last visit {client.lastVisit}</p>
                    <small>{recentClientNotes[index % recentClientNotes.length]}</small>
                  </div>
                  <span className={`status-pill admin-status-pill admin-status-pill--${client.status}`}>{client.status}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="admin-secondary-column">
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">My earnings</p>
              <h2>Payout and service summary</h2>
            </div>
            <div className="stat-list">
              <div><span>Weekly service revenue</span><strong>${myReport?.serviceRevenue ?? 0}</strong></div>
              <div><span>Refunds</span><strong>${myReport?.refunds ?? 0}</strong></div>
              <div><span>Discounts</span><strong>${myReport?.discounts ?? 0}</strong></div>
              <div><span>Estimated service payout</span><strong>${myReport?.estimatedServicePayout ?? 0}</strong></div>
              <div><span>Product commission owed</span><strong>${(myReport?.productCommission ?? 0).toFixed(2)}</strong></div>
              <div><span>Next payout date</span><strong>{barberProfile?.nextPayoutDate}</strong></div>
            </div>
          </article>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">My product sales</p>
              <h2>Retail performance</h2>
            </div>
            <div className="stat-list">
              <div><span>Products sold</span><strong>{myProductSales.length}</strong></div>
              <div><span>Product revenue</span><strong>${myProductSales.reduce((total, sale) => total + sale.amount, 0)}</strong></div>
              <div><span>Product commission owed</span><strong>${myProductSales.reduce((total, sale) => total + sale.commissionOwed, 0).toFixed(2)}</strong></div>
            </div>
            <div className="inline-list">
              {myProductSales.slice(0, 5).map((sale) => (
                <div key={sale.id} className="mini-card">
                  <strong>{sale.productName}</strong>
                  <p>{sale.clientName}</p>
                  <small>${sale.amount} sale</small>
                </div>
              ))}
            </div>
          </article>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Payout setup</p>
              <h2>Bank and transfer status</h2>
            </div>
            <p>Service payouts are routed to your connected payout account after refunds, discounts, and commission rules are applied.</p>
            <div className="status-row">
              <span className="badge badge--success">{barberProfile?.bankStatus}</span>
              <span className="badge badge--neutral">{barberProfile?.stripeStatus}</span>
            </div>
            <div className="stat-list">
              <div><span>Payout method</span><strong>{barberProfile?.payoutMethod}</strong></div>
              <div><span>Next payout date</span><strong>{barberProfile?.nextPayoutDate}</strong></div>
              <div><span>Demo routing</span><strong>Stripe Connect-ready mock</strong></div>
            </div>
          </article>
          <article className="panel admin-side-panel">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Recent updates</p>
              <h2>Operational notes</h2>
            </div>
            <div className="admin-activity-list">
              {recentActivity.map((item) => (
                <div key={item.id} className="admin-activity-item">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.timestamp}</small>
                </div>
              ))}
              {myRecentAppointments.map((appointment) => (
                <div key={appointment.id} className="admin-activity-item">
                  <strong>{appointment.customerName}</strong>
                  <p>{appointment.date} at {appointment.time} with card status {appointment.paymentStatus}.</p>
                  <small>Client-facing booking flow preserved</small>
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

function getSchedulerIdsForBarber(barberId: string) {
  switch (barberId) {
    case 'barber-jordan':
      return ['salon-artist-1', 'stylist-jordan'];
    case 'barber-casey':
      return ['salon-artist-2', 'stylist-casey'];
    case 'barber-riley':
      return ['salon-artist-3', 'stylist-riley'];
    default:
      return [barberId];
  }
}
