const express = require("express")
const app = express()

const port = 7000 


app.get("/", (req, res) => {
    res.send("connected to server")
})












app.listen(port, () => {
    console.log(`Server running in ${port}`)
})