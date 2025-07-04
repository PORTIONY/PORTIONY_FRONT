import React from 'react';
import styles from './LocationModal.module.css';
import typography from './Typography.module.css';

import locationIcon from '../../assets/location_on.svg';
import closeIcon from '../../assets/x.svg';

const dummyResults = [
  '경기도 용인시 처인구 중앙동',
  '충남 천안시 동남구 중앙동',
  '경기도 안산시 단원구 중앙동',
  '경기도 평택시 중앙동',
  '경기도 용인시 처인구 중앙동',
  '충남 천안시 동남구 중앙동',
  '경기도 안산시 단원구 중앙동',
  '경기도 평택시 중앙동',
  '경기도 용인시 처인구 중앙동',
  '충남 천안시 동남구 중앙동',
  '경기도 안산시 단원구 중앙동',
  '경기도 평택시 중앙동',

];

function LocationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className={`${styles.overlay} ${typography.body1}`} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={typography.title2}>지역 변경</span>
            <img
              src={closeIcon}
              alt="닫기"
              className={styles.closeBtn}
              onClick={onClose}
            />
          </div>
          <button className={styles.currentLocationBtn}>
            <img src={locationIcon} alt="위치아이콘" className={styles.locationIcon} />
            <span>현재 위치로 찾기</span>
          </button>

          <div className={styles.searchBox}>
            <input className={styles.searchInput} placeholder="검색어를 입력하세요" />
            <button className={styles.searchBtn}/>
          </div>
        </div>

        

        <div className={styles.searchResult}>
          <span>‘중앙동’ 검색 결과</span>
          <hr className={styles.hr}/>
          <div className={styles.resultList}>
            {dummyResults.map((result, index) => (
              <span
                key={index}
                className={styles.resultItem}
              >
                {result}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LocationModal;
