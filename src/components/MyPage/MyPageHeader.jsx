import React, { useState, useRef, useEffect } from 'react';
import styles from './MyPageHeader.module.css';
import profileDefault from '../../assets/Ellipse 23.png';
import questionIcon from '../../assets/question-icon.svg';
import ProfileEditModal from './ProfileEditModal';

function MyPageHeader() {
  const potionyPercent = 62.5;
  const gradientStyle = {
    background: `conic-gradient(#fff ${potionyPercent}%, #000 ${potionyPercent}% 100%)`
  };

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState(profileDefault);

  // ★ 최초 진입 시 localStorage에 password 없으면 '1234'로 세팅 (테스트용)
  useEffect(() => {
    if (!localStorage.getItem('password')) {
      localStorage.setItem('password', '1234');
    }
    setNickname(localStorage.getItem('nickname') || '박지현');
    setEmail(localStorage.getItem('email') || 'multicampus@naver.com');
    setProfileImg(localStorage.getItem('profileImg') || profileDefault);
    // 비밀번호는 화면에 노출하지 않음
  }, []);

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    }
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const handleSaveProfile = ({ nickname, email, profileImg }) => {
    setNickname(nickname);
    setEmail(email);
    if (profileImg) setProfileImg(profileImg);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('email', email);
    if (profileImg) localStorage.setItem('profileImg', profileImg);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <img src={profileImg} alt="프로필 이미지" className={styles.profile} />
          <div className={styles.infoBox}>
            <p className={styles.name}>{nickname}</p>
            <p className={styles.history}>
              누적 거래 횟수 : 12회 (구매 0회 / 판매 5회)
            </p>
            <div className={styles.potionyWrapper} style={{ position: "relative" }}>
              <div className={styles.potionyBox}>
                <span>나의 포셔니는</span>
                <div className={styles.progressCircle} style={gradientStyle} />
                <span className={styles.percent}>{potionyPercent}%</span>
              </div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={questionIcon}
                  alt="도움말"
                  className={styles.tooltipImg}
                  onClick={() => setShowTooltip(prev => !prev)}
                  style={{ zIndex: 2 }}
                />
                {showTooltip && (
                  <div ref={tooltipRef} className={styles.tooltipBubble}>
                    이 지표는 내가 받은 거래 후기 중<br />
                    ‘좋았어요’ 평가의 비율을 %로 보여줘요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className={styles.editBtn} onClick={() => setModalOpen(true)}>
          프로필 편집
        </button>
      </div>
      <ProfileEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        currentProfile={{
          nickname,
          email,
          profileImg
        }}
        onSave={handleSaveProfile}
      />
    </>
  );
}

export default MyPageHeader;
