import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav style={{ padding: "10px", backgroundColor: "#282c34" }}>
          <ul style={{ display: "flex", listStyleType: "none" }}>
            <li style={{ margin: "0 10px" }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ margin: "0 10px" }}>
              <Link to="/categories" style={{ color: "white", textDecoration: "none" }}>
                Categories
              </Link>
            </li>
            <li style={{ margin: "0 10px" }}>
              <Link to="/items" style={{ color: "white", textDecoration: "none" }}>
                Items
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/create" element={<ItemForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
