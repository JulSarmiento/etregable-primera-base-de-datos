const express = require('express');
const router = express.Router();
const Container = require('../../../classes/Container.class');

const db = [];

const messages = new Container(db);

// get home page
router.get('/', (_req, res, next) => {
  try {
    res.render('pages/home')
  } catch (err) {
    next(err);
  };

});

// get all route
router.get('/products', (_req, res, next) => {
  console.log(messages)
  try {
    res.render('pages/products', { products : messages.getAll()})
  } catch (err) {
    next(err);
  };

});

// save product route
router.post('/', (req, res, next) => {
  try {
    console.log('holis')
    products.saveProduct(req.body);
    res.status(200).redirect('/products');
  }
  catch (err) {
    next(err);
  };
});

module.exports = router;