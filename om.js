const express =require("express")
const path = require("path")
const app = express()
const port = 3000
const multer = require("multer")
const upload = multer({dest:'uploads/'})
const {mergePdfs} = require("./merge")

app.use('/static',express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/JaiGanesh.html"))
})

app.post('/merge',upload.array('pdfs',2),async(req,res,next)=>{
    console.log(res.files);
    await mergePdfs(path.join(__dirname,req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
    //res.send({data: req.files})
})

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
})