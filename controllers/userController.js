const {User, validate} = require('../models/User');
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
    const list = await User.find().exec();
    return res.status(200).json({
        status: "success",
        results: list.length,
        data: {
            list
        }
    })
}

const addUser = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    const data = req.body;

    // Password Hashing for the new user
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            data.password = hash;
        })
    );

    let User = await new User({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
    });
    User = await User.save();

    return res.status(200).json({
        status:"success",
        message: "User added successfully!",
        data: {
            User
        }
    });
}

const updateUserById = async (req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const id = req.params.id;
    const data = req.body;

    // Password Hashing for the new password
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            data.password = hash;
        })
    );

    let User = await User.findByIdAndUpdate(id, {
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password
    }, {new: true});

    if (!User) return res.status(404).send('User with the given ID not found');
    else
    return res.status(200).json({
        status:"success",
        message: "User with the given ID was updated successfully!",
        data: {
            User
        }
    });
}

const updateUserByEmail = async (req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const email = req.params.email;
    const data = req.body;

    // Password Hashing for the new password
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            data.password = hash;
        })
    );

    let User = await User.update({email: email}, {
        first_name: data.first_name,
        last_name: data.first_name,
        password: data.password
    }, {new: true});

    if (!User) return res.status(404).send("User with the email " + email + " not found");
    else
    return res.status(200).json({
        status:"success",
        message: "User with the email " + email + " was updated successfully!",
        data: {
            User
        }
    });
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const User = await User.findByIdAndRemove(id);
        if (!User) return res.status(404).send('User with the given ID not found');
        else
            return res.status(200).json({
                status:"success",
                message: "User with ID " + id + " was deleted successfully!"
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserById = async (req, res, next)=>{
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        //if we do not put return here we will get error
        //Error : Cannot set headers after they are sent to the client
        // because the response will be sent but code will continue running
        //so it will send another response also that is not allowed
        return res.status(404).json({
            status:"fail",
            message: "User Not Found"
        });
    }

    return res.status(200).json({
        status:"success",
        data: {
            user
        }
    });
}

const getUserByEmail = async (req, res, next) => {
    const email = req.params.email;
    const user = await User.findOne({email: email});

    if (!user) {
        return res.status(404).json({
            status:"fail",
            message: "No user found with the email " + email + "."
         });
    }

    return res.status(200).json({
        status:"success",
        data: {
            user
        }
    });
}

const getUserNameByEmail = async (req, res, next) => {
    const email = req.params.email;
    const user = await User.findOne({email: email});

    if (!user) {
        return res.status(404).json({
            status:"fail",
            message: "No user found with the email " + email + "."
         });
    }

    return res.status(200).json({
        status:"success",
        data: {
            first_name: user.first_name,
            last_name: user.last_name
        }
    });
}


module.exports = {
    getAllUsers,
    addUser,
    updateUserById,
    updateUserByEmail,
    deleteUser,
    getUserById,
    getUserByEmail,
    getUserNameByEmail
}