import React from 'react';
import styles from './GroupBuyModal.module.css';
import modalIcon from '../../assets/modal-icon.svg';


function GroupBuyModal({ message, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className={styles['gbm-overlay']}>
      <div className={styles['gbm-content']}>
        <img src={modalIcon} alt="모달 아이콘" />
        <p className={styles['gbm-message']}>{message}</p>

        <div className={styles['gbm-buttons']}>
          <button
            className={`${styles['gbm-button']} ${styles.cancel}`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`${styles['gbm-button']} ${styles.confirm}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}


export default GroupBuyModal;
