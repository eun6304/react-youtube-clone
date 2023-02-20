const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");
const { Video } = require("../models/Video");

// ==============================
//           Subscribe
// ==============================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ 'userTo' : req.body.userTo })
  .exec((err, subscribe) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({ success : true, subscribeNumber : subscribe.length })
  })
})

router.post('/subscribed', (req, res) => {
  Subscriber.find({ 'userTo' : req.body.userTo, 'userFrom' : req.body.userFrom  })
  .exec((err, subscriber) => {
    if(err) return res.status(400).send(err)
    let result = false

    if(subscriber.length !== 0) {
      result = true
    }
    return res.status(200).json({ success : true, subscribed : result })
  })
})

router.post('/unSubscribe', (req, res) => {
  Subscriber.findOneAndDelete({ 'userTo' : req.body.userTo, 'userFrom' : req.body.userFrom  })
  .exec((err, doc) => {
    if(err) return res.status(400).json({ success : false, err })
    return res.status(200).json({ success : true, doc })
  })
})

router.post('/subscribe', (req, res) => {
  const subscribe = new Subscriber(req.body)

  subscribe.save((err, doc) => {
    if(err) return res.json({ success : false, err })
    return res.status(200).json({ success : true })
  })
})

router.post('/getSubscribedVideos', (req, res) => {

  Subscriber.find({ 'userFrom' : req.body.userFrom  })
  .exec((err, subscriberInfo) => {
    if(err) return res.status(400).send(err)
    
    let subscribedUser = [];

    subscriberInfo.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    })

    Video.find({ writer : { $in : subscribedUser }}) // $in 쓰면 다 가져올 수 있음
    .populate('writer') // writer 정보 가져오기
    .exec((err, videos) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success : true, videos })
    })
  })
})


module.exports = router;
