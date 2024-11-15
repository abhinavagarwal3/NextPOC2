import { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabaseClient';
import Header from '../components/Header';
import Recommendations from '../components/Recommendations';
import Properties from '../components/Properties';
import Footer from '../components/Footer';
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
      <Header user={user} setUser={setUser} />
      <main className="main">
        {user && recommendedProperties.length > 0 && (
          <Recommendations recommendedProperties={recommendedProperties} user={user} />
        )}
        <Properties properties={properties} user={user} />
      </main>
      <Footer />
    </div>
  );
}
