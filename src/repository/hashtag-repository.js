const Hashtag = require("../models/hashtags");

class HashtagRepository {
  async create(data) {
    try {
      const hashtag = await Hashtag.create(data);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const hashtag = await Tweet.findById(id);
      return hashtag;
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(data) {
    try {
      const hashtags = await Hashtag.insertMany(data);
      return hashtags;
    } catch (error) {
      console.log(error);
    }
  }

  async getMatching(hashtags) {
    try {
      const matching = await Hashtag.find({
        title: { $in: hashtags },
      });
      return matching;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    try {
      const response = Tweet.findByIdAndDelete(id);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new HashtagRepository();
