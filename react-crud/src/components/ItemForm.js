import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ItemForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios
        .get(`http://127.0.0.1:8000/api/items/${id}/`)
        .then((response) => {
          setName(response.data.name);
          setCategory(response.data.category.id);
        })
        .catch((error) => console.error("There was an error fetching the item!", error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, category };
    const url = isEditing
      ? `http://127.0.0.1:8000/api/items/${id}/`
      : "http://127.0.0.1:8000/api/items/";

    const method = isEditing ? "put" : "post";

    axios[method](url, data)
      .then(() => navigate("/items"))
      .catch((error) => console.error("There was an error saving the item!", error));
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Item" : "Create Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {/* Populate with actual categories from the API */}
            {/* Example below */}
            <option value="1">Furniture</option>
            <option value="2">Electronics</option>
          </select>
        </div>
        <button type="submit">{isEditing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default ItemForm;
