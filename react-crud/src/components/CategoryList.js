import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/") // Adjust URL based on your Django API
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("There was an error fetching the categories!", error));
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/categories/${id}/`)
      .then(() => setCategories(categories.filter((category) => category.id !== id)))
      .catch((error) => console.error("There was an error deleting the category!", error));
  };
  
  return (
    <div>
      <h2>Categories</h2>
      <Link to="/categories/create">Create Category</Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}{" "}
            <Link to={`/categories/edit/${category.id}`}>Edit</Link> |{" "}
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
