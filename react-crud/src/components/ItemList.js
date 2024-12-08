import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/items/") // Adjust URL based on your Django API
      .then((response) => setItems(response.data))
      .catch((error) => console.error("There was an error fetching the items!", error));
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/items/${id}/`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("There was an error deleting the item!", error));
  };

  return (
    <div>
      <h2>Items</h2>
      <Link to="/items/create">Create Item</Link>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category.name}{" "}
            <Link to={`/items/edit/${item.id}`}>Edit</Link> |{" "}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
