const expresss = require('express')
const app = expresss()
const users = require('./routes/users')
const gifts = require('./routes/gifts')
const connectDB = require('./database/connect')
require('dotenv').config()
const port = 5000

// middleware
app.use(expresss.json())
app.use('/api/v1/users', users)
app.use('/api/v1/gifts', gifts)

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