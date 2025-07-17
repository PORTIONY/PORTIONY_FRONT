// components/Chat/Modal/PromiseModal.jsx

import React from 'react';
import styles from './Promise.module.css';
import xIxon from '../../../assets/x(black).svg';

function PromiseModal({ onClose, onSubmit, data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>약속 잡기</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={xIxon} alt="사진 전송"/>
          </button>
        </div>

        <div className={styles.form}>
          <label className={styles.label}>
            <span>날짜</span>
            <input
              className={styles.input}
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>시간</span>
            <input
              className={styles.input}
              type="time"
              name="time"
              value={data.time}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>장소</span>
            <input
              className={styles.input}
              type="text"
              name="location"
              value={data.location}
              placeholder="장소를 입력해주세요."
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={() => onSubmit(data)}>다음</button>
        </div>
      </div>
    </div>
  );
}

export default PromiseModal;
