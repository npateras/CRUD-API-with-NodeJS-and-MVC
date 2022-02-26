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
router.patch('/landmarks/updateLandmarkById/:id', updateLandmarkById);
router.patch('/landmarks/updateLandmarkByName/:name', updateLandmarkByName);
router.delete('/landmarks/deleteLandmark/:id', deleteLandmark);
router.get('/landmarks/getLandmarkById/:id', getLandmarkById);
router.get('/landmarks/getLandmarkByName/:name', getLandmarkByName);

module.exports = {
    routes: router
}