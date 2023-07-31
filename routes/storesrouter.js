const express = require('express')
const router = express.Router()

const storecontroller = require('../controllers/storecontroller');
// const { route } = require('./usersrouter');

router.get('/', storecontroller.getAllStores);
router.get('/:id', storecontroller.getStoreById);
router.get('/name/:name', storecontroller.getStoreByName)
router.post('/', storecontroller.createStore);
router.put('/:id', storecontroller.updateStore);
router.delete('/:id', storecontroller.deleteStore);

module.exports = router