const reviews = [
  { quote: "Best haircut I've had in years.", customer: 'Customer 1' },
  { quote: 'The shape grew out beautifully.', customer: 'Customer 2' },
  { quote: 'Calm appointment and thoughtful styling.', customer: 'Customer 3' }
];

export function ReviewsSection() {
  return (
    <section className="page-section" aria-labelledby="reviews-heading">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Reviews</p>
        <h2 id="reviews-heading">What clients are saying</h2>
        <p className="section-support">Yelp integration coming soon.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.customer}>
            <div className="review-card__header">
              <span className="production-badge">Yelp integration coming soon</span>
            </div>
            <p>{review.quote}</p>
            <small>{review.customer}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
