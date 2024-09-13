const { TweetRepository } = require('../repository/index');
const Hashtag = require('../models/hashtags');
class TweetService {
    constructor() {

    }

    async create(data) {
        const content = data.content;
    
        // Extract hashtags from the content using regex
        let hashtags = content.match(/#[^\s]+/g);
        hashtags = hashtags.map((tag) => tag.substring(1)); // Remove the # symbol
    
        // Create the tweet first
        const tweet = await TweetRepository.create(data);
    
        // Prepare to store hashtag IDs to associate with the tweet
        const hashIds = [];
    
        // Find matching hashtags already in the database
        let matchingHashtags = await Hashtag.find({
            title: { $in: hashtags }
        });
    
        // If there are matching hashtags, add the tweet ID to their `tweets` field
        if (matchingHashtags.length > 0) {
            const updatedHashtagsPromises = matchingHashtags.map(async (hash) => {
                hashIds.push(hash._id); // Collect hashtag IDs
                hash.tweets.push(tweet._id); // Associate tweet with hashtag
                return hash.save(); // Save the updated hashtag
            });
            await Promise.all(updatedHashtagsPromises); // Wait for all updates to complete
    
            // Extract the titles of the matching hashtags to filter out
            const matchedTitles = matchingHashtags.map((tag) => tag.title);
            hashtags = hashtags.filter((tag) => !matchedTitles.includes(tag)); // Exclude existing hashtags
        }
    
        // If there are new hashtags to create
        if (hashtags.length > 0) {
            const hashtagsToCreate = hashtags.map((tag) => {
                return { title: tag, tweets: [tweet._id] };
            });
            
            // Bulk insert new hashtags
            const createdHashtags = await Hashtag.insertMany(hashtagsToCreate);
    
            // Collect the IDs of the newly created hashtags
            createdHashtags.forEach((hash) => {
                hashIds.push(hash._id);
            });
        }
    
        // Add all the hashtag IDs to the tweet and save it
        tweet.hashtags.push(...hashIds); // Spread the IDs into the array
        await tweet.save(); // Save the tweet with the associated hashtags
    
        return tweet;
    }

    async getTweets() {
        return TweetRepository.getAll();
    }
    
}

/*
    this is good tweet #excited
    // how should we extract those hashtags
*/

module.exports = new TweetService();