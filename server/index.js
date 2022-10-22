// express 모듈을 가져옴
const express = require('express')

// function을 이용해서 app 만들고
const app = express()

// 포트 번호를 지정해주고
const port = 5000

// models/User.js의 user모델 가져오기
const { User } = require("./models/User")
// middleware 가져오기
const { auth } = require("./middleware/auth")

// body-parser 가져오기
const bodyParser = require('body-parser');

// config 디렉토리에서 환경 변수 가져오기
const config = require("./config/key");

// cookie-parser 가져오기
const cookieParser = require("cookie-parser");


// body-parser 옵션 주기
// 서버에서 정보를 분석해서 가져올 수 있게 해주는게 body parser 인데

// application/x-www-form-urlencoded 타입을 분석하기
app.use(bodyParser.urlencoded({extended: true}))

// application/json 타입을 분석하기
app.use(bodyParser.json())

// cookieParser 사용하기
app.use(cookieParser())

app.use('/api/video', require('./routes/video'));

app.use('/uploads', express.static('uploads'));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser : true, 
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요~")
})
// root 디렉토리에서 HELLO WORLD 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 해당 포트에서 APP 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* 회원 가입 */
app.post('/api/users/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)
  // user 모델에 저장하고 오류 처리 및 status 200 성공 처리
  // save 하기 전에 비밀 번호 암호화 해줘야함 -> User.js 에서 pre메소드로 처리해줌
  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err })
    return res.status(200).json({ success : true })
  })
});

/* 로그인 */
app.post('/api/users/login', (req, res) => {
  // 1. 데이터 베이스 안에서 요청한 Email 찾기
  User.findOne({ email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 2. Email 있다면 요청한 Email 의 비밀번호가 같은지 확인
    // comparePassword 라는 메소드를 만들기 -> User.js에서 만들기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ loginSuccess : false, message : "비밀번호가 틀렸습니다."})

      // 3. 비밀번호까지 맞다면 토큰을 생성하기. -> jsonwebtoken
      // generateToken 라는 메소드를 만들기 -> User.js에서 만들기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에?  쿠키...로컬스토리지..
        // 어디에 저장해야 가장 안전한지는 아직도 논란이 많다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess : true, message : "로그인 되었습니다."})

      })
    })
  })
}) 

/* Auth */
// endPoint에서 request를 받은 다음에 미들웨어 auth에서 중간에 처리를 해주고 넘긴다.
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어롤 통과했다는 것은, Authentication 이 true 라는 말.
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
})

/* Logout */
app.get('/api/users/logout', auth, (req, res) => {
  // 유저를 찾아서 데이터를 update 시켜준다.
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token : ""},
    (err, user) => {
      if(err) return res.json({ success : false, err })
      return res.status(200).send({
        success : true
      })
    }
  )
})