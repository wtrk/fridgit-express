const express = require('express')
const cron = require('node-cron');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const axios = require('axios')
require('dotenv').config()

const app= express()

//connect to database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(()=> console.log("DB connected"))
.catch((err)=> console.log("DB error:".err))
//import routes
const routes = require('./routes/routes')

//app middleware
app.use(express.static('public'));
app.use(fileUpload());
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors()) //allows all origins
// if(process.env.NODE_ENV == 'development'){
//     app.use(cors({origin:process.env.CLIENT_URL}))
// }
app.use(function(req, res, next) {
    // Disable caching for content files
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

//middleware
app.use('/api',routes)

// Schedule tasks to be run on the server.
if(process.env.NODE_ENV!="development"){
cron.schedule('* * * * *', function() {
    axios(`${process.env.CLIENT_URL}/api/cron`).then(function (response) {
        console.log(response.data)
      });
});
}


const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})
