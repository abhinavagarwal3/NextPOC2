export default function Recommendations({ recommendedProperties }) {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Recommended for You</h2>
      <div className="carousel">
        {recommendedProperties.map((property) => (
          <div key={property.id} className="carousel-item">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="carousel-image"
            />
            <h3 className="carousel-item-title">{property.title}</h3>
            <p className="carousel-item-price">${property.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
