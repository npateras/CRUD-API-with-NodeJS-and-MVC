const express = require('express');
const {getAllLocations, getAddLocationView, addLocation,
        getUpdateLocationView, updateLocation, getDeleteLocationView, deleteLocation} = require('../controllers/locationController.js');


const router = express.Router();

router.get('/', getAllLocations);
router.get('/addLocation', getAddLocationView);
router.post('/addLocation', addLocation);
router.get('/updateLocation/:id', getUpdateLocationView);
router.post('/updateLocation/:id', updateLocation);
router.get('/deleteLocation/:id', getDeleteLocationView);
router.post('/deleteLocation/:id', deleteLocation);



module.exports = {
    routes: router
}