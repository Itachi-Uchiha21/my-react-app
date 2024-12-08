import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductTable from './ProductTable';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import AddProduct from './AddProduct';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(false);

  const handleProductAdded = () => {
    setRefreshProducts(prev => !prev); // Toggle to trigger refresh
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><NavLink to="/" end style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>Home</NavLink></li>
            <li><NavLink to="/about" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>About</NavLink></li>
            <li><NavLink to="/contact" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>Contact</NavLink></li>
            <li><NavLink to="/products" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>Products</NavLink></li>
            <li><NavLink to="/add-product" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>Add Product</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductTable refreshProducts={refreshProducts} />} />
          <Route path="/add-product" element={<AddProduct onProductAdded={handleProductAdded} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;