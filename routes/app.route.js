const express = require('express')
const router = express.Router()
const Response = require('../helpers/response.helper')

router.get('/ping', async (req, res, next) => {
  const result = Response.formattedContent(true, 'pong')
  res.status(200).json(result)
})

module.exports = router
