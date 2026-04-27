const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/appenid', authMiddleware.auth, userController.addAppeniD);
router.get('/me', authMiddleware.auth, userController.me);

module.exports = router;
