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

  app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/detail', { product });
  });

  app.get('/products/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  });

  app.post('/products/edit/:id', async(req,res) => {
    const updatedProduct = req.body;
    await Product.findByIdAndUpdate(req.params.id, updatedProduct);
    res.redirect('/products');
  });

  app.post('/products/delete/:id', async(req,res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  })
};
