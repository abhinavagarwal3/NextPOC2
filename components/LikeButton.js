import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

export default function LikeButton({ propertyId, userId }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    setLiked(!liked);

    // Simulate API call to save like status
    try {
      await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          property_id: propertyId,
          interaction_type: liked ? 'unlike' : 'like',
        }),
      });
    } catch (error) {
      console.error('Error updating like status:', error);
      setLiked(!liked); // Revert if there's an error
    }
  };

  return (
    <div onClick={toggleLike} className="like-icon">
      {liked ? (
        <FaHeart className="liked" /> // Filled heart for liked
      ) : (
        <FaRegHeart className="not-liked" /> // Outlined heart for not liked
      )}
    </div>
  );
}
