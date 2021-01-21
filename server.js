const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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
app.use(morgan('dev'))
app.use(bodyParser.json())
//app.use(cors()) //allows all origins
// if(process.env.NODE_ENV == 'development'){
//     app.use(cors({origin:process.env.CLIENT_URL}))
// }

//middleware
app.use('/api',routes)


const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})
