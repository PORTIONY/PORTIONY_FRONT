import React, { useState } from 'react';
import styles from './PayRequest.module.css';

import xIcon from '../../../assets/x(black).svg';

function PayRequestModal({ onClose, onSubmit, data, setData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // 간단한 유효성 검사 추가 가능
    onSubmit(data);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>송금 요청</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={xIcon} alt="닫기" />
          </button>
        </div>

        {/* 폼 */}
        <div className={styles.form}>
          <label className={styles.label}>
            <span>예금주명</span>
            <input
              className={styles.input}
              name="accountHolder"
              placeholder="예금주명 입력해주세요."
              value={data.accountHolder}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>은행명</span>
            <input
              className={styles.input}
              name="phone"
              placeholder="은행명을 입력해주세요."
              value={data.phone}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>계좌번호</span>
            <input
              className={styles.input}
              name="accountNumber"
              placeholder="계좌번호를 입력해주세요."
              value={data.accountNumber}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>금액(원)</span>
            <input
              className={styles.input}
              name="amount"
              placeholder="금액을 입력해주세요."
              value={data.amount}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* 버튼 */}
        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayRequestModal;
