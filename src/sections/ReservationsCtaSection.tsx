import { Link } from 'react-router';

export function ReservationsCtaSection() {
  return (
    <section className="page-section reservations-cta" aria-labelledby="reservations-heading">
      <p className="eyebrow">Reservations</p>
      <h2 id="reservations-heading">Ready to book your appointment?</h2>
      <p>Choose your service, preferred stylist, and a time that fits your day.</p>
      <Link className="primary-action" to="/booking">
        Book Now
      </Link>
    </section>
  );
}
