// components/Common/DdayBadge.jsx
import React from 'react';
import styles from './ChatDdaybadge.module.css';
import clock from '../../../assets/alarmWhite.svg';

// function DdayBadge({ text }) {
//   return (
//     <div className={styles.badge}>
//       <img src={clock} alt="알람 아이콘" className={styles.icon} />
//       <span className={styles.text}>{text}</span>
//     </div>
//   );
// }

// export default DdayBadge;

function DdayBadge({ text }) {
  const isClosing = text === '공구마감';

  return (
    <div
      className={`${styles.badge} ${isClosing ? styles.closing : ''}`}
    >
      {!isClosing && (
        <img
          src={clock}
          alt="알람 아이콘"
          className={styles.icon}
        />
      )}
      <span className={styles.text}>{text}</span>
    </div>
  );
}
export default DdayBadge;