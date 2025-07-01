// src/features/Auth/SignUpTerms.jsx
import React from 'react';
import styles from './SignUp.module.css';
import backIcon from '../../assets/chevron-left.svg';

function SignUpTerms() {
  return (
    <div className={styles.container}>
      <div className={styles.backWrapper}>
        <img src={backIcon} alt="뒤로가기" className={styles.backIcon} />
        <span className={styles.backTitle}>로그인</span>
      </div>

      <p className={styles.description}>Portiony 서비스 이용약관을 확인해주세요.</p>

      <div className={styles.checkboxGroup}>
        <label><input type="checkbox" /> 모두 동의</label>
        <hr className={styles.separator} />
        <label><input type="checkbox" /> [필수] 서비스 이용약관 <span className={styles.link}>[보기]</span></label>
        <label><input type="checkbox" /> [필수] 개인정보 수집 및 이용 <span className={styles.link}>[보기]</span></label>
        <label><input type="checkbox" /> [필수] 위치기반서비스 이용약관 <span className={styles.link}>[보기]</span></label>
        <label><input type="checkbox" /> [필수] 14세 이상입니다. <span className={styles.link}>[보기]</span></label>
      </div>

      <button className={styles.button}>로그인</button>
    </div>
  );
}

export default SignUpTerms;
