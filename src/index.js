import express from  'express';
import {connect} from './config/database.js'

const app = express();


import TweetService from './services/tweet-service.js';

app.listen(3000, async ()=> {
    console.log("Server started \n");
    await connect();
    console.log("Mongodb connected \n");

    const tweet = await TweetService.create({content: "This is a tweet  !"});
    console.log(tweet);

    // const tweet = await TweetService.delete("66e442883423cca51b37266e");
    
   
    
    

});