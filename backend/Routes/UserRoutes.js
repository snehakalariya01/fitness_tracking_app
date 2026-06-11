const express = require('express');
const router = express.Router();
const { addUser ,getUser,updateUser,deleteUser} = require('../Controllers/UserControllers');

router.post('/', addUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;