import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeBody.module.css';
import typography from './Typography.module.css';

import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';

import ProductList from '../ProductList/productList';
import Pagination from '../../components/PageNumber/Pagination';
import Dropdown from '../../components/DropDown/DropDown';
import dummyProducts from '../../data/dummyProduct';
import dummyTransactions from '../../data/dummyTransaction';

const images = [
    banner1,
    banner2,
    banner3
];

function HomeBody({ selectedAddress, selectedCategory, searchKeyword }) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateSort, setDateSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 페이지당 상품 개수

  // 슬라이더 이미지 변경을 위한 타이머 설정
  useEffect(() => {
    const timer = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 6000); // 6초 간격

  return () => clearInterval(timer);
  }, [currentIndex]);

  
  // 구매 완료 집계
  const transactions = {};

  dummyTransactions.forEach(tx => {
    const productId = tx.productId;

    if (transactions[productId]) {
      // 이미 등장한 productId면 카운트 증가
      transactions[productId] += 1;
    } else {
      // 처음 등장한 productId면 카운트 1로 초기화
      transactions[productId] = 1;
    }
  });

  // 상품 데이터
  const products = dummyProducts
    .filter(item => {
      const isSameLocation = item.location === selectedAddress;
      const isSameCategory = selectedCategory === '전체' ? true : item.category === selectedCategory;
      const isSearchMatch = searchKeyword ? item.title.toLowerCase().includes(searchKeyword.toLowerCase()) : true;
      return isSameLocation && isSameCategory && isSearchMatch;
    })
    .map(item => ({
      id: item.id,
      name: item.title,
      price: `${Number(item.price).toLocaleString()} 원`,
      image: item.images[0],
      location: item.location,
      endDate: item.deadline,
      people: item.people,
      completedCount: transactions[item.id] || 0 
    }));

  
  // 날짜 정렬
  // dateSort가 '최신 순'이면 최신 날짜부터, '오래된 순'이면 오래된 날짜부터 정렬
  let filtered = [...products];
  if (dateSort === '최신 순') {
    filtered = filtered.sort((a, b) => b.endDate.localeCompare(a.deadline));
  } else if (dateSort === '오래된 순') {
    filtered = filtered.sort((a, b) => a.endDate.localeCompare(b.deadline));
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const pagedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return(
    <div className={styles.container}>
      {/* 배너 슬라이더 */}
      <div className={styles.bannerWrapper}>
        <div
          className={styles.slider}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <img key={i} src={src} alt={`slide-${i}`} className={styles.slideImage} />
          ))}
        </div>
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* 상품 목록 */}
      <div className={styles.content}>
        <div className={styles.controlBar}>
          <div className={styles.filterSection}>
            <Dropdown
              options={['최신 순', '오래된 순']}
              selected={dateSort}
              setSelected={setDateSort}
              placeholder="날짜"
            />
            <div className={styles.checkbox}>
              <label className={styles.customCheckbox}>
                <input type="checkbox" />
                <span className={styles.customBox}></span>
              </label>
              <span className={typography.body1}>
                  공구 마감된 상품 보기
              </span>
            </div>
          </div>
          <div className={styles.actionSection}>
              <span className={typography.body1}>함께 구매하고, 더 좋은 나눔을 해요!</span>
              <button 
                className={`${styles.writeBtn} ${typography.body1}`}
                onClick={() => navigate('/group-buy/new')}
              >판매 등록</button>
          </div>
        </div>
        <div>
          {pagedProducts.length > 0 ? (
            <ProductList
              products = {pagedProducts}
              context = "home"
            />
          ) : (
            <p className={styles.empty}>구매 내역이 없습니다.</p>
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default HomeBody;