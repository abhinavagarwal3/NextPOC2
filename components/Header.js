import { useState } from "react";
import Link from "next/link";
import ChatAssistant from "./ChatAssistant";
import LogoutButton from "./LogoutButton";
import { FaRobot } from "react-icons/fa"; // Import robot icon

export default function Header({ user, setUser }) {
  const [showChat, setShowChat] = useState(false);

  const openChat = () => setShowChat(true);
  const closeChat = () => setShowChat(false);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">AI-FI Minds</h1>
        <nav className="nav">
          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/properties" className="nav-link">
            Properties
          </Link>

          {/* Add the Open AI Assistant Button */}
          <button
            className="chat-icon-button"
            onClick={openChat}
            aria-label="Open AI Assistant"
            title="Open AI Assistant"
          >
            <FaRobot className="chat-icon" />
          </button>
        </nav>
      </div>
      {/* Chat Assistant Overlay */}
      {showChat && <ChatAssistant onClose={closeChat} />}

      {/* Logout Button */}
      {user && (
        <>
          <LogoutButton setUser={setUser} />
        </>
      )}
      {!user && (
        <Link href="/auth/signin" className="nav-link">
          Sign In
        </Link>
      )}
    </header>
  );
}
