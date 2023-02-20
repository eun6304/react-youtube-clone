const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


// ==============================
//           Like
// ==============================

router.post('/getLikes', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId }
  } else {
    variable = { commentId : req.body.commentId }
  }

  Like.find(variable)
  .exec((err, likes) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({ success : true, likes })
  })
})

router.post('/getDislikes', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId }
  } else {
    variable = { commentId : req.body.commentId }
  }

  Dislike.find(variable)
  .exec((err, disLikes) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({ success : true, disLikes })
  })
})

router.post('/uplike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId , userId : req.body.userId}
  } else {
    variable = { commentId : req.body.commentId , userId : req.body.userId }
  }

  // like collection 에다가 정보 넣기
  const like = new Like(variable)
  
  like.save((err, likeResult) => {
    if(err) return res.status(400).json({ success : false, err })
    // 만약에 dislike이 이미 클릭이 되있다면, dislike을 1 줄여준다.
    Dislike.findOneAndDelete(variable)
    .exec((err, disLikeResult) => {
      if(err) return res.status(400).json({ success : false, err })
      return res.status(200).json({ success : true })
    })

  

  })

})


router.post('/unlike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId , userId : req.body.userId}
  } else {
    variable = { commentId : req.body.commentId , userId : req.body.userId }
  }

  Like.findOneAndDelete(variable)
  .exec((err, result) => {
    if(err) return res.status(400).json({ success : false, err })
    return res.status(200).json({ success : true, result })
  })
})

router.post('/unDislike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId , userId : req.body.userId}
  } else {
    variable = { commentId : req.body.commentId , userId : req.body.userId }
  }

  Dislike.findOneAndDelete(variable)
  .exec((err, result) => {
    if(err) return res.status(400).json({ success : false, err })
    return res.status(200).json({ success : true, result })
  })
})


router.post('/upDislike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId : req.body.videoId , userId : req.body.userId}
  } else {
    variable = { commentId : req.body.commentId , userId : req.body.userId }
  }

  // like collection 에다가 정보 넣기
  const dislike = new Dislike(variable)
  
  dislike.save((err, dislikeResult) => {
    if(err) return res.status(400).json({ success : false, err })

    // 만약에 like이 이미 클릭이 되있다면, like을 1 줄여준다.
    Like.findOneAndDelete(variable)
    .exec((err, likeResult) => {
      if(err) return res.status(400).json({ success : false, err })
      return res.status(200).json({ success : true })
    })

  })

  

})

module.exports = router;
