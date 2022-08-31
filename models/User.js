const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name : {
    type :  String,
    maxlength : 50
  },
  email : {
    type : String,
    trim : true,
    unique : 1
  },
  password : {
    type : String,
    minlength : 5
  },
  lastname : {
    type : String,
    maxlength : 50
  },
  role : {
    type : Number,
    default : 0
  },
  image : String,
  token : {
    type : String
  },
  tokenExp : {
    type : Number
  }
})

// mongoose에서 가져온 메소드
// 저장하기 전에 function을 줘서 무엇을 한다.
userSchema.pre('save', function(next) {
  // userSchema의 password 가져오기 위함
  var user = this;

  // Salt를 이용해서 비밀 번호를 암호화 시킨다.
  // genSalt : 솔트 만드는 메소드, 솔트 넣고, function
  // hash
  if(user.isModified('password')) { // 비밀 번호를 바꿀때만 암호화하기
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)
        user.password = hash
        // index.js의 save메소드로 보낸다.
        next();
      });
    });
  }
})
const User = mongoose.model('User', userSchema)

module.exports = { User }