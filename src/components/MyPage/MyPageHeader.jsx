import React, { useState, useRef, useEffect } from 'react';
import styles from './MyPageHeader.module.css';
import profile from '../../assets/Ellipse 23.png';
import questionIcon from '../../assets/question-icon.svg';
import ProfileEditModal from './ProfileEditModal'; 

function MyPageHeader() {
  const potionyPercent = 62.5; // 예시 퍼센트

  const gradientStyle = {
    background: `conic-gradient(#fff ${potionyPercent}%, #000 ${potionyPercent}% 100%)`
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();

  // 모달 오픈 상태
  const [modalOpen, setModalOpen] = useState(false);

  // 바깥 클릭 시 툴팁 닫기
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <img src={profile} alt="프로필 이미지" className={styles.profile} />
          <div className={styles.infoBox}>
            <p className={styles.name}>박지현</p>
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
        {/* 프로필 편집 버튼 */}
        <button className={styles.editBtn} onClick={() => setModalOpen(true)}>
          프로필 편집
        </button>
      </div>
      {/* 프로필 편집 모달 */}
      <ProfileEditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default MyPageHeader;
