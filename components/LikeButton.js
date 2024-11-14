import axios from "axios";

export default function LikeButton({ propertyId, userId }) {
  const handleLike = async () => {
    try {
      const response = await axios.post("/api/interactions", {
        user_id: userId, // Make sure userId is correctly passed
        property_id: propertyId,
        interaction_type: "like",
      });

      // Log the success response from the server
      console.log("Like response:", response.data);
      alert("Property liked!");
    } catch (error) {
      // Log any error details
      console.error("Error in handleLike:", error);
      alert("There was an issue liking this property.");
    }
  };

  return <button onClick={handleLike}>Like</button>;
}
