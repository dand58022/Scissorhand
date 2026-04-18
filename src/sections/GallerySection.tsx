const galleryItems = [
  { label: 'Live client gallery (Yelp integration coming soon)', className: 'gallery-item gallery-item--large' },
  { label: 'Live client gallery (Yelp integration coming soon)', className: 'gallery-item gallery-item--tall' },
  { label: 'Live client gallery (Yelp integration coming soon)', className: 'gallery-item' },
  { label: 'Live client gallery (Yelp integration coming soon)', className: 'gallery-item' },
  { label: 'Live client gallery (Yelp integration coming soon)', className: 'gallery-item' }
];

export function GallerySection() {
  return (
    <section className="page-section" aria-labelledby="gallery-heading">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Gallery</p>
        <h2 id="gallery-heading">Studio mood</h2>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div className={item.className} key={item.label}>
            <div className="placeholder-label">
              <span className="production-badge">In production</span>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
