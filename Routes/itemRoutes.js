const express = require('express');
const {
  getItems,
  getItemById,
  getUserItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const { protect } = require('../Middleware/authMiddleware'); 

const router = express.Router();


router.get('/', getItems);


router.get('/my', protect, getUserItems);


router.get('/:id', getItemById);


router.post('/',     protect, createItem);
router.put('/:id',   protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;

