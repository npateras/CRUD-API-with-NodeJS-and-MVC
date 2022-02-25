const express = require('express');
const {
    getAllLandmarks,
    getAllLandmarksJson,
    getAddLandmarkView,
    addLandmark,
    getUpdateLandmarkView,
    updateLandmark,
    getDeleteLandmarkView,
    deleteLandmark
} = require('../controllers/landmarkController.js');

const router = express.Router();

router.get('/', getAllLandmarks);
router.get('/landmarks', getAllLandmarks);
router.get('/landmarksJson', getAllLandmarksJson);
router.get('/addLandmark', getAddLandmarkView);
router.post('/addLandmark', addLandmark);
router.get('/updateLandmark/:id', getUpdateLandmarkView);
router.post('/updateLandmark/:id', updateLandmark);
router.get('/deleteLandmark/:id', getDeleteLandmarkView);
router.post('/deleteLandmark/:id', deleteLandmark);


module.exports = {
    routes: router
}