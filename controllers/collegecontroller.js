const College = require("../models/college");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require('../helper/logger');
logger.level = "info"

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.getAllColleges =
  ("/colleges",
  (req, res) => {
    College.find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: err.errorMessage });
      });
  });

exports.getCollegeById =
  ("/college/:id",
  (req, res) => {
    College.findById(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: err.errorMessage });
      });
  });

exports.createCollege =
  ("/college",
  (req, res) => {
    const newCollege = new College(req.body);
    newCollege
      .save()
      .then((result) => {
        res.status(201).json({ result });
      })
      .catch((err) => {
        res.status(500).json(result);
      });
  });

exports.updateCollege =
  ("/college/:id",
  (req, res) => {
    College.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ updatedCollege: result });
      });
  });

exports.deleteCollege =
  ("/college/:id",
  (req, res) => {
    College.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.status(204).json(result);
      })
      .catch((err) => {
        res.status(500).send({ deletedCollege: result });
      });
  });
