import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Paper } from '@mui/material';

function AddProduct({ onProductAdded }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stockLevel, setStockLevel] = useState('');
  const [description, setDescription] = useState(''); // Add this line
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://192.168.1.163:8080/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = {
      productName,
      price: parseFloat(price),
      stockLevel: parseInt(stockLevel),
      description, // Include description in the product object
      category: { id: selectedCategory },
    };

    try {
      await axios.post('http://192.168.1.163:8080/api/products', newProduct);
      onProductAdded();
      // Clear form fields
      setProductName('');
      setPrice('');
      setStockLevel('');
      setDescription(''); // Clear the description field as well
      setSelectedCategory('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Product
      </Typography>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Description" // Add the label for Description
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Stock Level"
        value={stockLevel}
        onChange={(e) => setStockLevel(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginTop: '20px' }}
      >
        Add New Product
      </Button>
    </Paper>
  );
}

export default AddProduct;