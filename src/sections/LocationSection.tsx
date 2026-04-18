export function LocationSection() {
  return (
    <section className="page-section" aria-labelledby="location-heading">
      <div className="location-card">
        <div>
          <p className="eyebrow">Location</p>
          <h2 id="location-heading">Raleigh studio</h2>
          <p>214 Linden Walk, Raleigh, NC</p>
          <dl>
            <div>
              <dt>Monday - Friday</dt>
              <dd>10:00 AM - 6:00 PM</dd>
            </div>
            <div>
              <dt>Saturday</dt>
              <dd>10:00 AM - 4:00 PM</dd>
            </div>
            <div>
              <dt>Sunday</dt>
              <dd>Closed</dd>
            </div>
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
