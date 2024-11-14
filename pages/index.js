import { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabaseClient';
import SignUpButton from '../components/SignUpButton';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import LikeButton from '../components/LikeButton';

export default function Home() {
  const [user, setUser] = useState(null);           // Store the authenticated user
  const [properties, setProperties] = useState([]);  // Store list of properties

  useEffect(() => {
    // Check if there’s a currently authenticated user when the component mounts
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);  // Set the user state with the authenticated user's info
    };

    // Fetch the list of properties to display
    const fetchProperties = async () => {
      const response = await axios.get('/api/properties');
      setProperties(response.data);  // Set properties data
    };

    getUser();
    fetchProperties();
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to the Property Listings</h1>

        {/* Conditional rendering based on whether the user is logged in */}
        {!user && (
          <>
            <SignUpButton />  {/* Render SignUpButton if no user is logged in */}
            <LoginButton setUser={setUser} />  {/* Render LoginButton if no user is logged in */}
          </>
        )}

        {user && <LogoutButton setUser={setUser} />}  {/* Render LogoutButton if user is logged in */}
      </header>

      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Location: {property.location}</p>
            <p>Price: ${property.price}</p>

            {/* Render LikeButton if user is logged in */}
            {user && <LikeButton propertyId={property.id} userId={user.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
