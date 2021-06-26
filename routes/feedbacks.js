const fs = require('fs')

const path = require('path')


const express = require("express")

const router = express.Router()

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()
dbc.useCollection("db.json")

router.get("/", (req, res) => {
  dbc.getAll(
    records => res.render("all_feedbacks", { feedbacks: records }),
    () => res.render("all_feedbacks", { feedbacks: null })
  )
})

router.get("/create-feedback", (req, res) => {
  res.render("create_feedback", {})
});

router.post("/create-feedback", (req, res) => {
  if (v.isValid(req.body)) {
    dbc.saveOne(req.body, () => res.render("create_feedback", { success: true }))
  } else {
    res.render("create_feedback", { error: true, success: false })
  }
})

router.get('/:id/delete', (req, res) => {
  dbc.deleteOne(
    req.params.id, 
    () => res.redirect('/feedbacks')),
    () => res.sendStatus(500)
})



router.get("/:id", (req, res) => {
  dbc.getOne(
    req.params.id,
    record => res.render("feedback_detail", { feedback: record }),
    () => res.sendStatus(404)
  )
})

module.exports = router;

