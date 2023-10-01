import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/api/items'); // Replace with your API endpoint
    const jsonData = await response.json();
    setData(jsonData);
  };

  const startEditing = (itemId, itemName) => {
    setEditingItemId(itemId);
    setEditedItemName(itemName);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setEditedItemName('');
  };

  const updateItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedItemName }),
      });

      if (response.status === 200) {
        // Data updated successfully, update your state or fetch data again
        fetchData();
        cancelEditing();
      } else {
        console.log('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          {editingItemId === item.id ? (
            <div>
              <input
                type="text"
                value={editedItemName}
                onChange={e => setEditedItemName(e.target.value)}
              />
              <button onClick={() => updateItem(item.id)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            <div>
              <span>{item.name}</span>
              <button onClick={() => startEditing(item.id, item.name)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
