import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Header({ user, setUser }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Property Club</h1>
        <nav className="nav">
          <Link href="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link href="/properties" className="nav-link">Properties</Link>
              <LogoutButton setUser={setUser} />
            </>
          ) : (
            <Link href="/auth/signin" className="nav-link">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
