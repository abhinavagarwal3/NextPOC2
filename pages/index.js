import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import LogoutButton from "../components/LogoutButton";
import LikeButton from "../components/LikeButton";

export default function Home() {
  const [user, setUser] = useState(null); // Store the authenticated user
  const [properties, setProperties] = useState([]); // Store all properties
  const [recommendedProperties, setRecommendedProperties] = useState([]); // Store recommended properties

  useEffect(() => {
    // Function to fetch the current authenticated user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); // Set user state with authenticated user info
      console.log("User fetched:", user); // Debugging log

      // If a user is logged in, fetch their recommendations
      if (user) {
        fetchRecommendations(user.id);
      }
    };

    // Fetch all properties to display
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties"); // Adjust this URL based on your API setup
        setProperties(response.data);
        console.log("Properties fetched:", response.data); // Debugging log
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    getUser();
    fetchProperties();
  }, []); // Empty dependency array to run once on component mount

  // Function to fetch recommended properties from the recommendation API
  const fetchRecommendations = async (userId) => {
    console.log("Fetching recommendations for user:", userId); // Debugging log
    try {
      const response = await axios.post(
        "https://recommender-model-abhinavag3.replit.app/recommendations",
        {
          user_id: userId,
        },
      );
      setRecommendedProperties(response.data.recommended_properties);
      console.log(
        "Recommendations fetched:",
        response.data.recommended_properties,
      ); // Debugging log
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <header
        style={{
          position: "relative",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        <h1>Property Listings</h1>
        <div style={{ position: "absolute", top: "10px", right: "20px" }}>
          {!user ? (
            <Link
              href="/auth/signin"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Sign In / Sign Up
            </Link>
          ) : (
            <LogoutButton setUser={setUser} />
          )}
        </div>
      </header>

      {/* Section for Recommended Properties */}
      {user && recommendedProperties.length > 0 && (
        <section
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#ff6347" }}>Recommended Properties for You</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recommendedProperties.map((property) => (
              <li
                key={property.id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  margin: "10px 0",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3>{property.title}</h3>
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p>{property.description}</p>
                <p>Location: {property.location}</p>
                <p>Price: ${property.price}</p>
                {user && (
                  <LikeButton propertyId={property.id} userId={user.id} />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Regular Property Listings */}
      <h2>All Properties</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {properties.map((property) => (
          <li
            key={property.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              margin: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>{property.title}</h2>
            <img
              src={property.imageUrl}
              alt={property.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
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
