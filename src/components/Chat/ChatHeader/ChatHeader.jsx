// components/Chat/ChatHeader/ChatHeader.jsx
import React from 'react';
import clock from '../../../assets/alarm.svg';
import styles from './ChatHeader.module.css';
import moreBtn from '../../../assets/more_vert.svg';
import DdayBadge from '../ChatDdaybadge/ChatDdaybadge';

function ChatHeader({ partnerName, postImage, title, price, ddayText }) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topRow}>
        {/* 이름, 더보기 버튼 */}
        <span className={styles.partnerName}>{partnerName}</span>
        <button className={styles.moreBtn}>
            <img src={moreBtn}/>
        </button>
      </div>

      <div className={styles.contentRow}>
        <div className={styles.leftSection}>
          <img src={postImage} alt="상품" className={styles.productImage} />
          <div className={styles.textSection}>
            <div className={styles.title}>
              {title.length > 34 ? `${title.slice(0, 36)}...` : title}
            </div>
            <div className={styles.price}>{price}원</div>
          </div>
        </div>

        <div className={styles.badgeWrapper}>
          <DdayBadge text={ddayText} />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
