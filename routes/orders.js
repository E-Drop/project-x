const Order = require('../models/Order');
const Product = require('../models/Product');
module.exports = app => {
  app.get('/orders', async (req, res, next) => {
    if (req.session.admin) {
      const orders = await Order.find({}).populate('_store');
      res.render('orders/orders', { orders });
    } else {
  
      const orders = await Order.find({ _store: req.session.currentUser._store }).populate('_store');

      console.log(orders)
      res.render('orders/orders', { orders });
    }
  });

  app.post('/orders', async (req, res, next) => {
    const { products } = req.body;
    let i = 0;
    for (let product of products) {
      try {
        await Product.findOneAndUpdate(
          { name: product.name },
          { $inc: { stock: (product.quantity * (-1)) } }
        );
        const  { price }= await Product.findOne(
          { name: product.name },
          { _id: 0, price: 1 }
        );
        
        const { name, quantity } = product;
        products[i] = { name, quantity, price };
        i++;
      } catch(error) {
        next(error)
      }
    }
    try {
      await Order.create({products: products, _store: req.session.currentUser._store})
    } catch(error) {
      next(error)
    }
  res.send("Order created successfully");
  });
};
