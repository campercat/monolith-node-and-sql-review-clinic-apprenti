import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import CatTile from "./CatTile"

const CatsIndex = (props) => {
  const [cats, setCats] = useState([])

  const getCats = async () => {
    try {
      const response = await fetch("/api/v1/cats")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const catData = await response.json()
      setCats(catData.cats)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCats()
  }, [])

  const catListItems = cats.map((cat) => {
    return(
      <CatTile
        key={cat.id}
        cat={cat}
      />
    )
  })

  return(
    <>
      <h1>My Cats</h1>
      <h3><Link to="/cats/new">Add a New Cat!</Link></h3>
      <ul>
        {catListItems}
      </ul>
    </>
  )
}

export default CatsIndex
