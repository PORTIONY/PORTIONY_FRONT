import React, { useState, useEffect } from 'react';
import back from '../../../assets/chevron-left.svg';
import location from '../../../assets/location.svg';
import styles from './SignupLocation.module.css';
import search from '../../../assets/search(gray).svg';

function SignupLocation({ onNext, onBack }) {
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);
const [selected, setSelected] = useState('');
const [currentLocation, setCurrentLocation] = useState('');

const handleCurrentLocation = () => {
  if (!navigator.geolocation) {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
          const address = await fetchAddressFromCoords(latitude, longitude);
          setCurrentLocation(address);
          setSelected(address);
      } catch (err) {
          console.error('주소 변환 실패:', err);
          alert('위치 정보를 가져오는 데 실패했습니다.');
      }
  });
};

//카카오API기준 (다른API사용 시 삭제)
const fetchAddressFromCoords = async (lat, lon) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
    {
        headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        },
    }
  );

  const data = await res.json();
  const region = data.documents?.[0];

  if (!region) {
    return '주소 변환 실패';
  }

  return `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;  
  // 예: 경기도 평택시 중앙동
  };

  const handleSearch = async () => {
      const res = await fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(searchTerm)}`,
          {
          headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
          },
          }
      );

      const data = await res.json();
      const results = data.documents.map((doc) => doc.address.address_name); // 전체 주소 추출

      setResults(results); // 검색어포함 동네 리스트 저장 (검색결과)
};

return (
  <>
    <div className={styles.allContainer}>
        <div className={styles.backWrapper}>
            <img src={back} alt="뒤로가기" className={styles.backIcon} onClick={onBack}/>
            <span className={styles.signupTitle}>회원가입</span>
        </div>
        
        <h2 className={styles.heading}>내 동네 둘러보기</h2>

        <div className={styles.searchFormWrapper}>
          <button className={styles.locationButton} onClick={handleCurrentLocation}>
              <img src = {location} alt='위치' className={styles.locationIcon}/>
              <span>현재 위치로 찾기</span>
          </button>

          <div className={styles.searchForm}>
            <input
              type="text"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              //Enter키 눌러도 검색
              onKeyDown={(e) => {if (e.key === 'Enter') handleSearch();}}
              placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"/>

            <img src = {search} alt='검색' className = {styles.searchIconInside} onClick = {() => handleSearch()}/>
          </div>
        </div>

        <div className={styles.resultBox}>
          <p className={styles.resultItemLabel}>‘{searchTerm}’ 검색 결과</p>

          <hr className={styles.resultBoxDivider}/>

          {results.map((item, idx) => (
            <div
                key={idx}
                className={`${styles.resultItemText} ${selected === item ? styles.selectedItem : ''}`}
                onClick={() => setSelected(item)}> {item}
            </div>
          ))} 

          {results.length === 0 && searchTerm && (
              <p className={styles.noResultText}>검색 결과가 없습니다.</p>
          )}
        </div>

        <div className={`${styles.confirmBox} ${selected ? styles.visible : styles.hidden}`}>
          {selected && (
            <p className={styles.selectedText}> {selected}로 시작하시겠어요?</p>
          )}
        </div>

        <button className={styles.nextButton} onClick={onNext} disabled={!selected}><span>다음</span></button>
      </div> 
    </>
  );
}

export default SignupLocation;
