const Product = require('../models/Product');

module.exports = app => {
  app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/products', { products });
  });

  app.get('/products/new', (req, res) => {
    res.render('products/newProduct');
  });

  app.post('/products', async (req, res) => {
    const newProduct = req.body;
    await Product.create(newProduct);
    res.redirect('/products');
  });
};
