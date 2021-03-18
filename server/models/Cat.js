import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_cats_development"
})

class Cat {

}

export default Cat
