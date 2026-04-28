import type { Service, Stylist, StylistAvailability } from '@/lib/types';

export const seedServices: Service[] = [
  {
    id: 'haircut',
    name: 'Signature Cut',
    durationMinutes: 30,
    price: 75,
    description: 'Precision shape refinement, fringe work, and a polished finish.'
  },
  {
    id: 'digital-perm',
    name: 'Texture Service',
    durationMinutes: 120,
    price: 220,
    description: 'Soft movement, controlled texture, and a tailored finish.'
  },
  {
    id: 'consultation',
    name: 'Style Consultation',
    durationMinutes: 20,
    price: 35,
    description: 'Look planning, maintenance guidance, and finish recommendations.'
  }
];

export const seedStylists: Stylist[] = [
  {
    id: 'no-preference',
    name: 'No preference',
    specialty: 'Match me with an available stylist',
    serviceIds: ['haircut', 'digital-perm', 'consultation']
  },
  {
    id: 'salon-artist-1',
    name: 'Jordan Lee',
    specialty: 'Precision cutting and shape refinement',
    serviceIds: ['haircut', 'consultation']
  },
  {
    id: 'salon-artist-2',
    name: 'Casey Morgan',
    specialty: 'Texture services and polished finishing',
    serviceIds: ['digital-perm', 'consultation']
  },
  {
    id: 'salon-artist-3',
    name: 'Riley Brooks',
    specialty: 'Modern styling and event-ready finishing',
    serviceIds: ['haircut', 'consultation']
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
