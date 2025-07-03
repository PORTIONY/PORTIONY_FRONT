import React, { useState } from 'react';
import boxImage from '../../assets/chat_logo.png';
import styles from './Chats.module.css';
import Dropdown from '../../components/DropDown/DropDown';

function Chat() {
  const [dateSort, setDateSort] = useState('전체');

  return (
    <div className={styles.container}>
      {/* 왼쪽: 채팅 목록 전체 (상단 + 내용) */}
      <div className={styles.leftWrapper}>
        <div className={styles.leftTop}>
          <h2 className={styles.chatTitle}>채팅 목록</h2>
          <Dropdown
            options={['구매', '판매']}
            selected={dateSort}
            setSelected={setDateSort}
            placeholder="날짜"
          />
        </div>

        <div className={styles.left}>
          <p className={styles.chatEmptyText}>
            💬아직 시작된 채팅이 없습니다.<br /><br />
            이웃과 함께 나누는 첫 거래를 시작해보세요 !
          </p>
          <p className={styles.chatEmptyText1}>공동구매 상품을 골라 시작할 수 있어요.</p>
          <button className={styles.button}>상품 둘러보기</button>
        </div>
      </div>

      {/* 오른쪽: 채팅 상세 */}
      <div className={styles.right}>
        <img src={boxImage} alt="박스" className={styles.image} />
      </div>
    </div>
  );
}

export default Chat;
