import React, { useState } from 'react';
import styles from './HomeHeader.module.css';
import typography from './Typography.module.css';
import locationIcon from '../../assets/location_on.svg';
import LocationModal from './LocationModal';

const categories = ['의류', '반려동물', '문구류', '육아용품', '화장품/뷰티', '잡화/기타'];

function HomeHeader({onLocationClick}) {
  const [modalOpen, setModalOpen] = useState(false);

   return (
    <div className={styles.homeHeader}>
      <div className={styles.searchBarWrapper}>
    <button className={styles.locationBtn} onClick={() => setModalOpen(true)}>
      <div className={styles.locationContent}>
        <img src={locationIcon} alt="위치아이콘" className={styles.locationIcon} />
        <span className={typography.body1}>망우본동</span>
      </div>
    </button>
    <div className={styles.searchBox}>
      <input className={styles.searchInput} placeholder="검색어를 입력하세요" />
      <button className={styles.searchBtn}/>
    </div>
  </div>

  <div className={styles.categoryList}>
    {categories.map((cat, i) => (
      <div key={i} className={styles.categoryCard}>
        <img className={styles.categoryIcon} src="https://placehold.co/40x40" />
        <span className={`${styles.categoryLabel} ${typography.body2}`}>{cat}</span>
      </div>
    ))}
  </div>

  <LocationModal open={modalOpen} onClose={() => setModalOpen(false)} />
  </div>
   );
}

export default HomeHeader;