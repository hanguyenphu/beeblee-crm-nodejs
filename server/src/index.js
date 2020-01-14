const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const provinceRouter = require('./routers/province')
const businessRouter = require('./routers/business')
const contactRouter = require('./routers/contact')


const app = express() 
const port = process.env.PORT || 3000

app.use(express.json())
app.use(function(req, res, next) {
  
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPSTIONS");
    next();
  });

app.use(userRouter)
app.use(provinceRouter)
app.use(businessRouter)
app.use(contactRouter)
// const myFunction =  async (phone) => {
//     const validator = require('validator')
//     try {
//         const isPhoneNumber =  await validator.isMobilePhone(phone)

//         console.log(isPhoneNumber)
//     } catch (e) {
//         console.log(e)
//     }
 
   
// }

// myFunction('204 558 4030')


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})