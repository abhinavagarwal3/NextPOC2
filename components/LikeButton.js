import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LikeButton({ propertyId, userId }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await axios.post('/api/interactions', {
        user_id: userId,
        property_id: propertyId,
        interaction_type: liked ? "unlike" : "like", // Toggle like/unlike
      });
      setLiked(!liked);
      toast.success(liked ? "Property unliked!" : "Property liked!");
    } catch (error) {
      console.error("Error liking property:", error);
      toast.error("Failed to update like status.");
    }
  };

  return (
    <button
      className={`button like-button ${liked ? "liked" : ""}`}
      onClick={handleLike}
    >
      {liked ? "Liked" : "Like"}
    </button>
  );
}
