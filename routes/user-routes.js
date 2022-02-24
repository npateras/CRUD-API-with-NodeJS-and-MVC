const express = require('express');
const {
    getAllUsers,
    getAddUserView,
    addUser,
    getUpdateUserView,
    updateUser,
    getDeleteUserView,
    deleteUser
} = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/addUser', getAddUserView);
router.post('/users/addUser', addUser);
router.get('/users/updateUser/:id', getUpdateUserView);
router.post('/users/updateUser/:id', updateUser);
router.get('/users/deleteUser/:id', getDeleteUserView);
router.post('/users/deleteUser/:id', deleteUser);


module.exports = {
    routes: router
}