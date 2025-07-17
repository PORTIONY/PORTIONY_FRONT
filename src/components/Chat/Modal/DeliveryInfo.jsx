import React, { useState } from 'react';
import styles from './DeliveryInfo.module.css';
import xIcon from '../../../assets/x(black).svg';

function DeliveryInfoModal({ onClose, onNext, data, setData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    // 여기에 데이터 처리 로직 넣어도 됨 (예: 서버 전송)
    onNext?.(data); // 콜백 있으면 넘겨주기
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.title}>배송 정보</p>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={xIcon} alt="닫기" />
          </button>
        </div>

        <div className={styles.form}>
          <label className={styles.label}>
            <span>택배사</span>
            <input
              className={styles.input}
              name="courier"
              placeholder="택배사를 입력해주세요."
              value={data.courier}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>운송장번호</span>
            <input
              className={styles.input}
              name="tracking"
              placeholder="운송장번호를 입력해주세요."
              value={data.tracking}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfoModal;
