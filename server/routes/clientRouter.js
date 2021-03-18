import express from "express"

const router = new express.Router()

const clientRoutes = ["/cats", "/cats/new", "/cats/:id"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
