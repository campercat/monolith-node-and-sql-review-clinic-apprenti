import React from "react"
import { Link } from "react-router-dom"

const CatTile = (props) => {
  return (
    <li><Link to={`/cats/${props.cat.id}`}>{props.cat.name}</Link></li>
  )
}

export default CatTile
