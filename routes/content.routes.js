const router = require('express').Router();
const {
    showAllProducts, addNewProduct, promoteProduct, cancelPromotion, addQuantity, deleteProduct
} = require('../contoller/content.controller');
const checkIsAdmin = require('../middleware/checkIsAdmin.middleware');

router.get('/', showAllProducts);
router.post('/addNewProduct', checkIsAdmin, addNewProduct);
router.patch('/promoteProduct', checkIsAdmin, promoteProduct);
router.patch('/cancelPromotion', checkIsAdmin, cancelPromotion);
router.patch('/addQuantity', checkIsAdmin, addQuantity);
router.delete('/deleteProduct', checkIsAdmin, deleteProduct);

module.exports = router;
