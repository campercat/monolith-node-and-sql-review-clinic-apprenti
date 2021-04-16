import express from "express"

import Cat from "../../../models/Cat.js"

const catsRouter = new express.Router()

catsRouter.get("/", async (req, res) => {
  try{
    const cats = await Cat.findAll()
    res.status(200).json({ cats: cats })
  } catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

catsRouter.get("/:id", async (req, res) => {
  try {
    const catId = req.params.id
    const cat = await Cat.findById(catId)
    res.status(200).json({ cat: cat })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

catsRouter.post("/", async (req, res) => {
  try {
    const newCatData = req.body
    const newCat = new Cat(newCatData)
    await newCat.save()
    res.status(201).json({ cat: newCat })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default catsRouter
