import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import userProfileImage from '../../assets/profile-image.svg';

import logo from '../../assets/logo.svg';

function Header({isLoggedIn}) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Portiony 로고" className={styles.logoImg} />
      </Link>

      <nav className={styles.nav}>
        <Link to="/chat" className={location.pathname.startsWith('/chat') ? styles.active : ''}>
          채팅방
        </Link>
        <Link to="/community" className={location.pathname.startsWith('/community') ? styles.active : ''}>
          커뮤니티
        </Link>
        <Link to="/mypage" className={location.pathname.startsWith('/mypage') ? styles.active : ''}>
          마이페이지
        </Link>
      </nav>

      {isLoggedIn ? (
        <div className={styles.profileWrapper}>
          <img src={userProfileImage} alt="유저프로필사진" className={styles.profileImage}/>
        </div>
      ) : (
        <Link to="/login" className={styles.loginButton}>로그인</Link>
      )}
    </header>
  );
}

export default Header;
