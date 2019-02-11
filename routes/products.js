const Product = require('../models/Product');

module.exports = app => {
  app.get('/products', async (req, res, next) => {
    try {
      const products = await Product.find({ deleted: false });
      res.render('products/products', { products });
    } catch (error) {
      next(error);
    }
  });

  app.get('/products/new', (req, res, next) => {
    res.render('products/newProduct');
  });

  app.get('/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.render('products/detail', { product });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/products', async (req, res, next) => {
    try {
      const { name } = req.query;
      const result = await Product.find({ name: new RegExp(`${name}`, 'ig') });
      res.send(result);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/products/:id', async (req, res, next) => {
    await Product.findByIdAndUpdate(req.params.id, { deleted: true });
    res.redirect('/products');
  });

  app.get('/products/edit/:id', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.render('products/edit', { product });
    } catch (error) {
      next(error);
    }
  });

  app.post('/products', async (req, res, next) => {
    try {
      const newProduct = req.body;
      await Product.create(newProduct);
      res.redirect('/products');
    } catch (error) {
      next(error);
    }
  });

  app.post('/products/edit/:id', async (req, res, next) => {
    try {
      const updatedProduct = req.body;
      await Product.findByIdAndUpdate(req.params.id, updatedProduct);
      res.redirect('/products');
    } catch (error) {
      next(error);
    }
  });
};
