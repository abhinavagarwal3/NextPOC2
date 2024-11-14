import { useState } from 'react';
import axios from 'axios';

export default function AddProperty() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/properties', { title, description, price, location, user_id: 'YOUR_USER_ID' });
    alert('Property added!');
  };

  return (
    <div>
      <h1>Add a New Property</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}
