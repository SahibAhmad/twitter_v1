const mongoose = require('mongoose');


//schema is like blue print of the model
const tweetSchema =  new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 characters'],

    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]

   
}, {timestamps: true});


// create model from schema

// tweetSchema.pre('save', function(next){
//     console.log("Inside pre save hook");
//     // note it is important to pass function like function() not ()=>{} because arrow function does not have this keyword and it will not work
//     //it will bind to nearest object which is global object
//     // but funtion() will have this keyword bind to the object which is calling it
//     next();
// } );

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;