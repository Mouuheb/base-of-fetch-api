import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/items'); // Replace with your API endpoint
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
