const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); //permite escojer imagenes desde nuestro sistema operativo

const Technology = require('../models/Technologies');
const {errorHandler} = require('../helpers/dberrorHandler')


exports.createTechnology = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be upload"
            })
        }

        const {title} = fields;

        let technology = new Technology(fields);
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be less than 1MB in size"
                })
            }
            technology.photo.data = fs.readFileSync(files.photo.path);
            technology.photo.contentType = files.photo.type;
        }
        else{
            return res.status(400).json({
                error: "Img don't exist"
            })
        }

        technology.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}

exports.readTechnology = (req, res) =>{
    Technology.find()
        .select("-photo")
        .exec((err,technology) =>{
            if(err){
                return res.status(400).json({
                    error: "Technology not found"
                })
            }
            res.json(technology);
        })
}

exports.readPhoto = (req, res, next) =>{
    if(req.technology.photo.data){
        res.set('Content-Type', req.technology.photo.contentType);
        return res.send(req.technology.photo.data)
    }
    next();
}

exports.technologyById = (req, res, next, id) =>{
    Technology.findById(id)
        .exec((err, technology) => {
            if(err || !technology) {
                return res.json({
                    error: "Technology was not found or does not exist"
                })
            }
        req.technology = technology;
        next();
    })
}

exports.read = (req, res)=>{
    req.technology.photo = undefined;
    return res.json(req.technology)
}