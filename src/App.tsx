import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { useSalonState } from '@/hooks/useSalonState';
import { AdminPage } from '@/pages/AdminPage';
import { BookingPage } from '@/pages/BookingPage';
import { HomePage } from '@/pages/HomePage';
import type { ThemeMode } from '@/lib/types';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const salon = useSalonState();
  const bookingProps = {
    draft: salon.bookingDraft,
    bookingError: salon.bookingError,
    services: salon.services,
    stylists: salon.stylists,
    timeSlots: salon.timeSlots,
    confirmed: salon.confirmed,
    isSubmittingBooking: salon.isSubmittingBooking,
    theme,
    onDraftChange: salon.updateBookingDraft,
    onConfirm: salon.confirmBooking,
    onResetConfirmation: salon.resetBookingDraft
  };

  return (
    <BrowserRouter>
      <div className={`app-shell theme-${theme}`}>
        <Navbar
          theme={theme}
          onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        />
        <Routes>
          <Route path="/" element={<HomePage services={salon.services} stylists={salon.stylists} theme={theme} />} />
          <Route path="/booking" element={<BookingPage {...bookingProps} />} />
          <Route
            path="/admin"
            element={(
              <AdminPage
                adminError={salon.adminError}
                filteredAppointments={salon.filteredAppointments}
                isLoadingAppointments={salon.isLoadingAppointments}
                statusFilter={salon.adminStatusFilter}
                selectedAppointment={salon.selectedAppointment}
                services={salon.services}
                stylists={salon.stylists}
                onSelectAppointment={salon.setSelectedAppointment}
                onCloseModal={() => salon.setSelectedAppointment(null)}
                onSaveAppointment={salon.saveAppointment}
                onCancelAppointment={salon.cancelAppointment}
                onRefreshAppointments={salon.refreshAppointments}
                onStatusFilterChange={salon.setAdminStatusFilter}
              />
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </BrowserRouter>
  );
}
