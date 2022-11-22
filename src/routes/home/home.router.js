const express = require('express');
const router = express.Router();
const Container = require('../../../classes/Container.class');

// get home page
router.get('/', (_req, res, next) => {
  try {
    res.render('pages/home');

  } catch (err) {
    next(err);
    
  };

});



module.exports = router;