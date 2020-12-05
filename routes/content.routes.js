const router = require('express').Router();
const { showAllProducts } = require('../contoller/content.controller');

router.get('/', showAllProducts);

module.exports = router;
