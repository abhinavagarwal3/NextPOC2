import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LikeButton({ propertyId, userId }) {
  const [liked, setLiked] = useState(false);  // Track if the button is liked

  const handleLike = async () => {
    try {
      await axios.post('/api/interactions', {
        user_id: userId,
        property_id: propertyId,
        interaction_type: 'like',
      });

      setLiked(true);  // Set liked to true on successful like
      toast.success('Property liked!');
    } catch (error) {
      console.error("Error in handleLike:", error);
      alert("There was an issue liking this property.");
    }
  };

  return (
    <button 
      className={`button like-button ${liked ? 'liked' : ''}`} 
      onClick={handleLike}
    >
      {liked ? 'Liked' : 'Like'}
    </button>
  );
}
