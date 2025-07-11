import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupDone.module.css';
import logo from '../../../assets/logoportiony.png';

function SignupDone() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="캐릭터로고" />
        <h2 className={styles.slogan}>함께 사서, 함께 나누는 새로운 소비 문화</h2>
      </div>

      <p className={styles.successText}>회원가입 완료되었습니다!</p>

      <button type="button" className={styles.loginButton} onClick={handleGoToLogin}> <span>로그인하러 가기</span></button>
    </div>
  );
}

export default SignupDone;
