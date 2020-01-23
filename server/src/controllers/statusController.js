const Status = require("../models/status")

//Create a new Status
exports.createStatus = async (req, res) => {
    const status = new Status(req.body);
    try {
        await status.save();
        res.status(201).send(status);
    } catch (e) {
        res.status(400).send(e);
    }
}


//Get all statuses
exports.getAllStatus  = async (req, res) => {
    try {
        const statuses = await Status.find({});
        res.send(statuses);
    } catch (err) {
        res.status(400).send();
    }
}

