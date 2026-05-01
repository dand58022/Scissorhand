const demoViews = [
  {
    title: 'Customer View',
    copy: 'Booking flow, appointment details, and the client-facing experience.'
  },
  {
    title: 'Barber View',
    copy: 'Daily schedule, earnings, product sales, and payout setup.'
  },
  {
    title: 'Owner View',
    copy: 'Shop reports, payouts, tax summaries, and access control.'
  }
] as const;

export function DemoPreviewSection() {
  return (
    <section className="page-section page-section--compact" aria-labelledby="demo-preview-heading">
      <div className="demo-preview-strip">
        <div className="section-heading section-heading--compact section-heading--tight">
          <p className="eyebrow">Explore the demo</p>
          <h2 id="demo-preview-heading">See each side of the shop.</h2>
        </div>
        <div className="feature-grid feature-grid--compact">
          {demoViews.map((view) => (
            <article key={view.title} className="feature-card feature-card--dense">
              <strong>{view.title}</strong>
              <p>{view.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
