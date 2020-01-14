const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/crm-beeblee-api', {
    useNewUrlParser:  true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify:false
})
