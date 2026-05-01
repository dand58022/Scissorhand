const featureCards = [
  {
    title: 'Clean cuts',
    copy: 'Fades, beard work, scissor cuts, and sharp detailing.'
  },
  {
    title: 'Consistent service',
    copy: 'A clean, polished barbershop experience from start to finish.'
  },
  {
    title: 'Shop operations',
    copy: 'The demo also includes barber schedules, owner reports, payouts, and checkout tools.'
  }
] as const;

export function AboutSection() {
  return (
    <section className="page-section page-section--compact" aria-labelledby="about-heading">
      <div className="section-heading section-heading--compact section-heading--tight">
        <p className="eyebrow">Why clients book here</p>
        <h2 id="about-heading">Cuts, beard work, and clean service.</h2>
        <p className="section-support">What brings clients in stays simple: strong cuts, sharp detail, and a polished shop experience.</p>
      </div>
      <div className="feature-grid" aria-label="Precision Barber Co. highlights">
        {featureCards.map((feature) => (
          <article key={feature.title} className="feature-card">
            <strong>{feature.title}</strong>
            <p>{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
