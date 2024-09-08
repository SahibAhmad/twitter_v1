const mongoose = require('mongoose');


//schema is like blue print of the model
const tweetSchema =  new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
    
}, {timestamps: true});


// create model from schema

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;