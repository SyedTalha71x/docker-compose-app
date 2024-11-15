import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.18.195:5000/user') 
      .then(response => {
        setUser(response.data); 
        setLoading(false); 
        console.log(response.data);
        
      })
      .catch(error => {
        setError(error.message); 
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Information</h1>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.age}</td>
              </tr>
            </tbody>
          </table>
      </header>
    </div>
  );
}

export default App;
