import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { DemoWalkthrough } from '@/components/DemoWalkthrough';
import { demoWalkthroughSteps } from '@/data/demoData';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { useSalonState } from '@/hooks/useSalonState';
import { AdminPage } from '@/pages/AdminPage';
import { BookingPage } from '@/pages/BookingPage';
import { HomePage } from '@/pages/HomePage';
import type { ThemeMode } from '@/lib/types';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [hasExplicitThemeChoice, setHasExplicitThemeChoice] = useState(false);
  const [activeDemoStepIndex, setActiveDemoStepIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const isDemoMode = useMemo(() => new URLSearchParams(location.search).get('demo') === '1', [location.search]);
  const salon = useSalonState(isDemoMode);
  const activeDemoStep = activeDemoStepIndex >= 0 ? demoWalkthroughSteps[activeDemoStepIndex] : null;

  useEffect(() => {
    if (isDemoMode && activeDemoStepIndex < 0) {
      setActiveDemoStepIndex(0);
    }

    if (!isDemoMode && activeDemoStepIndex >= 0) {
      setActiveDemoStepIndex(-1);
    }
  }, [activeDemoStepIndex, isDemoMode]);

  useEffect(() => {
    if (isDemoMode && !hasExplicitThemeChoice) {
      setTheme('light');
    }
  }, [hasExplicitThemeChoice, isDemoMode]);

  useEffect(() => {
    if (!activeDemoStep || location.pathname === activeDemoStep.route) {
      return;
    }

    navigate({ pathname: activeDemoStep.route, search: '?demo=1' }, { replace: true });
  }, [activeDemoStep, location.pathname, navigate]);

  function startDemo() {
    setActiveDemoStepIndex(0);
    navigate({ pathname: '/', search: '?demo=1' });
  }

  function closeDemo() {
    setActiveDemoStepIndex(-1);
    navigate({ pathname: location.pathname, search: '' }, { replace: true });
  }

  function moveDemo(offset: number) {
    setActiveDemoStepIndex((current) => {
      const nextIndex = current + offset;
      if (nextIndex < 0) {
        return 0;
      }

      return Math.min(nextIndex, demoWalkthroughSteps.length - 1);
    });
  }

  function handleDemoNext() {
    if (activeDemoStepIndex >= demoWalkthroughSteps.length - 1) {
      closeDemo();
      return;
    }

    moveDemo(1);
  }

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
    <div className={`app-shell theme-${theme}`}>
      <Navbar
        isDemoMode={isDemoMode}
        onStartDemo={startDemo}
        theme={theme}
        onThemeToggle={() => {
          setHasExplicitThemeChoice(true);
          setTheme((current) => current === 'dark' ? 'light' : 'dark');
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage onStartDemo={startDemo} services={salon.services} stylists={salon.stylists} theme={theme} />} />
        <Route path="/booking" element={<BookingPage {...bookingProps} />} />
        <Route
          path="/admin"
          element={(
            <AdminPage
              adminDataNotice={salon.adminDataNotice}
              adminError={salon.adminError}
              adminMetrics={salon.adminMetrics}
              customers={salon.customers}
              filteredAppointments={salon.filteredAppointments}
              isLoadingAppointments={salon.isLoadingAppointments}
              recentActivity={salon.recentActivity}
              statusFilter={salon.adminStatusFilter}
              selectedAppointment={salon.selectedAppointment}
              services={salon.adminServices}
              stylists={salon.adminStylists}
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
      {location.pathname !== '/admin' && <Footer theme={theme} />}
      {isDemoMode && activeDemoStep && (
        <DemoWalkthrough
          step={activeDemoStep}
          stepIndex={activeDemoStepIndex}
          totalSteps={demoWalkthroughSteps.length}
          onBack={() => moveDemo(-1)}
          onNext={handleDemoNext}
          onClose={closeDemo}
        />
      )}
    </div>
  );
}
