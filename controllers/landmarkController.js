const {Landmark, validate} = require('../models/Landmark');
const mongoose = require('mongoose');

const getAllLandmarks = async (req, res, next) => {
    const list = await Landmark.find().exec();
    return res.status(200).json({
        status: "success",
        results: list.length,
        data: {
            list
        }
    })
}

const addLandmark = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;

    let landmark = await new Landmark({
        name: data.name,
        country: data.country
    });
    landmark = await landmark.save();

    return res.status(200).json({
        status:"success",
        message: "Landmark added successfully!",
        data: {
            landmark
        }
    });
}

const updateLandmarkById = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const id = req.params.id;
    const data = req.body;
    let landmark = await Landmark.findByIdAndUpdate(id, {
        name: data.name,
        country: data.country
    }, {new: true});

    if (!landmark) return res.status(404).send('Landmark with the given ID not found');
    else
    return res.status(200).json({
        status:"success",
        message: "Landmark with ID " + id + " was updated successfully!",
        data: {
            landmark
        }
    });
}

const updateLandmarkByName = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const name = req.params.name;
    const data = req.body;
    let landmark = await Landmark.updateOne({name: name}, {
        name: data.name,
        country: data.country
    }, {new: true});

    if (!landmark) return res.status(404).send("Landmark with the name " + name + " not found");
    else
    return res.status(200).json({
        status:"success",
        message: "Landmark with the name " + name + " was updated successfully!",
        data: {
            landmark
        }
    });
}

const deleteLandmark = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Landmark = await Landmark.findByIdAndRemove(id);
        if (!Landmark) return res.status(404).send('Landmark with the given ID not found');
        else
            return res.status(200).json({
                status:"success",
                message: "Landmark with ID " + id + " was deleted successfully!"
            });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getLandmarkById = async (req, res, next)=>{
    const id = req.params.id;

    const landmark = await Landmark.findById(id);

    if (!landmark) {
        //if we do not put return here we will get error
        //Error : Cannot set headers after they are sent to the client
        // because the response will be sent but code will continue running
        //so it will send another response also that is not allowed
        return res.status(404).json({
            status:"fail",
            message: "Not Found"
        });
    }

    return res.status(200).json({
        status:"success",
        data: {
            landmark
        }
    });
}

const getLandmarkByName = async (req, res, next) => {
    const name = req.params.name;
    // If we have multiple landmarks with the same name.
    // const landmark = await Landmark.find({name: name});
    const landmark = await Landmark.findOne({name: name});

    if (!landmark) {
        return res.status(404).json({
            status:"fail",
            message: "No landmark found with the name " + name + "."
         });
    }

    return res.status(200).json({
        status:"success",
        data: {
            landmark
        }
    });
}


module.exports = {
    getAllLandmarks,
    addLandmark,
    updateLandmarkById,
    updateLandmarkByName,
    deleteLandmark,
    getLandmarkById,
    getLandmarkByName
}