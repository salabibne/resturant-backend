const { queryResult } = require('../controllers/queryController')

const router = require('express').Router()

router.route('/:q?').get(queryResult)

module.exports = router