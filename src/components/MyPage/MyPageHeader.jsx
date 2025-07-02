import React from 'react';
import styles from './MyPageHeader.module.css';
import profile from '../../assets/Ellipse 23.png';
import questionIcon from '../../assets/question-icon.svg';

function MyPageHeader() {
  const potionyPercent = 62.5; // 예시 퍼센트

  const gradientStyle = {
    background: `conic-gradient(#fff ${potionyPercent}%, #000 ${potionyPercent}% 100%)`
    // #fff 채움, 나머지 #000 배경
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <img src={profile} alt="프로필 이미지" className={styles.profile} />

        <div className={styles.infoBox}>
          <p className={styles.name}>박지현</p>
          <p className={styles.history}>
            누적 거래 횟수 : 12회 (구매 0회 / 판매 5회)
          </p>

          <div className={styles.potionyWrapper}>
            <div className={styles.potionyBox}>
              <span>나의 포셔니는</span>

              <div
                className={styles.progressCircle}
                style={gradientStyle}
              />

              <span className={styles.percent}>{potionyPercent}%</span>
            </div>

            <img
              src={questionIcon}
              alt="도움말"
              className={styles.tooltipImg}
            />
          </div>
        </div>
      </div>

      <button className={styles.editBtn}>프로필 편집</button>
    </div>
  );
}

export default MyPageHeader;
