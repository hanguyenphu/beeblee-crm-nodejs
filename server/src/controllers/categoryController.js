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
        const categories = await Category.find({}).sort({order: 1});
        res.send(categories);
    } catch (err) {
        res.status(400).send();
    }
}

//Update Category
exports.updateCategory = async (req, res) => {
    const _id = req.params.id;
    try {
        const allowUpdates = ["title", "description", "order", "active"]
        const category = await Category.findById(_id)
        if(!category){
            res.status(400).send("Cannot Find the Category");
        }
        allowUpdates.forEach(update => {
            category[update] = req.body[update]
        })
        await category.save()
        res.status(201).send(category);
    } catch (error) {
        res.status(500).send("Cannot Update Category");
    }
};
