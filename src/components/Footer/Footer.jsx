import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import logo_black from '../../assets/Logo_black.svg';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.links}>
            <span className={styles.link}>서비스 통합 약관</span>
            <span className={styles.link}>이용 유의사항 & 커뮤니티 규칙</span>
            <span className={styles.link}>자주 묻는 질문(FAQ)</span>
            <span className={styles.link}>공지사항</span>
            <span className={styles.link}>문의하기</span>
            <span className={styles.link}>신고하기</span>
          </div>

          <a href="/" onClick={handleLogoClick} className={styles.logo}>
            <img src={logo_black} alt="Portiony 로고" className={styles.logoImg} />
          </a>

          <div className={styles.slogan}>함께 사서, 함께 나누는 새로운 소비 문화</div>
          <div className={styles.copyright}>
            COPYRIGHT © Portiony. All rights reserved.
          </div>
        </div>

        <div className={styles.right}>
          <p>Portiony 사업자 정보</p>
          <p>대표자: 팀 포셔니</p>
          <p>EMAIL: thotemily@naver.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
