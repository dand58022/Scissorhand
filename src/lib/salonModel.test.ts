import { describe, expect, it } from 'vitest';
import type { Appointment, Service } from './types';
import {
  createAppointment,
  findService,
  getAvailabilityContext,
  getAppointmentSummary,
  getAvailableTimeSlots,
  getCompatibleStylists
} from './salonModel';

const services: Service[] = [
  { id: 'haircut', name: 'Haircut', durationMinutes: 30, price: 75, description: 'Cut' },
  { id: 'digital-perm', name: 'Digital Perm', durationMinutes: 120, price: 220, description: 'Perm' },
  { id: 'consultation', name: 'Styling / Consultation', durationMinutes: 20, price: 35, description: 'Talk' }
];

const appointments: Appointment[] = [
  {
    id: 'apt-1',
    customerName: 'Customer 1',
    phone: '555-0101',
    email: 'customer1@example.com',
    serviceId: 'haircut',
    stylistId: 'salon-artist-1',
    date: '2026-04-20',
    time: '10:00',
    status: 'upcoming',
    notes: '',
    paymentOption: 'pay-in-person',
    cardOnFile: false,
    cardLast4: '',
    paymentStatus: 'pending',
    policyAccepted: false
  },
  {
    id: 'apt-2',
    customerName: 'Customer 2',
    phone: '555-0102',
    email: 'customer2@example.com',
    serviceId: 'digital-perm',
    stylistId: 'salon-artist-2',
    date: '2026-04-21',
    time: '13:30',
    status: 'upcoming',
    notes: '',
    paymentOption: 'pay-in-person',
    cardOnFile: true,
    cardLast4: '1188',
    paymentStatus: 'card-hold-only',
    policyAccepted: true
  },
  {
    id: 'apt-3',
    customerName: 'Customer 3',
    phone: '555-0103',
    email: 'customer3@example.com',
    serviceId: 'haircut',
    stylistId: 'salon-artist-3',
    date: '2026-04-21',
    time: '15:00',
    status: 'cancelled',
    notes: '',
    paymentOption: 'pay-in-person',
    cardOnFile: false,
    cardLast4: '',
    paymentStatus: 'pending',
    policyAccepted: false
  }
];

describe('salon model helpers', () => {
  it('returns summary data for a booking draft', () => {
    const summary = getAppointmentSummary(
      {
        name: 'Customer 1',
        phone: '555-0101',
        email: 'customer1@example.com',
        date: '2026-04-20',
        time: '10:00',
        serviceId: 'digital-perm',
        stylistId: 'salon-artist-2',
        notes: '',
        paymentOption: 'prepay-now',
        cardholderName: 'Customer 1',
        cardNumber: '4242424242424242',
        expirationDate: '08/28',
        cvc: '123',
        billingZip: '27519',
        policyAccepted: true
      },
      services,
      [{ id: 'salon-artist-2', name: 'Salon Artist 2', specialty: 'Texture, movement, and modern finishing', serviceIds: ['digital-perm'] }]
    );

    expect(summary).toMatchObject({
      serviceName: 'Digital Perm',
      price: 220,
      durationMinutes: 120,
      stylistName: 'Salon Artist 2',
      dateTime: '2026-04-20 at 10:00',
      paymentOptionLabel: 'Prepay now',
      cardOnFileLabel: 'Yes',
      cardLabel: 'Ending in 4242',
      policyAcceptedLabel: 'Accepted'
    });
  });

  it('returns clean placeholder summary values when booking is incomplete', () => {
    const summary = getAppointmentSummary(
      {
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        serviceId: '',
        stylistId: 'no-preference',
        notes: '',
        paymentOption: 'pay-in-person',
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvc: '',
        billingZip: '',
        policyAccepted: false
      },
      services,
      [{ id: 'salon-artist-2', name: 'Salon Artist 2', specialty: 'Texture, movement, and modern finishing', serviceIds: ['digital-perm'] }]
    );

    expect(summary).toEqual({
      serviceName: 'Select a service',
      price: undefined,
      durationMinutes: undefined,
      stylistName: 'No preference',
      dateTime: 'Choose date and time',
      paymentOptionLabel: 'Pay in person',
      cardOnFileLabel: 'No',
      cardLabel: 'No card on file',
      policyAcceptedLabel: 'Pending'
    });
  });

  it('finds services by id', () => {
    expect(findService(services, 'consultation')?.price).toBe(35);
  });

  it('filters stylists by service specialty while preserving no preference', () => {
    const stylists = [
      { id: 'no-preference', name: 'No preference', specialty: 'Any stylist', serviceIds: ['haircut', 'digital-perm', 'consultation'] },
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Precision cutting and personalized shape work', serviceIds: ['haircut', 'consultation'] },
      { id: 'salon-artist-2', name: 'Salon Artist 2', specialty: 'Texture, movement, and modern finishing', serviceIds: ['digital-perm', 'consultation'] }
    ];

    expect(getCompatibleStylists(stylists, 'digital-perm').map((stylist) => stylist.id)).toEqual([
      'no-preference',
      'salon-artist-2'
    ]);
  });

  it('returns duration-specific openings based on service, stylist, and date', () => {
    const stylists = [
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Precision cutting and personalized shape work', serviceIds: ['haircut'] },
      { id: 'salon-artist-2', name: 'Salon Artist 2', specialty: 'Texture, movement, and modern finishing', serviceIds: ['digital-perm', 'haircut'] }
    ];
    const availability = [
      { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00', '10:20', '10:30', '11:00'] },
      { date: '2026-04-22', stylistId: 'salon-artist-2', times: ['10:00', '10:30', '13:00'] }
    ];

    expect(getAvailableTimeSlots({
      serviceId: 'haircut',
      stylistId: 'no-preference',
      date: '2026-04-22',
      durationMinutes: 30,
      services,
      stylists,
      availability
    }).map((slot) => slot.time)).toEqual(['10:00', '10:30', '11:00', '13:00']);

    expect(getAvailableTimeSlots({
      serviceId: 'haircut',
      stylistId: 'salon-artist-1',
      date: '2026-04-22',
      durationMinutes: 20,
      services,
      stylists,
      availability
    }).map((slot) => slot.time)).toEqual(['10:00', '10:20', '11:00']);
  });

  it('does not show openings before service and date are selected', () => {
    expect(getAvailableTimeSlots({
      serviceId: '',
      stylistId: 'no-preference',
      date: '2026-04-22',
      durationMinutes: 20,
      services,
      stylists: [],
      availability: []
    })).toEqual([]);

    expect(getAvailabilityContext(undefined, undefined)).toBe('Choose a service to view available times');
  });

  it('returns stylist openings when only a stylist and date are selected', () => {
    const stylists = [
      { id: 'no-preference', name: 'No preference', specialty: 'Any stylist', serviceIds: ['haircut', 'digital-perm', 'consultation'] },
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Precision cutting and personalized shape work', serviceIds: ['haircut'] }
    ];
    const availability = [
      { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00', '10:20', '10:30', '11:00'] }
    ];

    expect(getAvailableTimeSlots({
      serviceId: '',
      stylistId: 'salon-artist-1',
      date: '2026-04-22',
      durationMinutes: 30,
      services,
      stylists,
      availability
    }).map((slot) => slot.time)).toEqual(['10:00', '10:30', '11:00']);
    expect(getAvailabilityContext(undefined, stylists[1])).toBe('Available openings with Salon Artist 1');
  });

  it('creates an appointment using an available stylist when no preference is selected', () => {
    const stylists = [
      { id: 'no-preference', name: 'No preference', specialty: 'Any stylist', serviceIds: ['haircut'] },
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Cuts', serviceIds: ['haircut'] }
    ];
    const availability = [
      { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00'] }
    ];

    const result = createAppointment({
      input: {
        customerName: 'Customer 7',
        phone: '555-0107',
        email: 'customer7@example.com',
        serviceId: 'haircut',
        stylistId: 'no-preference',
        date: '2026-04-22',
        time: '10:00',
        notes: '',
        paymentOption: 'pay-in-person',
        cardOnFile: true,
        cardLast4: '4242',
        paymentStatus: 'card-hold-only',
        policyAccepted: true
      },
      appointments: [],
      services,
      stylists,
      availability,
      id: 'apt-7'
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.appointment).toMatchObject({
        id: 'apt-7',
        serviceId: 'haircut',
        stylistId: 'salon-artist-1',
        time: '10:00',
        status: 'upcoming',
        paymentOption: 'pay-in-person',
        cardOnFile: true,
        cardLast4: '4242',
        paymentStatus: 'card-hold-only',
        policyAccepted: true
      });
    }
  });

  it('requires no-show policy acknowledgement before creating an appointment', () => {
    const stylists = [
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Cuts', serviceIds: ['haircut'] }
    ];
    const availability = [
      { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00'] }
    ];

    const result = createAppointment({
      input: {
        customerName: 'Customer 9',
        phone: '555-0109',
        email: 'customer9@example.com',
        serviceId: 'haircut',
        stylistId: 'salon-artist-1',
        date: '2026-04-22',
        time: '10:00',
        notes: '',
        paymentOption: 'prepay-now',
        cardOnFile: true,
        cardLast4: '4242',
        paymentStatus: 'paid',
        policyAccepted: false
      },
      appointments: [],
      services,
      stylists,
      availability,
      id: 'apt-9'
    });

    expect(result).toEqual({
      ok: false,
      error: 'Please acknowledge the no-show and late-cancellation policy.'
    });
  });

  it('prevents overlapping appointments for the same stylist', () => {
    const stylists = [
      { id: 'salon-artist-1', name: 'Salon Artist 1', specialty: 'Cuts', serviceIds: ['haircut'] }
    ];
    const availability = [
      { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00', '10:20'] }
    ];
    const existing: Appointment[] = [{
      id: 'apt-existing',
      customerName: 'Customer 1',
      phone: '555-0101',
      email: 'customer1@example.com',
      serviceId: 'haircut',
      stylistId: 'salon-artist-1',
      date: '2026-04-22',
      time: '10:00',
      status: 'upcoming',
      notes: '',
      paymentOption: 'pay-in-person',
      cardOnFile: false,
      cardLast4: '',
      paymentStatus: 'pending',
      policyAccepted: false
    }];

    const result = createAppointment({
      input: {
        customerName: 'Customer 8',
        phone: '555-0108',
        email: 'customer8@example.com',
        serviceId: 'haircut',
        stylistId: 'salon-artist-1',
        date: '2026-04-22',
        time: '10:20',
        notes: '',
        paymentOption: 'pay-in-person',
        cardOnFile: false,
        cardLast4: '',
        paymentStatus: 'pending',
        policyAccepted: true
      },
      appointments: existing,
      services,
      stylists,
      availability,
      id: 'apt-8'
    });

    expect(result).toEqual({
      ok: false,
      error: 'That time overlaps with an existing appointment.'
    });
  });
});
