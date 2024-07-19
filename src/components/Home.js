import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { message } from 'antd';
import { FaChartLine, FaTable, FaMoneyBill, FaVrCardboard, FaLanguage } from 'react-icons/fa';
import './RedesignedHome.css';
import TradingViewWidget from './TradingViewWidget';
import MiniWidget from './MiniWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import Dashboard from './Dashboard';

const RedesignedHome = () => {
  const [userName, setUserName] = useState('User');
  const [selectedSymbol, setSelectedSymbol] = useState('NSE:TATAMOTORS');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userName = userDoc.data().name;
          setUserName(userName);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success('Logout successful!');
      navigate('/');
    } catch (error) {
      message.error('Failed to logout. Please try again.');
    }
  };

  const symbols = [
    { name: 'Apple', symbol: 'NASDAQ:AAPL' },
    { name: 'Google', symbol: 'NASDAQ:GOOGL' },
    { name: 'Microsoft', symbol: 'NASDAQ:MSFT' },
    { name: 'Tata Motors', symbol: 'NSE:TATAMOTORS' }
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Stock Magic</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <FaChartLine /> Dashboard
            </li>
            <li>
              <FaTable /> Tables
            </li>
            <li>
              <FaMoneyBill /> Billing
            </li>
            <li>
              <FaVrCardboard /> Virtual Reality
            </li>
            <li>
              <FaLanguage /> RTL
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-upgrade">Upgrade to pro</button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome, {userName}</h1>
          <button onClick={handleLogout} className="btn-signout">Sign Out</button>
        </header>
        <div>
        <Dashboard/>
        </div>
      </main>
    </div>
  );
};

export default RedesignedHome;
