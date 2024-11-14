import supabase from '../utils/supabaseClient';

export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);  // Clear the user state on logout
      alert("Logged out successfully!");
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
