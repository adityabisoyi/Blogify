const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Agriculture", 
            "Arts and Culture", 
            "Business and Entrepreneurship", 
            "Education", 
            "Environment and Sustainability",
            "Fashion", 
            "Food and Cooking",
            "Fun", 
            "Personal finance", 
            "Health and Fitness",
            "Life", 
            "Music and Entertainment", 
            "Miscellaneous", 
            "Sports", 
            "Science",
            "Travel", 
            "Technology",
            "Uncategorized",
            "Weather", 
        ],
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        type: String
    }
}, {timestamps: true})


const Post = mongoose.model('Post', postSchema)


module.exports = Post