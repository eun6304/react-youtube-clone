const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  } else {
    next();
  }
})

// comparePassword 만들기
userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword 1234567   암호화된 비밀번호 
  // plain을 암호화해서 둘이 같은지 체크해야함. 암호화된 것을 복호화 할 수는 없음.
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch) // 에러가 없으면 isMatch는 TRUE
  })
}

userSchema.methods.generateToken = function(cb) {
  // jsonwebtoken을 이용해서 token을 생성하기
  // scretToken 에 token이 생성돼서 user._id랑 sign메소드를 이용해 합쳐준다.
  var user = this;
  // MongoDB의 _id는 ObjectId라는 특수한 형태의 데이터 타입이라 String 등으로 사용하기 위해서 조치 필요
  // toString이 더 상위함수인데 예외발생률 최소화 위해 toHexString() 사용
  var token = jwt.sign(user._id.toHexString(), 'scretToken'); 
  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err);
    cb(null, user)
  })
}

// userSchema methods가 안되고 statics로 바꿔야함
userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  // 토큰을 decode 한다. -> verify
  jwt.verify(token, 'scretToken', function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 tokenrhk DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
      if(err) return cb(err);
      cb(null, user)
    })
  })
}



const User = mongoose.model('User', userSchema)

module.exports = { User }