import axios from 'axios';

export default function LikeButton({ propertyId }) {
  const handleLike = async () => {
    await axios.post('/api/interactions', {
      user_id: 'YOUR_USER_ID',  // Replace with actual user ID
      property_id: propertyId,
      interaction_type: 'like',
    });
    alert('Property liked!');
  };

  return <button onClick={handleLike}>Like</button>;
}
