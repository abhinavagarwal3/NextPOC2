import supabase from '../utils/supabaseClient';

export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);
      alert("Logged out successfully!");
    }
  };

  return <button className="logout-button" onClick={handleLogout}>Log Out</button>;
}
