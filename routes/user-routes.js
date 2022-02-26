const express = require('express');
const {
    getAllUsers,
    addUser,
    updateUserById,
    updateUserByEmail,
    getUserById,
    getUserByEmail,
    getUserNameByEmail,
    deleteUser
} = require('../controllers/userController.js');
const verifySignUp = require('../middleware/verifySignUp.js');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users/addUser', [verifySignUp.checkDuplicateEmail], addUser);
router.patch('/users/updateUserById/:id', updateUserById);
router.patch('/users/updateUserByEmail/:email', updateUserByEmail);
router.delete('/users/deleteUser/:id', deleteUser);
router.get('/users/getUserById/:id', getUserById);
router.get('/users/getUserByEmail/:email', getUserByEmail);
router.get('/users/getUserNameByEmail/:email', getUserNameByEmail);

module.exports = {
    routes: router
}