import React from 'react';
import character from '../../assets/logoportiony.svg'; 
import styles from './Login.module.css'; //

function Login({ setIsLoggedIn }) {
  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 처리 예시
  };

  return (
    <div className={styles.container}>
      <img src={character} alt="캐릭터 로고" className={styles.character} />

      <p className={styles.slogan}>함께 사서, 함께 나누는 새로운 소비 문화</p>

      <button className={styles.kakaoButton} onClick={handleLogin}>카카오 로그인</button>
      <button className={styles.loginButton} onClick={handleLogin}>로그인</button>

      <p className={styles.signupText}>
        첫 방문이신가요? <a href="#" className={styles.signupLink}>회원가입</a>
      </p>
    </div>
  );
}

export default Login;
