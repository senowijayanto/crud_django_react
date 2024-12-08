import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ItemForm = () => {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    category: "", // This will store the selected category
  });
  const [categories, setCategories] = useState([]); // List of categories
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // If editing an existing item, fetch the id from URL

  // Fetch categories when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/") // Change this URL to match your Django API endpoint
      .then((response) => {
        setCategories(response.data); // Assuming response.data is an array of category objects
      })
      .catch((err) => {
        setError("Failed to fetch categories");
      });

    // If editing an existing item, fetch item details by id
    if (id) {
      axios
        .get(`http://localhost:8000/api/items/${id}/`) // Adjust URL as per your API
        .then((response) => {
          const item = response.data;
          setItemData({
            name: item.name,
            description: item.description,
            category: item.category.id, // Assuming category is an object with 'id'
          });
        })
        .catch((err) => {
          setError("Failed to fetch item details");
        });
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name: itemData.name,
      description: itemData.description,
      category: itemData.category,
    };

    const apiUrl = id
      ? `http://localhost:8000/api/items/${id}/` // Update item
      : "http://localhost:8000/api/items/"; // Create new item

    const method = id ? "PUT" : "POST";

    axios
      .request({
        url: apiUrl,
        method: method,
        data: dataToSubmit,
      })
      .then(() => {
        navigate("/items"); // Redirect to the item list page
      })
      .catch((err) => {
        setError("Failed to save item");
      });
  };

  return (
    <div>
      <h2>{id ? "Edit Item" : "Create Item"}</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={itemData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={itemData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{id ? "Update Item" : "Create Item"}</button>
      </form>
    </div>
  );
};

export default ItemForm;
