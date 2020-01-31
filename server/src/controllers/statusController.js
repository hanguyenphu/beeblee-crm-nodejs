const Status = require("../models/status");

//Create a new Status
exports.createStatus = async (req, res) => {
  const status = new Status(req.body);
  try {
    await status.save();
    res.status(201).send(status);
  } catch (e) {
    res.status(500).send("Cannot Create A Status");

  }
};

exports.updateStatus = async (req, res) => {
    const _id = req.params.id;
    try {
        const allowUpdates = ["title", "color"]
        const status = await Status.findById(_id)
        if(!status){
            res.status(400).send("Cannot Find the Status");
        }
        allowUpdates.forEach(update => {
            status[update] = req.body[update]
        })
        await status.save()
        res.status(201).send(status);
    } catch (error) {
        res.status(500).send("Cannot Update Status");
    }
};

//Get all statuses
exports.getAllStatus = async (req, res) => {
  try {
    const statuses = await Status.find({});
    res.send(statuses);
  } catch (err) {
    res.status(400).send();
  }
};
