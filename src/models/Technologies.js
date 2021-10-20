const mongoose = require('mongoose');

const technologiesSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim: true,
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    }
)

module.exports = mongoose.model("Technology", technologiesSchema);
