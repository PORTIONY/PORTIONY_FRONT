// components/Chat/Modal/CompleteModal.jsx

import React from 'react';
import styles from './Complete.module.css';
import modalIcon from '../../../assets/modal-icon.svg'; // 기존 아이콘 사용

function CompleteModal({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img src={modalIcon} alt="경고 아이콘" />
        <p className={styles.title}>정말 거래완료 하시겠습니까?</p>
        <p className={styles.subtitle}>완료 후에는 취소가 불가합니다.</p>

        <div className={styles.buttons}>
          <button className={`${styles.button} ${styles.cancel}`} onClick={onCancel}>
            취소
          </button>
          <button className={`${styles.button} ${styles.confirm}`} onClick={onConfirm}>
            거래완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompleteModal;
