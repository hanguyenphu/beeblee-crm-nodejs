const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const provinceRouter = require("./routers/province");
const businessRouter = require("./routers/business");
const contactRouter = require("./routers/contact");
const statusRouter = require("./routers/status");
const categoryRouter = require("./routers/category");
const projectRouter = require("./routers/project");
const accountRouter = require("./routers/account");
const uploadRouter = require("./routers/upload")
const adminUserRouter = require("./routers/admin/user")

//file upload 2 lines below
 const bodyParser = require("body-parser");
 const multer = require("multer");
//  const uploadImage = require('../../helpers/helpers')

//end file upload

const app = express();
const port = process.env.PORT ;

//continue file upload
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



// app.post('/uploads', async (req, res, next) => {
//   try {
//     const myFile = req.file
//     const imageUrl = await uploadImage(myFile)
//     res
//       .status(200)
//       .json({
//         message: "Upload was successful",
//         data: imageUrl
//       })
//   } catch (error) {
//     next(error)
//   }
// })
//end file upload


app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPSTIONS"
  );
  next();
});

app.use(uploadRouter);
app.use(userRouter);
app.use(provinceRouter);
app.use(businessRouter);
app.use(contactRouter);
app.use(statusRouter);
app.use(categoryRouter);
app.use(projectRouter);
app.use(accountRouter);
app.use(adminUserRouter)

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
