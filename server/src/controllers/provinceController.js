
const Province = require("../models/province")

//Create a new Province
exports.createProvince = async (req, res) => {
    const province = new Province(req.body);
    try {
        await province.save();
        res.status(201).send(province);
    } catch (e) {
        res.status(400).send(e);
    }
}

//Get all provinces
exports.getAllProvinces  = async (req, res) => {
    try {
        const provinces = await Province.find({});
        res.send(provinces);
    } catch (err) {
        res.status(400).send();
    }
}

//Update a province
exports.updateProvince = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["name", "gst", "pst", "hst"];
    const isValidOperation = updates.every(update => {
        return allowUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send();
    }

    const _id = req.params.id;

    try {
        const province = await Province.findById(_id);

        if (!province) {
            return res.status(400).send();
        }

        updates.forEach(update => (province[update] = req.body[update]));
        await province.save();
        res.send(province);
    } catch (err) {
        res.status(500).send();
    }
}
//Delete a province
exports.deleteProvince = async (req, res) => {
    const _id = req.params.id;
    try {
        const province = await Province.findByIdAndDelete(_id)
        if(!province) {
            return res.status(400).send()
        }
        res.send(province)
    } catch (err) {
        res.status(500).send()
    }
}

// Get all businesses in a province with an id
exports.getAllBusinessInProvince = async (req, res) => {
    const _id = req.params.id;
    try {
        const province = await Province.findById(_id);
        if (!province) {
            return res.status(400).send();
        }

        await province.populate("businesses").execPopulate();

        res.send(province);
    } catch (err) {
        res.status(500).send();
    }
}