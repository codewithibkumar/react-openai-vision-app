const PORT=8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config() //store secrets - api key

const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file,cb) =>{
        cb(null,'public')
    },
    filename: (req, file,cb) =>{
        cb(null, Date.now()+"-"+file.originalname)
    }
})

const upload = multer({ storage: storage}).single('file')

let filePath
app.post('/upload', (req, res) => {
    upload(req,res, (err) =>{
        if(err){
            return res.status(500).json(err)
        }
        filePath = req.file.path
    })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));