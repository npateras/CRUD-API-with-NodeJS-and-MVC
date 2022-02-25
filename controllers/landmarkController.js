const {Landmark, validate} = require('../models/Landmark');

const getAllLandmarks = async (req, res, next) => {
    const list = await Landmark.find().exec();
    res.status(200).render('../views/Landmarks/landmarksList', {
        landmarks: list
    });
}

const getAllLandmarksJson = async (req, res, next) => {
    const list = await Landmark.find().exec();
    res.status(200).json({
        status: "success",
        results: list.length,
        data: {
            list
        }
    })
}

const getAddLandmarkView = (req, res, next) => {
    res.render('../views/Landmarks/addLandmark');
}

const addLandmark = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let Landmark = await new Landmark({
        name: data.name,
        country: data.country
    });
    Landmark = await Landmark.save();
    res.redirect('/landmarks');
}

const getUpdateLandmarkView = async (req, res, next) => {

    try {
        const id = req.params.id;
        const oneLandmark = await Landmark.findById(id).exec();

        if (oneLandmark) {
            return res.status(200)
            .render('../views/Landmarks/updateLandmark', {
                landmark: oneLandmark
            })
            .send("Updated landmark with ID: " + id + ".");
        }
    } catch (error) {
        // return res.status(400).send(error.message);
    }
}

const updateLandmark = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let Landmark = await Landmark.findByIdAndUpdate(id, {
        name: data.name,
        country: data.country
    }, {new: true});
    if(!Landmark) return res.status(404).send('Landmark with the given ID not found');

    res.redirect('/');
}

const getDeleteLandmarkView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneLandmark = await Landmark.findById(id).exec();
        res.status(200)
        .render('../views/Landmarks/deleteLandmark', {
            Landmark: oneLandmark
        })
        .send("Deleted landmark with ID: " + id + ".");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLandmark = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Landmark = await Landmark.findByIdAndRemove(id);
        if (!Landmark) return res.status(404).send('Landmark with the given ID not found');
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLandmarkById = (req,res)=>{
    var id = req.params.id*1;
    var landmark = landmarks.find(element => element.id === id)
    if(!landmark){
      //if we do not put return here we will get error
      //Error : Cannot set headers after they are sent to the client
      // because the response will be sent but code will continue running
      //so it will send another response also that is not allowed
       return res.status(404).json({
            status:"fail",
            message: "Not Found"
        });
    }
    res.status(200).json({
        status:"success",
        data: {
            landmark
        }
    });

}


module.exports = {
    getAllLandmarks,
    getAllLandmarksJson,
    getAddLandmarkView,
    addLandmark,
    getUpdateLandmarkView,
    updateLandmark,
    getDeleteLandmarkView,
    deleteLandmark
}