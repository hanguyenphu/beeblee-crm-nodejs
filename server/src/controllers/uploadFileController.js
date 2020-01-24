const uploadImage = require("../../../helpers/helpers");
const Project = require("../models/project");
const Upload = require("../models/upload")

exports.uploadFile = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId)
    if(!project) {
        return res.status(400).send()
    }
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    var upload = new Upload({
        title: req.body.title,
        description: req.body.description,
        project: projectId
    })
    upload.url = imageUrl

    await upload.save()

    res.status(200).send(upload)

    // res.status(200).json({
    //   message: "Upload was successful",
    //   data: imageUrl
    // });
  } catch (error) {
    next(error);
  }
};

exports.getAllUploads = async (req, res) => {
    const projectId = req.params.id
    try {
        const uploads = await Upload.find({project: projectId}).sort({ updatedAt: -1 })
        res.status(200).send(uploads)
    } catch (error) {
        return res.status(500).send()
    }
}
