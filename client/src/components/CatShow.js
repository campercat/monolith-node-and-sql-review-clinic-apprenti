import React, { useState, useEffect } from "react"

const CatShow = (props) => {
  const [cat, setCat] = useState({})

  const getCat = async () => {
    try {
      const catId = props.match.params.id
      const response = await fetch(`/api/v1/cats/${catId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setCat(responseBody.cat)
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCat()
  }, [])

  return (
    <>
      <h1>Name: {cat.name}</h1>
      <h2>Human: { cat.human ? cat.human : "N/A" }</h2>
      <h2>Age: { cat.age ? cat.age : "N/A" }</h2>
    </>
  )
}

export default CatShow
