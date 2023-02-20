const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth")

const multer = require("multer");
const ffmpeg  = require("fluent-ffmpeg")

// ==============================
//           Video
// ==============================

let storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename : (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter : (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if(ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false)
    }
    cb(null, true)
  }
})

const upload = multer({ storage : storage }).single("file");

router.post('/uploads', (req, res) => {
  // 비디오를 서버에 저장한다
  upload(req, res, err => {
    if(err) {
      return res.json({ success : false, err })
    }
    return res.json({ success : true, url : res.req.file.path, fileName : res.req.file.filename })
  })
})

router.post('/thumnail', (req, res) => {

  let filePath = ""
  let fileDuration = ""

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata); // all metadata
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration
  });

  // 비디오 썸네일 생성 하고  비디오 러닝타임도 가져오기
  ffmpeg(req.body.url) // 클라이언트 에서 온 비디오 저장 경로
  .on('filenames', function (filenames) { // 썸네일 파일 네임 생성
    console.log('Will generate' + filenames.join(', '))
    console.log(filenames)
    filePath = "uploads/thumbnails/" + filenames[0]
    console.log("filePath", filePath)
  })
  .on('end', function () { // 생성 다 하고 무엇을 할 것인지
    console.log('Screenshots taken');
    return res.json({ success : true, url : filePath, fileDuration : fileDuration})
  })
  .on('error', function(err) { // 에러 났을시 어떻게 할 건지
    console.error(err);
    return res.json({ success : false, err })
  })
  .screenshots({ // 3개 썸네일 찍을 수 있고, 업로드 폴더 안에 썸네일 폴더 안에 저장될 것,
    // Will taken screenshots at  20%, 40%, 60% and 80% of the video
    count : 3,
    folder : 'uploads/thumbnails',
    size : '320x240',
    // '%b' : input basename ( filename w/0 extension )
    filename : 'thumnail-%b.png'
  })
})

router.post('/uploadVideo', (req, res) => {
  // 비디오 정보를 업로드 할때 저장한다.
  const video = new Video(req.body) // 인스턴스를 생성해서 비디오 정보를 담는다.
  video.save((err, doc) => { //  몽구스 메소드 save 를 이용해 저장함.
    if(err) return res.json({ success : false, err })
    res.status(200).json({ success : true })
  })
})

router.get('/getVideos', (req, res) => {
  // 비디오를 DB에서 가져와서 클라이언트에 보낸다.
  Video.find() // 비디오 콜렉션에 있는 모든 비디오를 가져온다.
  .populate('writer') // writer 정보 가져오기
  .exec((err, videos) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({ success : true, videos })
  })
})

router.post('/getVideoDetail', (req, res) => {
  Video.findOne({"_id" : req.body.videoId })
  .populate('writer')
  .exec((err, videoDetail) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({ success : true, videoDetail })
  })
})

module.exports = router;
