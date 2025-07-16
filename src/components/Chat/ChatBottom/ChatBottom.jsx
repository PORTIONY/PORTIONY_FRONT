import React, { useState } from 'react';
import styles from './ChatBottom.module.css';
import send from '../../../assets/send.png';
import add from '../../../assets/add.svg';

function ChatBottom({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.chatBottom}>
      <div className={styles.inputWrapper}>
        {/* + 아이콘 */}
        <button className={styles.plusButton} onClick={() => console.log('추가기능')}>
          <img src={add} alt="plus"/>
        </button>

        {/* 인풋창 */}
        <input
          type="text"
          className={styles.chatInput}
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 전송 버튼 */}
        <button className={styles.sendButton} onClick={() => console.log('추가기능')}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBottom;
