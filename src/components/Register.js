import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { message } from 'antd';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);

      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        name: name,
        email: userCredential.user.email,
      });

      // Clear the input fields after successful registration
      setUsername('');
      setPassword('');

      // Optionally, you can display a success message
      message.success('Registration successful! Please login.');

      // Redirect to login page
      navigate('/');
    } catch (error) {
      // Handle registration errors
      message.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="left">
        {/* Registration Form */}
        <form onSubmit={register} className="register-form">
          <h2>Registration</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Mail:</label>
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
          <button type="submit" style={{width:"322px"}}>Register</button >
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </form>
      </div>
      <div className="right">
        {/* Photo */}
        <img
          src="https://s7.ezgif.com/tmp/ezgif-7-750bc03eb7.gif"
          alt="Photo"
        />
      </div>
    </div>
  );
};

export default Register;
