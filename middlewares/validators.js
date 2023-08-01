const express = require("express");
const logger = require("../helper/logger");
logger.level = "info";

exports.validateUser = (req, res, next) => {
  const { firstname, email, password, phone } = req.body;

  if (!firstname) {
    logger.error(`User's firstname is required`);
    return res
      .status(400)
      .json({ errormessage: `User's firstname is required` });
  }
  if (!email) {
    logger.error(`User's email is required`);
    return res.status(400).json({ errormessage: `User's email is required` });
  }
  if (!password) {
    logger.error(`Password is a mandatory field`);
    return res
      .status(400)
      .json({ errormessage: `Password is a mandatory field` });
  }
  if (!phone) {
    logger.error(`User's phone no is required`);
    return res
      .status(400)
      .json({ errormessage: `User's phone no is required` });
  }

  next();
};

exports.validateStore = (req, res, next) => {
  const { name, address, phone } = req.body;

  if (!name) {
    logger.error(`Store's name is required`);
    return res.status(400).json({ errormessage: `Store's name is required` });
  }
  if (!address) {
    logger.error(`Store's address is required`);
    return res
      .status(400)
      .json({ errormessage: `Store's address is required` });
  }

  if (!phone) {
    logger.error(`Store's phone no is required`);
    return res
      .status(400)
      .json({ errormessage: `Store's phone no is required` });
  }

  next();
};

exports.validateCollege = (req, res, next) => {
  const { name, address, courses } = req.body;

  if (!name) {
    logger.error(`Colleges's name is required`);
    return res
      .status(400)
      .json({ errormessage: `Colleges's name is required` });
  }
  if (!address) {
    logger.error(`College's address is required`);
    return res
      .status(400)
      .json({ errormessage: `College's address is required` });
  }
  if (!courses) {
    logger.error(`Courses are required`);
    return res.status(400).json({ errormessage: `Courses are required` });
  }
  if (!Array.isArray(courses)) {
    return res.status(400).json({ errormessage: "Items field must be an array."});
  }
  if (courses.length === 0) {
    return res.status(400).json({ errormessage:"Items array must have at least one element."});
  }
  for (const course of courses) {
    if (typeof course !== "string") {
      return res
        .status(400)
        .json({ errormessage: `All courses must be strings.` });
    }
  }

  next();
};
