const express = require('express');
const auth = require('../middleware/authorization');
const { registerUser, loginUser, verifyUser, updateUserById, deleteUserById, getUsers } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify-user', auth, verifyUser);
userRouter.put('/update-user', auth, updateUserById);
userRouter.delete('/delete-user', auth, deleteUserById);
userRouter.get('/get-users', auth, getUsers);

module.exports = userRouter;
