// express 모듈을 가져옴
const express = require('express')

// function을 이용해서 app 만들고
const app = express()

// 포트 번호를 지정해주고
const port = 3000

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