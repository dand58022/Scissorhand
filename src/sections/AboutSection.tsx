import { SALON_ABOUT_COPY, SALON_ABOUT_HEADING } from '@/data/salonConfig';

export function AboutSection() {
  return (
    <section className="page-section about-section" aria-labelledby="about-heading">
      <p className="eyebrow">About</p>
      <h2 id="about-heading">{SALON_ABOUT_HEADING}</h2>
      <p>{SALON_ABOUT_COPY}</p>
    </section>
  );
}
