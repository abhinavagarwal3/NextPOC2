import supabase from '../../utils/supabaseClient';

// Fetch properties
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // Add a new property
  if (req.method === 'POST') {
    const { title, description, price, location, user_id } = req.body;
    const { data, error } = await supabase.from('properties').insert([{ title, description, price, location, user_id }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  }
}
