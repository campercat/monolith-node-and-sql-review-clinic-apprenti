import express from "express"
import catsRouter from "./api/v1/catsRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/cats", catsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
