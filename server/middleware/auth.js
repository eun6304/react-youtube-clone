const { User } = require('../models/User')

let auth = (req, res, next) => {
   // 인증 처리를 하는 곳
   // 1. client쿠키에서 토큰을 가져온다.
   let token = req.cookies.x_auth;
   // 2. 토큰을 복호화해서 유저를 찾는다.

   User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ isAuth : false, error : true })
    // 인증 됐으면 req로 토큰이랑 유저 정보 넘겨주고 next로 보내줌.

    req.token = token;
    req.user = user;
    next();
   })
   // 3. 유저가 있으면 인증 Okay
   // 4. 유저가 없으면 인증 No

}

module.exports = { auth }