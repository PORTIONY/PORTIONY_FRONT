// components/Chat/Modal/CompleteModal.jsx
import React from 'react';
import styles from './Complete2.module.css';
import { useNavigate } from 'react-router-dom';

function CompleteModal({ onClose, onReview, onHome }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');  // 홈으로 이동
    if (onClose) onClose(); // 필요하면 모달 닫기
  };

  const goToReview = () => {
    navigate('/mypage?tab=review');
    if (onClose) onClose(); // 필요하면 모달 닫기
  };
 return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>거래 완료되셨습니다!🎉</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={goToReview}>후기 작성하기</button>
          <button className={styles.button} onClick={goToHome}>홈으로 가기</button>
        </div>
      </div>
    </div>
  );
}

export default CompleteModal;
