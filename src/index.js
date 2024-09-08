const express = require('express');
const connect = require('./config/database');

const app = express();

const Tweet = require('./models/tweet');
const TweetRepo = require('./repository/tweet-repository'); 
const Comment = require('./models/comment');

app.listen(3000, async ()=> {
    console.log("Server started \n");
    await connect();
    console.log("Mongodb connected \n");

    // const tweet = await Tweet.create({
    //     content: "First tweet",
    //     userEmail: "a@b.com"
    // });

    // const tweets = await Tweet.find({userEmail: "a@b.com"});

    // const tweet = await TweetRepo.update("66dc90cf9c91d1380e95154f", 
    //     {content:"new good updated content"},
    //     );

    // const tweet = await TweetRepo.create({content: "Great tweeets great man"});
    // console.log(tweet);
    // tweet.comments.push({content: "great commment easy peasy"});

    // await tweet.save();
    
    // const tweet = await TweetRepo.create({content: 'Tweet with commentdfsafdsa schema'});
    // const comment = await Comment.create({content: 'new comment'});
    // tweet.comments.push(comment);
    // await tweet.save();


    const tweet = await TweetRepo.getWithComments("66dd4ae85b0e6c9427d21ebe");

    console.log(tweet); //it will print older content because we are not using {new:true} in findByIdAndUpdate method

});