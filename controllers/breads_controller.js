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

// NEW
bread_router.get('/new', (req, res) => {
  res.render('new')
})

// SHOW
bread_router.get('/:arrayIndex', (req, res) => {
  if (bread_data[req.params.arrayIndex]) {
    res.render('Show', {
      bread:bread_data[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.render('404')
  }
})

// CREATE
bread_router.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread_data.push(req.body)
  res.redirect('/breads')
})

// DELETE
bread_router.delete('/:indexArray', (req, res) => {
  bread_data.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})


// res.send(bread_data)
module.exports = bread_router
