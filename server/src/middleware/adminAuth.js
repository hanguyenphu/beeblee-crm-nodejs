const jwt = require('jsonwebtoken')
const User = require('../models/user')
const adminAuth = async( req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'crmbeeblee')

        const user = await User.findOne({ _id: decoded._id,  'tokens.token': token })

        if(!user || user.role !== "admin") {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }
    catch (error) {
        res.status(400).send({ error: 'Please authenticate'})
    }
}

module.exports = adminAuth

