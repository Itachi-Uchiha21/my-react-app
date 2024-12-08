import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function EditProductForm({ product, onSave, onCancel }) {
  // Initialize formData with all the properties
  const [formData, setFormData] = useState({
    productName: product.productName,
    price: product.price,
    stockLevel: product.stockLevel,
    description: product.description, // Include description
    category_id: product.category_id // Include category_id
  });

  // Effect to update formData when the product prop changes
  useEffect(() => {
    setFormData({
      productName: product.productName,
      price: product.price,
      stockLevel: product.stockLevel,
      description: product.description, // Ensure description is updated
      category_id: product.category_id // Ensure category_id is updated
    });
  }, [product]);

  // Handle changes in the text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure all product data is included in the update payload
      const response = await axios.put(`http://192.168.1.163:8080/api/products/${product.productId}`, {
        ...formData,
        productId: product.productId // Ensuring productId is included if necessary
      });
      onSave(response.data);  // Pass the updated product up to the parent component
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        label="Stock Level"
        name="stockLevel"
        type="number"
        value={formData.stockLevel}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        value={formData.description || ''} // Handle null values
        onChange={handleChange}
      />
      
      <Button type="submit" color="primary">Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </form>
  );
}

export default EditProductForm;