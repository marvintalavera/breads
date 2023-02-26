const express = require('express')
const bread_data = require('../models/bread.js')
const bread_router = express.Router()
const Baker = require('../models/baker.js')
// "breads" = bread_router
// "bread" = bread_data
// INDEX
bread_router.get('/', (req, res) => {
  bread_data.find()
      .then(foundBread_data => {
          res.render('index', {
              breads: foundBread_data,
              title: 'Index Page'
          })
      })
})

// in the new route
bread_router.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})


// EDIT
bread_router.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        bread_data.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

// SHOW
bread_router.get('/:id', (req, res) => {
  bread_data.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
      })
})

// CREATE
bread_router.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread_data.create(req.body)
  res.redirect('/breads')
})

// DELETE
bread_router.delete('/:id', (req, res) => {
  bread_data.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

// UPDATE
bread_router.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread_data.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


// res.send(bread_data)
module.exports = bread_router
