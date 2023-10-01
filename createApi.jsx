import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/items'); // Replace with your API endpoint
    const jsonData = await response.json();
    setData(jsonData);
  };

  const createItem = async () => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName }),
      });

      if (response.status === 201) {
        // Data created successfully, update your state or fetch data again
        fetchData();
        setNewItemName('');
      } else {
        console.log('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="New item name"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <button onClick={createItem}>Create</button>
      </div>
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
