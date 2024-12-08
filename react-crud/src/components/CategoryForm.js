import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios
        .get(`http://127.0.0.1:8000/api/categories/${id}/`)
        .then((response) => {
          setName(response.data.name);
          setDescription(response.data.description || "");
        })
        .catch((error) => console.error("There was an error fetching the category!", error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, description };
    const url = isEditing
      ? `http://127.0.0.1:8000/api/categories/${id}/`
      : "http://127.0.0.1:8000/api/categories/";

    const method = isEditing ? "put" : "post";

    axios[method](url, data)
      .then(() => navigate("/"))
      .catch((error) => console.error("There was an error saving the category!", error));
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Category" : "Create Category"}</h2>
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
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
