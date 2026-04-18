import { formatPrice } from '@/lib/salonModel';
import type { Service } from '@/lib/types';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="page-section" aria-labelledby="services-heading">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Services</p>
        <h2 id="services-heading">Service pricing</h2>
      </div>
      <div className="service-strip" aria-label="Service pricing">
        {services.map((service) => (
          <article key={service.id}>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <strong>{formatPrice(service.price)}</strong>
            <span>{service.durationMinutes} min</span>
          </article>
        ))}
      </div>
    </section>
  );
}
