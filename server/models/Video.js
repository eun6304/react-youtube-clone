const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
 
  writer : {
    type : Schema.Types.ObjectId, // User 모델에서 정보를 다 불러올 수 있음
    ref : 'User'
  },
  title : {
    type : String,
    maxlength : 50
  },
  description : {
    type : String
  },
  privacy : {
    type : Number
  },
  filePath : {
    type : String
  },
  category : {
    type : String
  },
  views : {
    type : String,
    default : 0
  },
  duration : {
    type : String
  },
  thumbnail : {
    type : String
  },

}, { timestamps : true })


const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }