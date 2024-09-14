import mongoose from 'mongoose';

//schema is like blue print of the model
const CommentSchema =  new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
    },

    
    
}, {timestamps: true});


// create model from schema

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;