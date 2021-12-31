
const express = require('express')
const router = express.Router()

router.use('/posts', require('./posts'))
router.use('/tasks', require('./tasks'))

module.exports = router