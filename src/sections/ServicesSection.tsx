import { formatPrice } from '@/lib/salonModel';
import type { HomepageService } from '@/lib/types';

interface ServicesSectionProps {
  services: HomepageService[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="page-section" aria-labelledby="services-heading">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Services</p>
        <h2 id="services-heading">Service pricing</h2>
        <p className="section-support">Choose the service that fits your appointment. Final availability is confirmed during booking.</p>
      </div>
      <div className="service-strip" aria-label="Service pricing">
        {services.map((service) => (
          <article key={service.id}>
            <div>
              <h3>{service.name}</h3>
              <p>{service.durationLabel}</p>
              {service.note && <small>{service.note}</small>}
            </div>
            <strong>{formatPrice(service.price)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
