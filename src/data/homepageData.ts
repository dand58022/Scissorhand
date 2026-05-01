import { formatDuration } from '@/lib/salonModel';
import type { HomepageService } from '@/lib/types';
import { seedServices } from './salonData';

export const homepageServices: HomepageService[] = seedServices.map((service) => ({
  id: service.id,
  name: service.name,
  durationLabel: formatDuration(service.durationMinutes),
  price: service.price,
  note: service.id === 'after-hours' ? service.description : undefined
}));
