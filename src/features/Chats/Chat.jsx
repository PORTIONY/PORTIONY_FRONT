import React from 'react';
import boxImage from '../../assets/chat_logo.png';
import styles from './Chats.module.css';

function Chat() {
  return (
    <div className={styles.container}>
  {/* 왼쪽: 채팅 목록 전체 (상단 + 내용) */}
  <div className={styles.leftWrapper}>
    <div className={styles.leftTop}>
      <h2 className={styles.chatTitle}>채팅 목록</h2>
      <select className={styles.filter}>
        <option>전체</option>
      </select>
    </div>

    <div className={styles.left}>
      <p>😶 아직 시작된 채팅이 없습니다.</p>
      <p>이웃과 함께 나누는 첫 거래를 시작해보세요!</p>
      <button className={styles.button}>상품 둘러보기</button>
    </div>
  </div>

  {/* 오른쪽: 채팅 상세 */}
  <div className={styles.right}>
    <div className={styles.contentBox}>
      <img src={boxImage} alt="박스" className={styles.image} />
    </div>
  </div>
</div>

  );
}

export default Chat;
