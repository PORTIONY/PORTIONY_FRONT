import React, { useState } from 'react';
import styles from './Likes.module.css';
import Dropdown from '../../../components/DropDown/DropDown';

export default function LikesHistory() {
  const [sortOption,   setSortOption]   = useState('정렬 기준'); 
  const [statusOption, setStatusOption] = useState('공구 상태'); 

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>찜 내역</h2>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          options={['마감 임박순', '마감 여유순', '최근 찜순', '오래된 찜순']}
          selected={sortOption}
          setSelected={setSortOption}
          placeholder="정렬 기준"
        />
        <Dropdown
          options={['공구 중', '공구 완료']}
          selected={statusOption}
          setSelected={setStatusOption}
          placeholder="공구 상태"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.empty}>찜 내역이 없습니다.</p>
      </div>
    </div>
  );
}
