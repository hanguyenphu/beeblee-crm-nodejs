const Contact = require('../models/contacts')

//Check for a dublicated contact 
//send duplicated: boolean and the contact back
const checkDublicatedContact = async(req, res, next) => {
    try {
        const phone = req.body.phone
        const contact = await Contact.findOne({'phone': phone})
        if(contact) {
            req.duplicated = true
            req.contact = contact
        } else {
            req.duplicated = false
        }

        next()

    } catch (err) {
        res.status(400).send()
    }
}

module.exports = checkDublicatedContact