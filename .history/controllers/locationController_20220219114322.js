const {Location, validate} = require('../models/Location');

const getAllLocations = async (req, res, next) => {
    const list = await Location.find().exec();
    res.render('Locationlist', {
        Locations: list
    });
}

const getAddLocationView = (req, res, next) => {
    res.render('addLocation');
}

const addLocation = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let Location = await new Location({
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        cnic: data.cnic,
        address: data.address
    });
    Location = await Location.save();
    res.redirect('/');
}

const getUpdateLocationView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneLocation = await Location.findById(id).exec();
        res.render('updateLocation', {
            Location: oneLocation
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateLocation = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let Location = await Location.findByIdAndUpdate(id, {
        name: data.mame,
        country: data.country
    }, {new: true});
    if(!Location) return res.status(404).send('Location with the given ID not found');

    res.redirect('/');
}

const getDeleteLocationView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneLocation = await Location.findById(id).exec();
        res.render('deleteLocation', {
            Location: oneLocation
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLocation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Location = await Location.findByIdAndRemove(id);
        if(!Location) return res.status(404).send('Location with the given ID not found');
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllLocations,
    getAddLocationView,
    addLocation,
    getUpdateLocationView,
    updateLocation,
    getDeleteLocationView,
    deleteLocation
}