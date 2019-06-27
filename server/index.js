const Bundler = require("parcel-bundler")
const express = require("express")
const apiRouter = require("./api")

let bundler = new Bundler("mocha/testrunner.html")
let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api", apiRouter)

app.use(bundler.middleware())

const server = app.listen(Number(process.env.PORT || 4321))
server.setTimeout(100)
