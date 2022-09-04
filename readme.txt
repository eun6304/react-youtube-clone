npm install express --save
npm install mongoose --save

// res의 body 분석해주는 것
npm install body-parser --save

// 소스를 변경할때 그것을 감지해서 자동으로 서버를 재시작해주는 툴
// dev가 붙는 이유는 development모드(로컬), production모드(배포 후) 여부를 정하는 것 같다.
npm install nodemon --save-dev

npm install bcrypt --save
npm install jsonwebtoken --save
npm install cookie-parser --save
npm install concurrently --save

// client
npx create-react-app .
npm install react-router-dom --save
npm install axios --save
npm install http-proxy-middleware --save
npm install antd --save
npm install redux react-redux redux-promise redux-thunk --save

// package.json -> scripts
"start" : "node index.js"
"backend" : "nodemon index.js"