const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const worksSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        maxlength: 32
    },
    description:{
        type: String,
        trim: true,
        require: true,
        maxlength: 2000
    },
    technologies:[{
        type: ObjectId,
        ref: 'Tecnology',
        default: []
    }],
    background:{
        data: Buffer,
        contentType: String
    },
    logo:{
        data: Buffer,
        contentType: String
    },
    category: {
        type:Number
    },
    url:{
        type: String,
        trim: true,
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Work", worksSchema);
