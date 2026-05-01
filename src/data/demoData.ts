import type { AdminMetric, Appointment, CustomerProfile, DemoWalkthroughStep, PaymentOption, RecentActivityItem, Service, Stylist } from '@/lib/types';

export const demoServices: Service[] = [
  {
    id: 'signature-cut',
    name: 'Signature Cut',
    durationMinutes: 45,
    price: 85,
    description: 'Detailed consultation, tailored shape refinement, and finished styling.'
  },
  {
    id: 'texture-blowout',
    name: 'Texture Blowout',
    durationMinutes: 60,
    price: 95,
    description: 'Smooth finish or movement-focused styling with long-wear polish.'
  },
  {
    id: 'gloss-treatment',
    name: 'Gloss Treatment',
    durationMinutes: 75,
    price: 130,
    description: 'Shine refresh, tone balance, and a soft finish for healthy dimension.'
  },
  {
    id: 'consultation',
    name: 'Style Consultation',
    durationMinutes: 30,
    price: 40,
    description: 'Service planning, maintenance guidance, and look development.'
  }
];

export const demoStylists: Stylist[] = [
  {
    id: 'no-preference',
    name: 'No preference',
    specialty: 'Match me with the best available barber',
    serviceIds: demoServices.map((service) => service.id)
  },
  {
    id: 'stylist-jordan',
    name: 'Jordan Lee',
    specialty: 'Precision shapes and soft movement',
    serviceIds: ['signature-cut', 'consultation', 'texture-blowout']
  },
  {
    id: 'stylist-casey',
    name: 'Casey Morgan',
    specialty: 'Gloss services and polished finishing',
    serviceIds: ['gloss-treatment', 'consultation', 'texture-blowout']
  },
  {
    id: 'stylist-riley',
    name: 'Riley Brooks',
    specialty: 'Editorial texture and modern styling',
    serviceIds: ['signature-cut', 'consultation', 'texture-blowout']
  }
];

function makeAppointment(input: {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  status: Appointment['status'];
  notes: string;
  paymentOption: PaymentOption;
  paymentStatus: Appointment['paymentStatus'];
  cardOnFile: boolean;
  cardLast4: string;
  policyAccepted: boolean;
  createdAt: string;
}): Appointment {
  return input;
}

export const demoAppointments: Appointment[] = [
  makeAppointment({
    id: 'demo-apt-1',
    customerName: 'Avery Collins',
    phone: '(919) 555-0141',
    email: 'avery.collins@example.com',
    serviceId: 'signature-cut',
    stylistId: 'stylist-jordan',
    date: '2026-04-29',
    time: '10:00',
    status: 'upcoming',
    notes: 'Soft shape refresh before travel.',
    paymentOption: 'pay-in-person',
    paymentStatus: 'card-hold-only',
    cardOnFile: true,
    cardLast4: '4242',
    policyAccepted: true,
    createdAt: '2026-04-26T14:12:00Z'
  }),
  makeAppointment({
    id: 'demo-apt-2',
    customerName: 'Taylor Bennett',
    phone: '(919) 555-0168',
    email: 'taylor.bennett@example.com',
    serviceId: 'gloss-treatment',
    stylistId: 'stylist-casey',
    date: '2026-04-29',
    time: '11:30',
    status: 'upcoming',
    notes: 'Wants extra shine before engagement photos.',
    paymentOption: 'prepay-now',
    paymentStatus: 'paid',
    cardOnFile: true,
    cardLast4: '1188',
    policyAccepted: true,
    createdAt: '2026-04-26T16:00:00Z'
  }),
  makeAppointment({
    id: 'demo-apt-3',
    customerName: 'Morgan Hayes',
    phone: '(919) 555-0194',
    email: 'morgan.hayes@example.com',
    serviceId: 'texture-blowout',
    stylistId: 'stylist-riley',
    date: '2026-04-29',
    time: '2:00',
    status: 'upcoming',
    notes: 'Event styling with volume at the crown.',
    paymentOption: 'pay-in-person',
    paymentStatus: 'pending',
    cardOnFile: false,
    cardLast4: '',
    policyAccepted: true,
    createdAt: '2026-04-27T09:35:00Z'
  }),
  makeAppointment({
    id: 'demo-apt-4',
    customerName: 'Cameron Price',
    phone: '(919) 555-0120',
    email: 'cameron.price@example.com',
    serviceId: 'signature-cut',
    stylistId: 'stylist-jordan',
    date: '2026-04-27',
    time: '1:00',
    status: 'completed',
    notes: 'Short cleanup and fringe detail.',
    paymentOption: 'prepay-now',
    paymentStatus: 'paid',
    cardOnFile: true,
    cardLast4: '0099',
    policyAccepted: true,
    createdAt: '2026-04-24T11:00:00Z'
  }),
  makeAppointment({
    id: 'demo-apt-5',
    customerName: 'Jamie Foster',
    phone: '(919) 555-0157',
    email: 'jamie.foster@example.com',
    serviceId: 'consultation',
    stylistId: 'stylist-casey',
    date: '2026-04-26',
    time: '3:30',
    status: 'cancelled',
    notes: 'Rescheduled for next week.',
    paymentOption: 'pay-in-person',
    paymentStatus: 'card-hold-only',
    cardOnFile: true,
    cardLast4: '7521',
    policyAccepted: true,
    createdAt: '2026-04-22T13:22:00Z'
  })
];

export const demoCustomers: CustomerProfile[] = [
  {
    id: 'customer-avery',
    name: 'Avery Collins',
    visits: 4,
    preferredServiceId: 'signature-cut',
    preferredStylistId: 'stylist-jordan',
    lastVisit: '2026-04-02',
    status: 'returning'
  },
  {
    id: 'customer-taylor',
    name: 'Taylor Bennett',
    visits: 2,
    preferredServiceId: 'gloss-treatment',
    preferredStylistId: 'stylist-casey',
    lastVisit: '2026-03-14',
    status: 'vip'
  },
  {
    id: 'customer-morgan',
    name: 'Morgan Hayes',
    visits: 1,
    preferredServiceId: 'texture-blowout',
    preferredStylistId: 'stylist-riley',
    lastVisit: '2026-04-29',
    status: 'new'
  }
];

export const demoAdminMetrics: AdminMetric[] = [
  { id: 'upcoming', label: 'Upcoming this week', value: '18', detail: '4 prepaid, 14 paying in shop' },
  { id: 'retention', label: 'Returning clients', value: '72%', detail: 'Based on the last 60 days of bookings' },
  { id: 'revenue', label: 'Confirmed revenue', value: '$2,640', detail: 'Prepaid and scheduled services combined' },
  { id: 'occupancy', label: 'Schedule coverage', value: '83%', detail: 'Prime afternoon openings nearly full' }
];

export const demoRecentActivity: RecentActivityItem[] = [
  { id: 'activity-1', title: 'Card hold captured for Avery Collins', detail: 'Signature Cut with Jordan Lee on April 29 at 10:00 AM.', timestamp: '5 minutes ago' },
  { id: 'activity-2', title: 'Prepaid booking confirmed for Taylor Bennett', detail: 'Gloss Treatment is marked paid and ready for arrival.', timestamp: '18 minutes ago' },
  { id: 'activity-3', title: 'Client consultation moved to next week', detail: 'Jamie Foster requested a different day and remains on file.', timestamp: '1 hour ago' }
];

export const demoWalkthroughSteps: DemoWalkthroughStep[] = [
  {
    id: 'home-hero',
    route: '/customer',
    title: 'Brand and first impression',
    body: 'This landing section introduces the barbershop with a premium brand moment and a clean path into booking.',
    target: '[data-demo="hero"]'
  },
  {
    id: 'home-booking-entry',
    route: '/customer',
    title: 'Booking entry point',
    body: 'The home page keeps the booking call-to-action prominent so clients can move into reservations quickly.',
    target: '[data-demo="home-booking-cta"]'
  },
  {
    id: 'booking-service',
    route: '/booking',
    title: 'Service selection',
    body: 'The booking flow starts with the service so timing, pricing, and barber compatibility stay clear.',
    target: '[data-demo="booking-service"]'
  },
  {
    id: 'booking-stylist',
    route: '/booking',
    title: 'Barber selection',
    body: 'Clients can choose a barber or leave it open for the best available match.',
    target: '[data-demo="booking-stylist"]'
  },
  {
    id: 'booking-time',
    route: '/booking',
    title: 'Date and time selection',
    body: 'Availability updates around the chosen service and barber so only workable times are shown.',
    target: '[data-demo="booking-time"]'
  },
  {
    id: 'booking-payment',
    route: '/booking',
    title: 'Payment and card hold',
    body: 'This demo step shows the choice between prepaying now or paying in person, plus a card-on-file hold for no-show protection.',
    target: '[data-demo="booking-payment"]'
  },
  {
    id: 'booking-summary',
    route: '/booking',
    title: 'Booking summary',
    body: 'The summary reflects the selected service, appointment details, payment preference, and policy acknowledgement before confirmation.',
    target: '[data-demo="booking-summary"]'
  },
  {
    id: 'barber-overview',
    route: '/barber',
    title: 'Barber dashboard overview',
    body: 'The barber view keeps today’s schedule, client notes, product sales, and payout status in one place.',
    target: '[data-demo="barber-overview"]'
  },
  {
    id: 'owner-overview',
    route: '/owner',
    title: 'Owner reporting and access control',
    body: 'The owner view adds shop-wide reporting, payout routing, inventory, tax summaries, payment setup, and role access planning.',
    target: '[data-demo="owner-overview"]'
  }
];
