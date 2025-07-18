const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const logger = require('../middleware/logger');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// In-memory product array
let products = [
  { id: 1, name: 'Laptop', description: 'A powerful laptop', price: 1500, category: 'Electronics', inStock: true },
  { id: 2, name: 'Book', description: 'Learn Node.js', price: 25, category: 'Books', inStock: true }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  // Update fields
  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.category = req.body.category;
  product.inStock = req.body.inStock;

  res.json(product);
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

module.exports = router;
