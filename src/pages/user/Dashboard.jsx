// src/pages/user/Dashboard.jsx
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getCurrentUser } from '../../utils/storage';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //       const currentUser = await getCurrentUser();
  //       setUser(currentUser);
  //   }
  //   fetchData();
  // }, []);

  useEffect(()=>{
    const currentUser = getCurrentUser();
    setUser(currentUser);
  },[])
  

  return (
    <Layout>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '2rem', color: '#333' }}>Welcome to Your Dashboard</h1>
        
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#555' }}>Your Profile Informati  on</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#666' }}>Name:</strong>
            <p style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{user?.name}</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#666' }}>Email:</strong>
            <p style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{user?.email}</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#666' }}>User ID:</strong>
            <p style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{user?.id}</p>
          </div>
          
          <div>
            <strong style={{ color: '#666' }}>Account Created:</strong>
            <p style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#e8f4f8',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #b3d9e6'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#2c5f7a' }}>Dashboard Features</h3>
          <ul style={{ lineHeight: '1.8', color: '#555' }}>
            <li>View your profile information</li>
            <li>Access your account details</li>
            <li>Manage your settings</li>
            <li>Secure authentication with hashed passwords</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;