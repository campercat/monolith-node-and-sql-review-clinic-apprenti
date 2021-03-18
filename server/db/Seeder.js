import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_cats_development" })

//setup __dirname to work with ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//assemble where the text file is located
const catPath = path.join(__dirname, "../../cats.txt")

class Seeder {
  static async seed() {
    LineReader.eachLine(catPath, async (line, last, done) => {
      const [ name, human, age ] = line.split(";")
      // build our SQL query string
      const queryString = "INSERT INTO cats ( name, human, age) VALUES ($1, $2, $3);"

      //execute our query
      try {
        const result = await pool.query(queryString, [ name, human, age ])
        if (last) {
          console.log("Seeding Complete")
          //drain the pool because we're done connecting
          pool.end()
        }
        done()
      } catch (error) {
        console.log(`Error: ${error}`)
        done()
      }
    })
  }
}

export default Seeder
