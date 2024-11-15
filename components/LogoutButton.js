import supabase from '../utils/supabaseClient';
import { toast } from 'react-toastify';

export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);
      toast.success('Logged out successfully!');
      
    }
  };

  return <button className="button logout-button" onClick={handleLogout}>Log Out</button>;
}
