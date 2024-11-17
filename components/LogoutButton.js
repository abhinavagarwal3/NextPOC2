import supabase from "../utils/supabaseClient";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi"; // Import logout icon

export default function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);
      toast.success("Logged out successfully!");
    }
  };

  return (
    <button
      className="logout-icon-button"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <FiLogOut className="logout-icon" />
    </button>
  );
}
