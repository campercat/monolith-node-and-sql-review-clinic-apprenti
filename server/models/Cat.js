import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_cats_development"
})

class Cat {
  constructor({ id, name, human, age }) {
    this.id = id
    this.name = name
    this.human = human
    this.age = age
  }

  static async findAll() {
    try {
      const queryString = 'SELECT * FROM cats;'
      const result = await pool.query(queryString)
      const catData = result.rows
      const cats = catData.map(cat => {
        return new this(cat)
      })
      return cats
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async findById(id) {
    try {
      const queryString = `SELECT * FROM cats WHERE id = ${id};`
      const result = await pool.query(queryString)
      const catData = result.rows[0]
      return new this(catData)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async save() {
    try {
      const queryString = 'INSERT INTO cats (name, human, age) VALUES ($1, $2, $3) RETURNING id;'
      const result = await pool.query(queryString, [this.name, this.human, this.age])
      const newCatId = result.rows[0].id
      this.id = newCatId
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}

export default Cat
