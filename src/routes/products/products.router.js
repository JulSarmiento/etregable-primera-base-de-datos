const express = require('express');
const router = express.Router();
const Container = require('../../../classes/Container.class');

// products config
const knexConfig = require('../../../database/config');

const products = new Container(knexConfig, `products`);


// get home page
router.get('/', (_req, res, next) => {
  try {
    res.render('pages/home');

  } catch (err) {
    next(err);
    
  };

});

// get all route
router.get('/products', async (_req, res, next) => {

  console.log('table name: ', products.tableName)
  try {
    const data = await products.getAll();
    res.status(200).json({
      success: true,
      data
    })

  } catch (err) {

    next(err);
  };

});

// save product route
router.post('/products', async (req, res, next) => {
  const body = req.body;
  const {productName, productPrice, thumbnail} = body
  if(!productName && !productPrice && !thumbnail) {
    return res.status(400).json({
      success: false,
      message: 'Missing values. Bad request'
    })
  }
  try {
    const data = await products.save(body);
    if(!data.success) {
      return res.status(400).json({
        success: false,
        data,
      })
    }

    res.status(200).redirect('/');
  }
  catch (err) {
    next(err);
  };
});

module.exports = router;