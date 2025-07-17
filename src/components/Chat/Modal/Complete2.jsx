// components/Chat/Modal/CompleteModal.jsx
import React from 'react';
import styles from './Complete2.module.css';

function CompleteModal({ onClose, onReview, onHome }) {
 return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>거래 완료되셨습니다!🎉</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={onReview}>후기 작성하기</button>
          <button className={styles.button} onClick={onHome}>홈으로 가기</button>
        </div>
      </div>
    </div>
  );
}

export default CompleteModal;
