const Contact = require("../models/contacts");
const Business = require("../models/business");
//Create a new Contact
//required business object sent from client and a new contact
exports.createContactForBusiness = async (req, res) => {
    try {
        //When find a duplicated contact return it to client
        if (req.duplicated) {
            let contact = req.contact;
            return res.send({ contact, duplicated: true });
        }
        //else create a new contact and add it to the business
        let contact = new Contact(req.body);

        await contact.save();

        if (req.body.business) {
            const businessId = req.body.business;
            const business = await Business.findById(businessId);
            if (!business) {
                return res
                    .status(400)
                    .send("Cannot find the business for the contact");
            }
            await business.addContact(contact._id);
        }
        res.status(200).send({ contact, duplicated: false });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getContact = async (req, res) => {
    const id = req.params.id
    try {
      
        const contact = await Contact.findById(id)
        if(!contact) {
            return res.status(400).sned('Cannot find the contact')
        } 
        await contact.populate("businesses").execPopulate();
        res.status(200).send(contact)

    } catch (error) {
        res.status(500).send(error);
    }
}



//Get all businesses under a contact
exports.getAllBusinessUnderContact = async (req, res) => {
    const _id = req.params.id;
    try {
        const contact = await Contact.findById(_id);
        if (!contact) {
            return res.status(400).send();
        }
        await contact.populate("businesses").execPopulate();
        const businesses = contact.businesses;

        res.send({ contact, businesses });
    } catch (err) {
        res.status(500).send();
    }
};

//Update a contact
exports.updateContact = async (req, res) => {
   
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "phone", "_id"];
 
    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    const _id = req.params.id;
    try {
        const contact = await Contact.findById(_id);
        if (!contact) {
            return res.status(400).send();
        }
        updates.forEach(update => (contact[update] = req.body[update]));
        await contact.save();
        res.send(contact);
    } catch (err) {
        res.status.status(500).send();
    }
};
