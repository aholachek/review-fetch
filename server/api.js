const Router = require("express").Router

const Api = Router()

Api.get("/", function(req, res, next) {
  if (req.query.search_term) {
    return res.json({
      good_job: `You successfully submitted a request for data about ${
        req.query.search_term
      }`,
      page: parseInt(req.query.page, 10)
    })
  }
  return res.json({ good_job: "GET request works!" })
})

Api.get("/network-error", function(req, res, next) {})

Api.get("/error", function(req, res, next) {
  return res
    .status(500)
    .send({ error: "This endpoint always triggers a 500 error" })
})

Api.post("/", function(req, res, next) {
  return res.json({ good_job: "POST request works!" })
})

Api.post("/snack/json", function(req, res, next) {
  if (!req.headers["content-type"].match("application/json")) {
    return res
      .status(500)
      .send({ message: "Wrong data format, expected application/json" })
  }
  if (!req.body.user || !req.body.favorite_snack) {
    return res.status(500).send({ message: "No data submitted!" })
  }
  return res.json({
    good_job: `${req.body.user}'s favorite snack has been recorded as ${
      req.body.favorite_snack
    }`
  })
})

Api.post("/snack/form", function(req, res, next) {
  if (!req.headers["content-type"].match("application/x-www-form-urlencoded")) {
    return res
      .status(500)
      .send({ message: "Wrong data format, expected x-www-form-urlencoded" })
  }
  if (!req.body.user || !req.body.favorite_snack) {
    return res.status(500).send({ message: "No data submitted!" })
  }
  return res.json({
    good_job: `${req.body.user}'s favorite snack has been recorded as ${
      req.body.favorite_snack
    }`
  })
})

// Api.get("/", function(req, res, next) {
//   return res.json({ good_job: "get request works!" })
// })

module.exports = Api
