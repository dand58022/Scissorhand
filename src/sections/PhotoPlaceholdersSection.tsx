const placeholders = [
  {
    title: 'Shop interior',
    description: 'Front entrance, waiting area, and the full room.'
  },
  {
    title: 'Finished cuts',
    description: 'Sharp fades, beard work, and detail shots.'
  },
  {
    title: 'Barber team',
    description: 'Portraits of the barbers behind the chair.'
  },
  {
    title: 'Retail wall',
    description: 'Products, checkout, and front-desk details.'
  }
] as const;

export function PhotoPlaceholdersSection() {
  return (
    <section className="page-section page-section--compact" aria-labelledby="photo-placeholders-heading">
      <div className="section-heading section-heading--compact section-heading--tight">
        <p className="eyebrow">Shop Gallery</p>
        <h2 id="photo-placeholders-heading">A look at the shop.</h2>
        <p className="section-support">Add shop photos, finished cuts, barber portraits, and retail displays before launch.</p>
      </div>
      <div className="photo-placeholder-grid" aria-label="Shop gallery placeholders">
        {placeholders.map((item) => (
          <article key={item.title} className="photo-placeholder-card">
            <div className="placeholder-label">
              <span className="production-badge">Coming soon</span>
            </div>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
