const express = require('express')

const router = express.Router()
const collegecontroller = require("../controllers/collegecontroller")
const validator = require('../middlewares/validators')

router.get('/', collegecontroller.getAllColleges)
router.get('/:id', collegecontroller.getCollegeById)
router.post('/', validator.validateCollege, collegecontroller.createCollege)
router.put('/:id', collegecontroller.updateCollege)
router.delete('/:id', collegecontroller.deleteCollege);

module.exports = router