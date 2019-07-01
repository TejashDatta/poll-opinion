var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    validate: v => (v.length < 1000 ? true : false),
  },
  party: {
    type: String,
    required: true,
  },
  userIP: {
    type: String,
    validate: {
      validator: function(v) {
        return new Promise(function(resolve, reject) {
          Post.countDocuments({ userIP: v }).then(count => resolve(!count));
        });
      },
      message: "You've already posted!",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  voteUps: [String],
  voteUpsLength: {
    type: Number,
    default: 0,
  },
  flags: [String],
  flagsLength: {
    type: Number,
    default: 0,
  },
});

var Post = mongoose.model("post", PostSchema);

module.exports = Post;
