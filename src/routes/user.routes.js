const express = require('express');
const auth = require('../middleware/authorization');
const { registerUser, loginUser, verifyUser, updateUserById } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify-user', auth, verifyUser);
userRouter.put('/update-user', auth, updateUserById);

module.exports = userRouter;
