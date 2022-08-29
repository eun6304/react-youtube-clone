// express 모듈을 가져옴
const express = require('express')

// function을 이용해서 app 만들고
const app = express()

// 포트 번호를 지정해주고
const port = 3000

// models/User.js의 user모델 가져오기
const { User } = require("./models/User")

// body-parser 가져오기
const bodyParser = require('body-parser');

// body-parser 옵션 주기
// 서버에서 정보를 분석해서 가져올 수 있게 해주는게 body parser 인데

// application/x-www-form-urlencoded 타입을 분석하기
app.use(bodyParser.urlencoded({extended: true}))

// application/json 타입을 분석하기
app.use(bodyParser.json())


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://eun6304:dmstj112@boilerplate.i665x.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser : true, useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))

// root 디렉토리에서 HELLO WORLD 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 해당 포트에서 APP 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/register', (req, res) => {
  // 회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)
  // user 모델에 저장하고 오류 처리 및 status 200 성공 처리
  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err })
    return res.status(200).json({ success : true })
  })
})