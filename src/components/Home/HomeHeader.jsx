import React, { useState } from 'react';
import styles from './HomeHeader.module.css';
import typography from './Typography.module.css';
import locationIcon from '../../assets/location_on.svg';

const categories = ['의류', '반려동물', '문구류', '육아용품', '화장품/뷰티', '잡화/기타'];


function HomeHeader({ onLocationClick, selectedAddress, selectedCategory, onCategoryChange, searchKeyword, onSearchKeywordChange }) {
  const [inputValue, setInputValue] = useState(searchKeyword || '');

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 검색 실행 함수
  // 검색 버튼 클릭 또는 엔터 키 입력 시 호출
  const handleSearch = () => {
    onSearchKeywordChange(inputValue);
    console.log(`검색어: ${inputValue}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 주소가 '시/도 구/군 동' 형식일 때, 구와 동을 반환
  // 예: '서울특별시 중랑구 망우본동' -> '중랑구/망우본동'
  const getGuDongFromAddress = (selectedAddress) => {
    const addressParts  = selectedAddress.split(' ');
    if (addressParts .length >= 2) {
      const gu = addressParts[addressParts.length - 2];
      const dong = addressParts[addressParts.length - 1];
      return `${gu}/${dong}`;
    }
    // 만약 주소 형식이 예상과 다를 경우, 전체 주소를 반환
    return selectedAddress;
  };

  return (
    <div className={styles.homeHeader}>
      <div className={styles.searchBarWrapper}>
    <button className={styles.locationBtn} onClick={onLocationClick}>
      <div className={styles.locationContent}>
        <img src={locationIcon} alt="위치아이콘" className={styles.locationIcon} />
        <span className={typography.body1}>{getGuDongFromAddress(selectedAddress)}</span>
      </div>
    </button>
    <div className={styles.searchBox}>
      <input 
        className={styles.searchInput} 
        placeholder="검색어를 입력하세요" 
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button 
        className={styles.searchBtn}
        onClick={handleSearch}
      />
    </div>
  </div>

  <div className={styles.categoryList}>
    {categories.map((cat, i) => (
      <div 
        key={i} 
        className={`${styles.categoryCard} ${selectedCategory === cat ? styles.active : ''}`}
        onClick={() => {
          const isSame = selectedCategory === cat;
          onCategoryChange(isSame ? '전체' : cat);
        }}
      >
        <img className={styles.categoryIcon} src="https://placehold.co/40x40" />
        <span className={`${styles.categoryLabel} ${typography.body2}`}>{cat}</span>
      </div>
    ))}
  </div>
  </div>
   );
}

export default HomeHeader;