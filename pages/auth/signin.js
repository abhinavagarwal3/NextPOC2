import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../utils/supabaseClient';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle between sign-up and sign-in
  const router = useRouter();

  // Handle Sign-Up
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign-up error:", error.message);
      alert("Sign-up failed!");
    } else {
      alert("Sign-up successful! Please check your email to confirm.");
    }
  };

  // Handle Sign-In
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed!");
    } else {
      alert("Login successful!");
      router.push('/');  // Redirect to home page after successful login
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px' }}
      />
      <button 
        onClick={isSignUp ? handleSignUp : handleSignIn} 
        style={{ padding: '10px 20px', margin: '10px' }}
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          style={{ marginLeft: '5px', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
