const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); //permite escojer imagenes desde nuestro sistema operativo

const Work = require('../models/Works');
const {errorHandler} = require('../helpers/dberrorHandler')

exports.createWorks = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be upload"
            })
        }

        console.log(fields)
        let work = new Work(fields);

        if(files.background && files.logo){
            if(files.background.size > 1000000){
                return res.status(400).json({
                    error: "Image background should be less than 1MB in size"
                })
            }else if(files.logo.size > 1000000){
                return res.status(400).json({
                    error: "Image logo should be less than 1MB in size"
                })
            }
            work.background.data = fs.readFileSync(files.background.path);
            work.background.contentType = files.background.type;

            work.logo.data = fs.readFileSync(files.logo.path);
            work.logo.contentType = files.logo.type;
        }

        work.save((err, result)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}


exports.listWorks = (req, res) =>{

    Work.find()
        .select("-background")
        .select("-logo")
        .exec((err,work) =>{
            if(err){
                return res.status(400).json({
                    error: "Work not found"
                })
            }
            res.json(work);
        })
}

exports.readBackground = (req, res, next) =>{
    if(req.work.background.data){
        res.set('Content-Type', req.work.background.contentType);
        return res.send(req.work.background.data)
    }
    next();
}

exports.readLogo = (req, res, next) =>{
    if(req.work.logo.data){
        res.set('Content-Type', req.work.logo.contentType);
        return res.send(req.work.logo.data)
    }
    next();
}

exports.workById= (req, res, next, id) =>{
    Work.findById(id)
    .exec((err, work) => {
        if(err || !work) {
            return res.json({
                error: "Work was not found or does not exist"
            })
        }
    req.work = work;
    next();
    })
}