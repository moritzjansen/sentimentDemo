const express = require("express")
const path = require("path")
const app = express()

const PORT = 80

app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})
