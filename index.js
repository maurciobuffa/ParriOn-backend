const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

const app = express()

dbConnection()

app.use(cors())

// Directorio Publico
app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`)
})
