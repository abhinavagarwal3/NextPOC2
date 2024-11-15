import LikeButton from './LikeButton';

export default function Properties({ properties, user }) {
  return (
    <section className="section">
      <h2 className="section-title">All Properties</h2>
      <div className="scroll-container">
        {properties.map((property) => (
          <div key={property.id} className="card">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="card-image"
            />
            <h3 className="card-title">{property.title}</h3>
            <p className="card-price">${property.price}</p>
            {user && <LikeButton propertyId={property.id} userId={user.id} />}
          </div>
        ))}
      </div>
    </section>
  );
}
