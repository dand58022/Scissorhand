import { describe, expect, it } from 'vitest';
import { fromAppointmentRow } from './appointments';

describe('Supabase appointment mapping', () => {
  it('maps an appointments table row into the app appointment model', () => {
    expect(fromAppointmentRow({
      id: 'appointment-id',
      name: 'Customer 1',
      phone: '(919) 555-0101',
      email: 'customer1@example.com',
      service: 'haircut',
      stylist: 'salon-artist-1',
      date: '2026-04-22',
      time: '10:00',
      notes: null,
      status: 'upcoming',
      created_at: '2026-04-18T10:00:00Z'
    })).toEqual({
      id: 'appointment-id',
      customerName: 'Customer 1',
      phone: '(919) 555-0101',
      email: 'customer1@example.com',
      serviceId: 'haircut',
      stylistId: 'salon-artist-1',
      date: '2026-04-22',
      time: '10:00',
      notes: '',
      status: 'upcoming',
      createdAt: '2026-04-18T10:00:00Z'
    });
  });
});
