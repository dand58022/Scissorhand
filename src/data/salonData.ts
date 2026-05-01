import type { Service, Stylist, StylistAvailability } from '@/lib/types';

export const seedServices: Service[] = [
  {
    id: 'apprentice-haircut',
    name: 'Apprentice Haircut',
    durationMinutes: 60,
    price: 25,
    description: 'Apprentice barber haircut service.'
  },
  {
    id: 'apprentice-haircut-beard',
    name: 'Apprentice Haircut and Beard',
    durationMinutes: 60,
    price: 35,
    description: 'Apprentice haircut and beard service.'
  },
  {
    id: 'haircut',
    name: 'Haircut',
    durationMinutes: 45,
    price: 40,
    description: 'Clean haircut service.'
  },
  {
    id: 'haircut-beard',
    name: 'Haircut and Beard',
    durationMinutes: 60,
    price: 50,
    description: 'Haircut with beard detailing.'
  },
  {
    id: 'scissor-cut',
    name: 'Scissor Cut',
    durationMinutes: 45,
    price: 60,
    description: 'Scissor cut service.'
  },
  {
    id: 'scissor-cut-beard',
    name: 'Scissor Cut and Beard',
    durationMinutes: 60,
    price: 70,
    description: 'Scissor cut with beard detailing.'
  },
  {
    id: 'lineup',
    name: 'Lineup',
    durationMinutes: 30,
    price: 30,
    description: 'Sharp lineup and cleanup.'
  },
  {
    id: 'after-hours',
    name: 'After Hours',
    durationMinutes: 720,
    price: 80,
    description: 'Call 617-691-9662 to request.'
  }
];

export const seedStylists: Stylist[] = [
  {
    id: 'no-preference',
    name: 'No preference',
    specialty: 'Match me with an available barber',
    serviceIds: seedServices.map((service) => service.id)
  },
  {
    id: 'salon-artist-1',
    name: 'Jordan Lee',
    specialty: 'Precision cutting and shape refinement',
    serviceIds: ['haircut', 'haircut-beard', 'scissor-cut', 'scissor-cut-beard', 'lineup', 'after-hours']
  },
  {
    id: 'salon-artist-2',
    name: 'Casey Morgan',
    specialty: 'Beard work, lineups, and clean finishing',
    serviceIds: ['apprentice-haircut', 'apprentice-haircut-beard', 'haircut', 'haircut-beard', 'lineup']
  },
  {
    id: 'salon-artist-3',
    name: 'Riley Brooks',
    specialty: 'Modern styling and event-ready finishing',
    serviceIds: ['haircut', 'haircut-beard', 'scissor-cut', 'scissor-cut-beard', 'lineup', 'after-hours']
  }
];

export const stylistAvailability: StylistAvailability[] = [
  { date: '2026-04-22', stylistId: 'salon-artist-1', times: ['10:00', '10:20', '10:40', '11:00', '13:00', '13:30', '15:00'] },
  { date: '2026-04-22', stylistId: 'salon-artist-2', times: ['10:30', '11:00', '13:00', '14:00', '15:30'] },
  { date: '2026-04-22', stylistId: 'salon-artist-3', times: ['10:00', '11:30', '12:00', '14:30', '16:00'] },
  { date: '2026-04-23', stylistId: 'salon-artist-1', times: ['10:00', '10:30', '12:00', '13:20', '15:00', '16:30'] },
  { date: '2026-04-23', stylistId: 'salon-artist-2', times: ['11:00', '13:00', '13:30', '15:00'] },
  { date: '2026-04-23', stylistId: 'salon-artist-3', times: ['10:20', '11:00', '14:00', '14:30', '17:00'] },
  { date: '2026-04-24', stylistId: 'salon-artist-1', times: ['10:00', '11:00', '13:00', '15:30'] },
  { date: '2026-04-24', stylistId: 'salon-artist-2', times: ['10:30', '12:30', '14:00', '16:00'] },
  { date: '2026-04-24', stylistId: 'salon-artist-3', times: ['10:00', '10:40', '12:00', '13:30', '16:30'] }
];
