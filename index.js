const express = require('express')
var cors = require('cors')
var cookieParser = require('cookie-parser')
const connectToMongo = require('./DB/db');
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000;

// Connect to database
connectToMongo();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// Define routes
app.use('/api/auth', require('./Routes/auth.routes'));
app.use('/api/notes', require('./Routes/notes.routes'));

// Home route
app.use('/', require('./Routes/home.routes'));

// Listen on port
app.listen(port, () => {
  console.log(`WriteIt app listening at http://localhost:${port}`)
})
