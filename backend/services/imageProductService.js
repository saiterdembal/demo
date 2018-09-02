var express = require("express");
var multiparty = require('multiparty');
var router = express.Router();
const fs = require('fs');
var path = require('path');

const folder = path.resolve('../ui/angularUi/src/productImages');

router.get("/list", (request, response) => {         
    var imageFolder = folder +'/'+ request.query.pid;  
    let files = fs.readdirSync(imageFolder);
    let images=[];
    files.forEach(i=> { images.push(i); });
    response.send(images);    
});

router.post("/add" ,(req, res) => {      
    (new multiparty.Form()).parse(req, function(err, fields, files) {        
        let images = files.image;
        let folderId = fields.folderid[0];
        let path = folder + '/' + folderId;
        images.forEach(img => {
            let rs = fs.createReadStream(img.path);            
            let ws = fs.createWriteStream(path + '/' + img.originalFilename);
            rs.pipe(ws);        
         });          
    });
    res.status(200).send({message : "ok"});
});

router.post("/delete", (req, res) => {
    let folderId = req.body.id;
    let imgName = req.body.name;
    let path = folder + "/" + folderId + "/" + imgName;
    fs.unlinkSync(path, (err) => {
        if (err)
            res.status(500).send(err);
        res.status(200).send('image is deleted');
    })
    
    
       
});

var image = { router };
module.exports = image;
