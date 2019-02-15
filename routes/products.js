const Product = require('../models/Product');
const requireAdmin = require('../middlewares/requireAdmin')

module.exports = app => {
  app.get('/products', requireAdmin, async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.render('products/productsAdmin', { products })

    } catch(error) {
      next(error)
    }
    
  });

  app.get('/products/new', requireAdmin, (req, res, next) => {
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
  app.get('/api/allProducts', async (req, res, next) => {
    try {
      const result = await Product.find({});
      console.log(result);
      res.send(result);
    } catch (error) {
      next(error);
    }
  });

  app.post('/products/delete/:id', requireAdmin, async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });

  app.get('/products/edit/:id', requireAdmin, async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.render('products/edit', { product });
    } catch (error) {
      next(error);
    }
  });

  app.post('/products', requireAdmin, async (req, res, next) => {
    try {
      const newProduct = req.body;
      await Product.create(newProduct);
      req.flash('success', 'Product created successfully');
      res.redirect('/products');
    } catch (error) {
      next(error);
    }
  });

  app.post('/products/:id', requireAdmin, async (req, res, next) => {
    try {
      const updatedProduct = req.body;
      await Product.findByIdAndUpdate(req.params.id, updatedProduct);
      req.flash('success', 'Product successfully updated');
      res.redirect('/products');
    } catch (error) {
      next(error);
    }
  });
};


