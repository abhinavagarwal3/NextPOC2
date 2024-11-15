import { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabaseClient';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import LikeButton from '../components/LikeButton';
import { toast } from 'react-toastify';

export default function Home() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          await fetchRecommendations(user.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user information.");
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
        toast.success("Properties loaded successfully!");
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to fetch properties.");
      }
    };

    getUser();
    fetchProperties();
  }, []);

  const fetchRecommendations = async (userId) => {
    try {
      const response = await axios.post('https://recommender-model-abhinavag3.replit.app/recommendations', {
        user_id: userId,
      });
      setRecommendedProperties(response.data.recommended_properties || []);
      toast.success("Recommendations loaded successfully!");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to load recommendations.");
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Property Club</h1>
          <nav className="nav">
            <Link href="/" className="nav-link">Home</Link>
            {user ? (
              <>
                <Link href="/properties" className="nav-link">Properties</Link>
                <LogoutButton setUser={setUser} />
              </>
            ) : (
              <Link href="/auth/signin" className="nav-link">Sign In</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        {/* Recommendations Section */}
        {user && recommendedProperties.length > 0 && (
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
                  <LikeButton propertyId={property.id} userId={user.id} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Properties Section */}
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
      </main>

      <footer className="footer">
        <p>&copy; 2024 Property Club. All rights reserved.</p>
      </footer>
    </div>
  );
}
