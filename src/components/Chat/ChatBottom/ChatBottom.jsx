import React, { useState } from 'react';
import styles from './ChatBottom.module.css';
import send from '../../../assets/send.svg';
import add from '../../../assets/add.svg';

// 예시 아이콘 (네 프로젝트 경로에 맞게 수정 필요)
import photoIcon from '../../../assets/sendphoto.svg';
import promiseIcon from '../../../assets/promise.svg';
import payIcon from '../../../assets/requestpay.svg';
import addressIcon from '../../../assets/sendinfo.svg';
import doneIcon from '../../../assets/complete.svg';

function ChatBottom({ onSendMessage, isSeller }) {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className={styles.chatBottom}>
      {showOptions && (
        // 아이콘 div
        <div className={styles.optionButtons}
          style={{ gap: isSeller ? '30px' : '50px' }}
        >
          {/* 공통: 사진전송 */}
          <button className={styles.optionBtn}>
            <img src={photoIcon} alt="사진 전송" />
            <span>사진 전송</span>
          </button>

          {/* 판매자 전용 옵션 */}
          {isSeller && (
            <>
              <button className={styles.optionBtn}>
                <img src={promiseIcon} alt="약속 잡기" />
                <span>약속 잡기</span>
              </button>
              <button className={styles.optionBtn}>
                <img src={payIcon} alt="송금 요청" />
                <span>송금 요청</span>
              </button>
            </>
          )}

          {/* 배송지/배송정보 */}
          <button className={styles.optionBtn}>
            <img src={addressIcon} alt="배송" />
            <span>{isSeller ? '배송 정보 전송' : '배송지 전송'}</span>
          </button>

          {/* 공통: 거래완료 */}
          <button className={styles.optionBtn}>
            <img src={doneIcon} alt="거래완료" />
            <span>거래 완료</span>
          </button>
        </div>
      )}

      <div className={styles.inputWrapper}>
        {/* + 아이콘 */}
        <button className={styles.plusButton} onClick={toggleOptions}>
          <img src={add} alt="plus" />
        </button>

        {/* 인풋창 */}
        <textarea
          className={styles.chatInput}
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            e.target.style.height = 'auto'; // 높이 초기화
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 따라 높이 조절
          }}
          rows={1}
        />

        {/* 전송 버튼 */}
        <button className={styles.sendButton} onClick={handleSend}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBottom;
