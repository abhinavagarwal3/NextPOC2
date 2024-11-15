import LikeButton from './LikeButton';

export default function Properties({ properties, user }) {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">All Properties</h2>
      <div className="carousel">
        {properties.map((property) => (
          <div key={property.id} className="carousel-item">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="carousel-image"
            />
            <h3 className="carousel-item-title">{property.title}</h3>
            <p className="carousel-item-price">${property.price}</p>
            {user && <LikeButton propertyId={property.id} userId={user.id} />}
          </div>
        ))}
      </div>
    </section>
  );
}
