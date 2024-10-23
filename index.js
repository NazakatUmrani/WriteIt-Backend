const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db');
const app = express()
const port = 5000

// Connect to database
connectToMongo();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Home route
app.use('/', require('./routes/home'));

// Listen on port
app.listen(port, () => {
  console.log(`WriteIt app listening at http://localhost:${port}`)
})
