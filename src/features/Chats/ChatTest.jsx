import React, { useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatTest = () => {
  const [senderId, setSenderId] = useState(null); // 1 또는 6
  const [connected, setConnected] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const clientRef = useRef(null);

  const chatRoomId = 1; // 테스트용 채팅방 ID

  const connect = (id) => {
    const socket = new SockJS('https://port-0-portiony-backend-md4272k5c4648749.sel5.cloudtype.app/ws-chat-sockjs');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('✅ Connected!');
        setConnected(true);
        setSenderId(id);
        client.subscribe(`/sub/chat/room/${chatRoomId}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('[📩 받은 메시지]', body);
          setChatMessages((prev) => [...prev, body]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame);
      },
    });

    client.activate();
    clientRef.current = client;
  };

  const sendMessage = () => {
    if (clientRef.current && connected && messageInput) {
      const payload = {
        chatRoomId,
        senderId: senderId, // ✅ 여기에 sender 값 직접 지정
        content: messageInput,
      };
      clientRef.current.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(payload),
      });
      setMessageInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>💬 실시간 채팅 테스트</h2>
      {!connected && (
        <>
          <button onClick={() => connect(1)}>🔵 사용자 1 (ID: 1) 접속</button>
          <button onClick={() => connect(2)} style={{ marginLeft: '10px' }}>
            🟢 사용자 6 (ID: 6) 접속
          </button>
        </>
      )}
      {connected && (
        <>
          <div style={{ marginTop: '20px' }}>
            <strong>접속된 사용자 ID: {senderId}</strong>
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="메시지를 입력하세요"
              />
              <button onClick={sendMessage} style={{ marginLeft: '10px' }}>
                보내기
              </button>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3>📨 메시지 로그</h3>
            <ul>
              {chatMessages.map((msg, index) => (
                <li key={index}>
                  <b>{msg.senderId === senderId ? '나' : `상대(${msg.senderId})`}</b>: {msg.content}

                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatTest;
