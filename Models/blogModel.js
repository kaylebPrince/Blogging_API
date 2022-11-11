const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Your post must have a title"],
        unique: true
    },

    description: {
        type: String,
        required: [true, "Please give a description of your post"]
    },

    body:{
        type: String,
        required: [true, "Body cannot be empty"],
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },

    state: {
        type: String, 
        enum: ['draft', 'published'], 
        default: 'draft'
    },

    read_count: {
        type: Number,
        default: 0
    },

    reading_time: {
        type: Number
    },

    tags: {
        type: [String]
    },
},
{timestamps: true}
);


const blogModel = mongoose.model('blogModel', BlogSchema);
module.exports = blogModel;