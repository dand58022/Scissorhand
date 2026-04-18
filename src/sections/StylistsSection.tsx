import type { Stylist } from '@/lib/types';

interface StylistsSectionProps {
  stylists: Stylist[];
}

export function StylistsSection({ stylists }: StylistsSectionProps) {
  const publicStylists = stylists.filter((stylist) => stylist.id !== 'no-preference').slice(0, 3);

  return (
    <section className="page-section" aria-labelledby="stylists-heading">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Stylists</p>
        <h2 id="stylists-heading">Meet the salon team</h2>
      </div>
      <div className="stylist-grid">
        {publicStylists.map((stylist) => (
          <article className="stylist-card" key={stylist.id}>
            <div className="stylist-portrait" />
            <h3>{stylist.specialty}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
