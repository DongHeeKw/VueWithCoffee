import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';

// express 프레임워크를 이용하여 http 서버 생성
let app = express();
app.server = http.createServer(app);

// morgan 은 요청과 응답에 대한 정보를 콘솔에 기록
app.use(morgan('dev'));

// cors : cross origin resource sharing
// https의 포트가 다른 곳끼리 자원을 공유
// 지금 예제의 경우는 8000번 포트와 8080번 포트의 자원 공유
app.use(cors({
    exposedHeaders:config.corsHeaders,
}));


app.use(express.json());

app.use(middleware({ config }));

app.get('/', function(req, res) {
    res.send('API 서버가 정상적으로 실행되고 있습니다.');
});
app.use('api/', api({ config }));
app.use('assets', express.static('src/assets'));

app.server.listen(process.env.PORT || config.port, () => {
  console.log('=======================================================================================================');
  console.log(`API 서버가 성공적으로 실행되었습니다. 브라우저를 통해 localhost:${app.server.address().port}에 접속해보세요!`);
  console.log('=======================================================================================================');
});

export default app;