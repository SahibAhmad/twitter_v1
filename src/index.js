const express = require('express');
const connect = require('./config/database');

const app = express();

const Tweet = require('./models/tweet');
const TweetRepo = require('./repository/tweet-repository'); 
const Comment = require('./models/comment');
const TweetService = require('./services/tweet-service');

app.listen(3000, async ()=> {
    console.log("Server started \n");
    await connect();
    console.log("Mongodb connected \n");

    const tweet = await TweetService.create({content: "This is a tweet #veryexcited #good #badvibes !"});
    console.log(tweet.hashtags);
   
    
    

});