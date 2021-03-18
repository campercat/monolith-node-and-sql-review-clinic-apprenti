import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "./ErrorList"

const NewCatForm = props => {
  const [newCat, setNewCat] = useState({
    title: "",
    location: ""
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewCat = async () => {
    try {
      const response = await fetch("/api/v1/cats", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newCat)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          // const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        console.log("Posted successfully!", body);
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = (event) => {
    setNewCat({
      ...newCat,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewCat()
  }

  if (shouldRedirect) {
    return <Redirect to="/cats" />
  }

  return (
    <>
      <h1>Add a New Cat</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout">
        <label htmlFor="name">
         Name:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newCat.name}
          />
        </label>

        <label htmlFor="human">
          Human:
          <input
            id="human"
            type="text"
            name="human"
            onChange={handleInputChange}
            value={newCat.human}
          />
        </label>

        <label htmlFor="age">
          Age:
          <input
            id="age"
            type="number"
            name="age"
            onChange={handleInputChange}
            value={newCat.age}
          />
        </label>
        
        <div className="button-group">
          <input className="button" type="submit" value="Add this Cat" />
        </div>
      </form>
    </>
  )
}

export default NewCatForm