const express = require('express')

const router = express.Router()
const collegecontroller = require("../controllers/collegecontroller")

router.get('/', collegecontroller.getAllColleges)
router.get('/:id', collegecontroller.getCollegeById)
router.post('/', collegecontroller.createCollege)
router.put('/:id', collegecontroller.updateCollege)
router.delete('/:id', collegecontroller.deleteCollege);

module.exports = router