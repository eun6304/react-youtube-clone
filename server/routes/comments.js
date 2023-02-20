const express = require('express');
const router = express.Router();
const { Comments } = require("../models/Comments");

// ==============================
//           Comments
// ==============================

router.post('/saveComment', (req, res) => {
  const comments = new Comments(req.body)
  comments.save((err, commentInfo) => {
    if(err) return res.json({ success : false, err })
    Comments.find({ '_id' : comments._id })
    .populate('writer')
    .exec((err, result) => {
      if(err) return res.json({ success : false, err })
      return res.status(200).json({ success : true, result })
    })
  })
})

router.post('/getComments', (req, res) => {
  Comments.find({ "postId" : req.body.videoId })
  .populate('writer') // writer 정보 가져오기
  .exec((err, comments) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({ success : true, comments })
  })
})

module.exports = router;
