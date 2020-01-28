const Business = require("../models/business");

exports.createBusiness = async (req, res) => {
  const business = new Business(req.body);
  try {
    await business.save();
    res.status(200).send(business);
  } catch (err) {
    res.status(400).send();
  }
};

//Get all businesses with pagination
exports.getAllBusinesses = async (req, res) => {
  try {
    var pageNo = parseInt(req.query.pageNo);
    var size = 5;
    var query = {};

    if (pageNo < 0 || pageNo === 0) {
      response = {
        error: true,
        message: "invalid page number, should start with 1"
      };
      return res.json(response);
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    var count = await Business.countDocuments({}, function(err, count) {
      return count;
    });

    const businesses = await Business.find({}, {}, query).sort({
      updatedAt: -1
    });
    res.send({ businesses, count });
  } catch (err) {
    res.status(500).send();
  }
};

exports.addContactToBusiness = async (req, res) => {
  try {
    const contactId = req.body._id;
    const businessId = req.params.id;
    const business = await Business.findById(businessId);

    if (!business.contacts.includes(contactId)) {
      await business.addContact(contactId);
    }

    res.status(200).send(business);
  } catch (error) {
    res.status(500).send();
  }
};

exports.removeContactFromBusiness = async (req, res) => {
  try {
    const _id = req.params.id;
    const business = await Business.findById(_id);
    const contactId = req.body.contactId;
    if (!business) {
      return res.status(400).send("Cannot find the business");
    }

    if (business.contacts.includes(contactId)) {
      business.contacts = business.contacts.filter(contact => {
        return contact != contactId;
      });
      await business.save();
    }

    res.status(200).send(business);
  } catch (error) {
    res.status(500).send();
  }
};

exports.updateBusiness = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "address", "phone", "province"];

  const isValidOperation = updates.every(update => {
    return allowUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send();
  }

  try {
    const business = await Business.findById(_id);

    if (!business) {
      return res.status(400).send();
    }
    updates.forEach(update => (business[update] = req.body[update]));
    await business.save();
    res.send(business);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.searchBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({})
    res.send(businesses)
  } catch (error) {
    res.status(400).send();
  }
};

exports.getBusinessDetail = async (req, res) => {
  const _id = req.params.id;
  try {
    const business = await Business.findById({ _id });

    if (!business) {
      return res.status(400).send();
    }
    await business.populate("contacts").execPopulate();
    await business.populate("province").execPopulate();
    await business.populate("projects").execPopulate();


    res.send({ business });
  } catch (err) {
    res.status(400).send();
  }
};
