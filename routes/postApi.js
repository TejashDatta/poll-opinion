var express = require("express");
var router = express.Router();
var Post = require("../models/post");

const LIMIT = 50;

const parties = ["BJP", "INC", "TMC", "CPIM", "Others"];

router.get("/posts", (req, res, next) => {
  page = parseInt(req.query.page) || 1;
  if (page <= 0) page = 1;
  filter = req.query.filter !== "All" ? { party: req.query.filter } : {};
  if (filter.party === "Others") filter = { party: { $nin: parties } };
  const sortBy = { [req.query.sortBy]: -1 };
  Post.find(filter)
    .sort(sortBy)
    .skip(--page * LIMIT)
    .limit(LIMIT)
    .then(posts => {
      let items = posts.map(post => {
        return {
          ...post._doc,
          liked: post.voteUps.includes(req.IPaddress),
          flagged: post.flags.includes(req.IPaddress),
        };
      });
      Post.countDocuments({ userIP: req.IPaddress }).then(count => {
        let canPost = count ? false : true;
        res.send({ canPost, posts: items });
      });
    });
});

router.post("/posts", (req, res, next) => {
  req.body.userIP = req.IPaddress;
  Post.create(req.body)
    .then(data => res.json(data))
    .catch(next);
});

router.delete("/posts/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.userIP === req.IPaddress) {
        Post.findByIdAndDelete(req.params.id).then(data => res.json(data));
      } else
        res
          .status(400)
          .json({ error: "You don't have permission to delete this post" });
    })
    .catch(next);
});

router.put("/posts/like/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.voteUps.includes(req.IPaddress))
        q = {
          $pull: { voteUps: req.IPaddress },
          $inc: { voteUpsLength: -1 },
        };
      else
        q = {
          $addToSet: { voteUps: req.IPaddress },
          $inc: { voteUpsLength: 1 },
        };
      Post.findByIdAndUpdate(req.params.id, q, { new: true }).then(data =>
        res.json(data)
      );
    })
    .catch(next);
});

router.put("/posts/flag/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.flags.includes(req.IPaddress))
        q = {
          $pull: { flags: req.IPaddress },
          $inc: { flagsLength: -1 },
        };
      else
        q = {
          $addToSet: { flags: req.IPaddress },
          $inc: { flagsLength: 1 },
        };

      Post.findByIdAndUpdate(req.params.id, q, { new: true }).then(data =>
        res.json(data)
      );
    })
    .catch(next);
});

module.exports = router;
