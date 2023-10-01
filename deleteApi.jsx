import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/items'); // Replace with your API endpoint
    const jsonData = await response.json();
    setData(jsonData);
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Data deleted successfully, update your state or fetch data again
        fetchData();
      } else {
        console.log('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
