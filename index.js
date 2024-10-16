const express = require('express')
const connectToMongo = require('./db');
const app = express()
const port = 5000

// Connect to database
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
