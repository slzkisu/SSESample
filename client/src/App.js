import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // 서버로부터 이벤트 수신
    const eventSource = new EventSource('http://localhost:4000/events');

    // 브라우저 호환성 확인
    if (!EventSource) {
      // 호환되는 브라우저가 무엇인지 알림(e.g. IE는 지원하지 않음)
      alert('This browser does not support. Please use a modern browser.');
    }

    // 이벤트 수신 시 처리
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotification(data);
    };

    // 컴포넌트 언마운트 시 이벤트 소스 종료
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {notification ? (
          <div>
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
          </div>
        ) : (
          <p>No notifications yet</p>
        )}
      </header>
    </div>
  );
}

export default App;
