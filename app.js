const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()
const api = require('./routes');


app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', api);


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


