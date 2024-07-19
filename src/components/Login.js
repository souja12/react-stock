import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { message, Spin } from 'antd';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Clear the input fields after successful login
      setUsername('');
      setPassword('');

      // Fetch the user's name from Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      const userName = userDoc.data().name;

      // Optionally, you can display a success message
      message.success(`Login successful! Welcome, ${userName}!`);

      // Redirect to dashboard or desired route
      navigate('/home');
    } catch (error) {
      let errorMessage = "";
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        errorMessage = "Invalid Username";
      } else {
        errorMessage = "Invalid Password";
      }
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        {/* Login Form */}
        <form onSubmit={login} className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="login-button" style={{width:"322px"}}>
            {loading ? <Spin /> : 'Login'}
          </button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
      <div className="right">
        {/* Photo */}
        <img
          src="https://i.pinimg.com/originals/02/fc/da/02fcda11cbfb2a84537f9d059b4c81b2.gif"
          alt="Registration"
        />
      </div>
    </div>
  );
};

export default Login;
