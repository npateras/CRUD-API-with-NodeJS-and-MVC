const {User, validate} = require('../models/User');

const getAllUsers = async (req, res, next) => {
    const list = await User.find().exec();
    res.render('../views/Account/Users', {
        users: list
    });
}

const getAddUserView = (req, res, next) => {
    res.render('../views/Account/addUser');
}

const addUser = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let User = await new User({
        name: data.name,
        country: data.country
    });
    User = await User.save();
    res.redirect('/');
}

const getUpdateUserView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneUser = await User.findById(id).exec();
        res.status(200)
        .render('../views/Account/updateUser', {
            User: oneUser
        })
        .send("Updated User with ID: " + id + ".");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let User = await User.findByIdAndUpdate(id, {
        name: data.name,
        country: data.country
    }, {new: true});
    if(!User) return res.status(404).send('User with the given ID not found');

    res.redirect('/');
}

const getDeleteUserView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneUser = await User.findById(id).exec();
        res.status(200).render('../views/Account/deleteUser', {
            User: oneUser
        })
        .send("Deleted User with ID: " + id + ".");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const User = await User.findByIdAndRemove(id);
        if (!User) return res.status(404).send('User with the given ID not found');
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllUsers,
    getAddUserView,
    addUser,
    getUpdateUserView,
    updateUser,
    getDeleteUserView,
    deleteUser
}