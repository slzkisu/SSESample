const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');

app.use(cors());

// 클라이언트로 이벤트 전송
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
     .setHeader('Cache-Control', 'no-cache')
     .setHeader('Connection', 'keep-alive')
     .setHeader('Access-Control-Allow-Origin', '*')
     .status(200);

  const sendNotification = () => {
    const data = JSON.stringify({
      title: 'New Message',
      message: `You have a new notification at ${new Date().toLocaleTimeString()}`
    });

    // 데이터 확인
    if (new Date().getSeconds() % 5 === 0) {
      res.write(`data: ${data}\n\n`);
    }
  };

  // 5초마다 클라이언트로 메시지 전송
  const intervalId = setInterval(sendNotification, 1000);

  // 클라이언트가 연결을 끊을 때 처리
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
