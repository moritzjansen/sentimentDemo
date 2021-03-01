const express = require("express")
const path = require("path")
const app = express()
// const cors = require("cors")

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))
// app.use(cors())

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})