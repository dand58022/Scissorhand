import { SALON_ADDRESS, SALON_HOURS, SALON_LOCATION_LABEL } from '@/data/salonConfig';

export function LocationSection() {
  return (
    <section className="page-section" aria-labelledby="location-heading">
      <div className="location-card">
        <div>
          <p className="eyebrow">Location</p>
          <h2 id="location-heading">{SALON_LOCATION_LABEL}</h2>
          <p>{SALON_ADDRESS}</p>
          <dl>
            {SALON_HOURS.map((hours) => (
              <div key={hours.label}>
                <dt>{hours.label}</dt>
                <dd>{hours.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="map-placeholder">
          <span className="map-pin" aria-hidden="true" />
          <span className="production-badge">In production</span>
          <strong>Interactive map</strong>
          <small>Google Maps integration coming soon.</small>
        </div>
      </div>
    </section>
  );
}
