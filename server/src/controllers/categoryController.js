const Category = require("../models/category")

//Create a new Status
exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send(category);
    } catch (e) {
        res.status(400).send(e);
    }
}


//Get all statuses
exports.getAllCategories  = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (err) {
        res.status(400).send();
    }
}

