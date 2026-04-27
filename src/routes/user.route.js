const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/appenid', authMiddleware.auth, userController.addAppeniD);
router.get('/me', authMiddleware.auth, userController.me);

module.exports = router;
