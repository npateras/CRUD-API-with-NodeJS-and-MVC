const express = require('express');
const {
    getAllLandmarks,
    getLandmarkById,
    getLandmarkByName,
    addLandmark,
    updateLandmarkById,
    updateLandmarkByName,
    deleteLandmark
} = require('../controllers/landmarkController.js');

const router = express.Router();

router.get('/landmarks', getAllLandmarks);
router.post('/landmarks/addLandmark', addLandmark);
router.post('/landmarks/updateLandmarkById/:id', updateLandmarkById);
router.post('/landmarks/updateLandmarkByName/:id', updateLandmarkByName);
router.post('/landmarks/deleteLandmark/:id', deleteLandmark);
router.get('/landmarks/getLandmarkById/:id', getLandmarkById);
router.get('/landmarks/getLandmarkByName/:name', getLandmarkByName);

module.exports = {
    routes: router
}