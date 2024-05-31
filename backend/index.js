const express = require('express')
const connectToMongo=require('./db')
const cors=require('cors')
const app = express()

connectToMongo()
require('dotenv').config()
app.use(express.json())
app.use(cors());

app.use('/api/auth', require('./routes/user'))

app.use('/api/notes',require('./routes/notes'))


// listening to the port 
const port = 5000;
app.listen(port, () => {
    console.log(`App started at port ${port},open at http://localhost:${port}`)
})