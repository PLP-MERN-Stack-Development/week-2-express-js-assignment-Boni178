const express = require('express');
const app = express();
const PORT = 3000;

const productRoutes = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');
app.use(express.json()); // to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the products route
app.use('/api/products', productRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

