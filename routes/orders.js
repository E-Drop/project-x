const Order = require('../models/Order');
const Product = require('../models/Product');
module.exports = app => {
  app.get('/orders', async (req, res, next) => {
    if (req.session.currentUser.admin) {
      const orders = await Order.find({});
      res.render('orders/orders', { orders });
    } else {
      console.log(req.session.currentUser);
      const orders = Order.find({ _store: req.session.currentUser._store });

      res.render('orders/orders', { orders });
    }
  });

  app.post('/orders', async (req, res, next) => {
    const { products } = req.body;
    let i = 0;
    for (let product of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $inc: { stock: (product.quantity * (-1)) } }
      );
      const price = await Product.findOne(
        { name: product.name },
        { _id: 0, price: 1 }
      );
      products[i] = { ...product, ...price };
      i++;
    }
  
  await Order.insertOne({products: products, _store: req.session.currentUser._store})

  res.redirect('/orders');

  });
};
