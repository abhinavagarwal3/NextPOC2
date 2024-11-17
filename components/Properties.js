import LikeButton from "./LikeButton";

export default function Properties({ properties, user }) {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Explore All Properties</h2>
      <div className="carousel">
        {properties.map((property) => (
          <div key={property.id} className="carousel-item">
            <div className="carousel-item-content">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="carousel-image"
              />
              <div className="carousel-item-details">
                <h3 className="carousel-item-title">{property.title}</h3>
                <p className="carousel-item-price">${property.price}</p>
                {user && (
                  <LikeButton propertyId={property.id} userId={user.id} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
