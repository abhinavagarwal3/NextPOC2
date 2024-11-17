import { useState } from "react";
import Link from "next/link";
import ChatAssistant from "./ChatAssistant";

export default function Header({ user, setUser }) {
  const [showChat, setShowChat] = useState(false);

  const openChat = () => setShowChat(true);
  const closeChat = () => setShowChat(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">AI-FI Minds</h1>
        <nav className="nav">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {user && (
            <>
              <Link href="/properties" className="nav-link">
                Properties
              </Link>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link href="/auth/signin" className="nav-link">
              Sign In
            </Link>
          )}
          {/* Add the Open AI Assistant Button */}
          <button className="nav-button" onClick={openChat}>
            Open AI Assistant
          </button>
        </nav>
      </div>
      {/* Chat Assistant Overlay */}
      {showChat && <ChatAssistant onClose={closeChat} />}
    </header>
  );
}
