const expresss = require('express')
const helmet = require('helmet')
const morgan = require('morgan');
const app = expresss()
const users = require('./routes/users')
const gifts = require('./routes/gifts')
const questions = require('./routes/questions')
const auth = require('./routes/auth')
const connectDB = require('./database/connect')
require('dotenv').config()
const cors = require('cors');
const port = 5000

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// middleware
app.use(expresss.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)
app.use('/api/v1/gifts', gifts)
app.use('/api/v1/questions', questions)

app.get('/', (req,res)=>{
    res.json({"name": "test"})
})

const startDB = async () => {
    try {
        await connectDB(process.env.MONGO_DB_LINK)
        app.listen(port, ()=>{
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startDB()