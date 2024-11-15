export default function Recommendations({ recommendedProperties }) {
  return (
    <section className="section">
      <h2 className="section-title">Recommended for You</h2>
      <div className="scroll-container">
        {recommendedProperties.map((property) => (
          <div key={property.id} className="card">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="card-image"
            />
            <h3 className="card-title">{property.title}</h3>
            <p className="card-price">${property.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
