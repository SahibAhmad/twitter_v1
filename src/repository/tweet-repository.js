const Tweet = require('../models/tweet');

class TweetRepository {
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;  
        } catch (error) {
            console.log(error);
            
        }
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'comments'});
            //try with .lean() , it will act as a javascript object but they dont have the save etc functions of mongoose
            return tweet;
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(tweetId,data) {
        try {
            const tweet = await Tweet.findByIdAndUpdate(tweetId,data,{new:true});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            const tweet = Tweet.findByIdAndDelete(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset, limit) {
        try {
            //limit is the number of documents to be returned and 
            //offset is the number of documents to be skipped
            const tweets = await Tweet.find().skip(offset).limit(limit);
            return tweets;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new TweetRepository();