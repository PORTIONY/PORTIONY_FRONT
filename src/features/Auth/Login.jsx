import React, { useState } from 'react';
import character from '../../assets/logoportiony.png';
import back from '../../assets/chevron-left.svg';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [status, setStatus] = useState('init'); 
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLoginClick = () => {
    setStatus('form'); // 로그인 폼 보여주기
  };

  const handleFinalLogin = () => {
    // 로그인 완료 후 완료 화면으로
    setStatus('done');
  };

  const goToMain = () => {
    // 메인 홈으로 이동
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {status === 'init' && (
        <>
          <img src={character} alt="캐릭터 로고" className={styles.character} />
          <p className={styles.slogan}>함께 사서, 함께 나누는 새로운 소비 문화</p>
          <button className={styles.kakaoButton} onClick={handleLoginClick}>카카오 로그인</button>
          <button className={styles.loginButton} onClick={handleLoginClick}>로그인</button>
          <p className={styles.signupText}>
            첫 방문이신가요? <Link to="/signup" className={styles.signupLink}>회원가입</Link>
          </p>
        </>
      )}

      {status === 'form' && (
        <>
          <div className={styles.backWrapper}>
            <img
              src={back}
              alt="뒤로가기"
              className={styles.backIcon}
              onClick={() => setStatus('init')}
            />
            <span className={styles.loginTitle}>로그인</span>
          </div>
          <img src={character} alt="캐릭터 로고" className={styles.logoTop}/>

          <div className={styles.formGroup}>
            <input type="email" placeholder="이메일을 입력해주세요." 
              className={styles.input} onChange={(e) => setUserEmail(e.target.value)}/>

            <input type="password" placeholder="비밀번호를 입력해주세요." 
              className={styles.input} onChange={(e) => setUserPassword(e.target.value)}/>
          </div>

          <button 
            type='button'
            className={styles.loginButton} 
            onClick={handleFinalLogin}
            disabled={!userEmail || !userPassword}>
            로그인
          </button>
          <p className={styles.signupText}>
            첫 방문이신가요? <a href="/signup" className={styles.signupLink}>회원가입</a>
          </p>
        </>
      )}

      {status === 'done' && (
        <>
          <img src={character} alt="캐릭터 로고" className={styles.character}/>
          <p className={styles.slogan_dif}>함께 사서, 함께 나누는 새로운 소비 문화</p>
          <p className={styles.loginText}>로그인 완료되었습니다!</p>
          <button className={styles.loginCompleteButton} onClick={goToMain}>메인 홈으로 가기</button>
        </>
      )}
    </div>
  );
}

export default Login;
