const express = require("express");
const upload = require('./multer')
const app = express();


app.get("/" , (req,res) => {
    res.send("server is running")
})


app.post("/upload" , upload.single("image") , (req,res) => {
    const body = req.body
    const file = req.file

    console.log(file)
    console.log(body)


    res.status(200).json({
        message: "done"
    })
})




module.exports = app