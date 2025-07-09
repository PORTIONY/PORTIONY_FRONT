import React from 'react';
import styles from './SignupTermsModal.module.css';
import xIcon from '../../assets/x(black).svg';

const SignupTermsModal = ({ isOpen, label, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.background} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {/* 상단 우측 X 아이콘 */}
        <img src={xIcon} alt="닫기" className={styles.closeIcon} onClick={onClose}/>

        <div className={styles.modalContentBox}>
            <p className={styles.modalTitle}>{label}</p>
            <div className={styles.modalScroll}>
              <p className={styles.modalContent}>{content}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTermsModal;