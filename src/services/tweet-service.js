const {TweetRepository} = require('../repository/index');
const Hashtag = require('../models/hashtags');
class TweetService {
    constructor() {
        
    }

    async create(data) { 
        const content = data.content;
        //regex = [^#] starts with # and then any character except space
        let hashtags = content.match(/#[^\s]+/g);
        console.log(hashtags);
        hashtags = hashtags.map((tag)=>tag.substring(1));
        
        // create hashtags in the db
        // we might have to create a bunch of hashtags and then associate them with the tweet
        /**
         * 1. bulk create hashtags
         * 2. filter out the hashtags that are already present in the db
         * 3. add tweet id inside the hashtags
         * 4.
         */
        const matchingHashtags = await Hashtag.find(
            {
                title: {$in: hashtags}
            }
        );
        if(matchingHashtags.length>0) {
            

        const newHashtags = hashtags.filter((tag)=>!matchingHashtags.includes(tag));
        const createdHashtags = await Hashtag.create(newHashtags.map((tag)=>{title: tag}));
        console.log(createdHashtags);
        // const allHashtags = [...createdHashtags, ...matchingHashtags];
        // data.hashtags = allHashtags.map((tag)=>tag._id);


        console.log(matchingHashtags); 
        }
        else
        {
            
            
            const createdHashtags = await Hashtag.create(hashtags.map((tag)=> {
                return {title: tag}
        }));
            // console.log(createdHashtags);
            // data.hashtags = createdHashtags.map((tag)=>tag._id);
        }
        const tweet = await TweetRepository.create(data);
        return tweet;

        
    }
}

/*
    this is good tweet #excited
    // how should we extract those hashtags
*/

module.exports = new TweetService();