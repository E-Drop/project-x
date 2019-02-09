const Product = require('../models/Product');

module.exports = app =>  {


  app.get('/products', async(req, res) => {
    const products = await Product.find({});
    res.render('products/products', { products });
  })
}