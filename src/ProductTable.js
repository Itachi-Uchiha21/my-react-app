import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported
import { Select, MenuItem } from '@mui/material';
import EditProductForm from './EditProductForm';  // Ensure you have this component

function ProductTable({ refreshProducts }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);  // State to manage editing

  // Fetch categories and their associated products
  const fetchCategoriesAndProducts = async () => {
    try {
      const response = await axios.get('http://192.168.1.163:8080/api/categories');
      setCategories(response.data);
      setSelectedCategory(response.data[0]?.id || '');  // Default to the first category
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://192.168.1.163:8080/api/products/${productId}`);
      const updatedCategories = categories.map(cat =>
        cat.id === selectedCategory ? { ...cat, products: cat.products.filter(product => product.productId !== productId) } : cat
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, [refreshProducts]);

  return (
    <>
      <Select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>
      {editingProduct ? (
        <EditProductForm
          product={editingProduct}
          onSave={(updatedProduct) => {
            const updatedCategories = categories.map(cat =>
              cat.id === selectedCategory ? {...cat, products: cat.products.map(p => p.productId === updatedProduct.productId ? updatedProduct : p)} : cat
            );
            setCategories(updatedCategories);
            setEditingProduct(null);
          }}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock Level</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.find(cat => cat.id === selectedCategory)?.products.map(product => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stockLevel}</td>
                <td>{product.description}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(product.productId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductTable;