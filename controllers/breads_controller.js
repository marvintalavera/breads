const express = require('express')
const bread_router = express.Router()
// "breads" = bread_router
const bread_data = require('../models/bread.js')
// "bread" = bread_data
// INDEX
bread_router.get('/', (req, res) => {
  res.render('index', {
    "breads": bread_data,
    "title": "Index Page"
  })
})
// res.send(bread_data)
module.exports = bread_router

// SHOW
bread_router.get('/:arrayIndex', (req, res) => {
  if (bread_data[req.params.arrayIndex]) {
    res.render('Show', {
      bread:bread_data[req.params.arrayIndex]
    })
  } else {
    res.send('404')
  }
})
