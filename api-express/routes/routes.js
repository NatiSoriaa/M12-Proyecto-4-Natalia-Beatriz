const express = require('express');
const userHistory = require('../controllers/userHistory.js');
const user = require('../controllers/user.js');
const { jwtAuth, generateToken } = require('../mw/auth.js'); 

const router = express.Router();

// routes to manage users

router.post('/api/login',generateToken, user.login)
router.post('/api/register',user.createUser);
router.get('/api/users', user.getUsers )

// routes to manage the user history

router.get('/api/userHistory',userHistory.getHistory);
router.post('/api/userHistory', jwtAuth, userHistory.createItem);
router.put('/api/userHistory/:id', jwtAuth, userHistory.updateItem);
router.delete('/api/userHistory/:id', jwtAuth, userHistory.deleteItem);

module.exports = router;