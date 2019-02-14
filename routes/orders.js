const Order = require('../models/Order');
const Product = require('../models/Product');
const loggedNotAdmin = require('../middlewares/loggedNotAdmin');
const requireAdmin = require('../middlewares/requireAdmin');

module.exports = app => {
  app.get('/orders', async (req, res, next) => {
    if (req.session.admin) {
      const pending = await Order.find({status: 'pending'}).sort({ created_at: 'asc' }).populate('_store');
      const delivered = await Order.find({status: 'delivered'}).sort({ updated_at: 'desc' }).populate('_store')
      
      res.render('orders/orders', { pending, delivered });
    } else {
      const pending = await Order.find({
        _store: req.session.currentUser._store,
      status: 'pending'}).sort({ created_at: 'asc' }).populate('_store');
      const delivered = await Order.find({
        _store: req.session.currentUser._store,
      status: 'delivered'}).sort({ created_at: 'desc' }).populate('_store');

      res.render('orders/orders', { pending, delivered });
    }
  });

  app.post('/orders', loggedNotAdmin, async (req, res, next) => {
    const { products } = req.body;
    console.log();
    let i = 0;
    for (let product of products) {
      try {
        await Product.findOneAndUpdate(
          { name: product.name },
          { $inc: { stock: product.quantity * -1 } }
        );
        const { price } = await Product.findOne(
          { name: product.name },
          { _id: 0, price: 1 }
        );

        const { name, quantity } = product;
        products[i] = { name, quantity, price };
        i++;
      } catch (error) {
        next(error);
      }
    }
    try {
      await Order.create({
        products: products,
        _store: req.session.currentUser._store
      });
    } catch (error) {
      next(error);
    }
    res.send({ message: 'Order created successfully' });
  });

  app.get('/orders/new', loggedNotAdmin, async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.render('products/products', { products });
    } catch (error) {
      next(error);
    }
  });

  app.get('/orders/stats', requireAdmin, async (req, res, next) => {
    try {
      const orders = await Order.populate('_store')
        .aggregate()
        .unwind('products')
        .group({
          _id: '$_store.name',
          total: {
            $sum: { $multiply: ['$products.price', '$products.quantity'] }
          }
        });
      console.log(orders);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/orders/confirm/:id', requireAdmin, async (req, res, next) => {
    try {
      await Order.findByIdAndUpdate(req.params.id, { status: 'delivered' });
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
};
