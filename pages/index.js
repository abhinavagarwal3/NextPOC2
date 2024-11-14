import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import supabase from '../utils/supabaseClient';
import LogoutButton from '../components/LogoutButton';
import LikeButton from '../components/LikeButton';

export default function Home() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const fetchProperties = async () => {
      const response = await axios.get('/api/properties');
      setProperties(response.data);
    };

    getUser();
    fetchProperties();
  }, []);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <h1>Property Listings</h1>
        <div>
          {!user ? (
            <Link
              href="/auth/signin"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              Sign In / Sign Up
            </Link>
          ) : (
            <LogoutButton setUser={setUser} />
          )}
        </div>
      </header>

      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h2>{property.title}</h2>
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
            <p>{property.description}</p>
            <p>Location: {property.location}</p>
            <p>Price: ${property.price}</p>
            {user && <LikeButton propertyId={property.id} userId={user.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
