import React, { useState } from 'react';
import styles from './SellHistory.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import ProductList from '../../../components/ProductList/productList';
import logo from '../../../assets/Ellipse 23.png';
import arrowIcon from '../../../assets/chevron-left.svg';

const products = [
  {
    name: '치이카와 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-07',
  },
  {
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '중곡동',
    endDate: '2025-07-12',
  },
  {
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '면목동',
    endDate: '2025-07-10',
  },
  {
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-08',
  },
  {
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-09',
  },
  {
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-10',
  },
  {
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-11',
  },
  {
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-12',
  },
  {
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-13',
  },
  {
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-14',
  },
  {
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-15',
  },
  {
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-16',
  },
  {
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-17',
  }
];

export default function SellHistory() {
  const [dateSort, setDateSort] = useState('일자');
  const [priceSort, setPriceSort] = useState('금액');
  const [statusSort, setStatusSort] = useState('공구 상태');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  let filteredProducts = products.filter(
    (item) =>
      (statusSort === '공구 상태' || item.status === statusSort)
  );

  if (dateSort === '최신 순')
    filteredProducts = filteredProducts.sort((a, b) => b.endDate.localeCompare(a.endDate));
  else if (dateSort === '오래된 순')
    filteredProducts = filteredProducts.sort((a, b) => a.endDate.localeCompare(b.endDate));

  if (priceSort === '금액 높은 순')
    filteredProducts = filteredProducts.sort(
      (a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
    );
  else if (priceSort === '금액 낮은 순')
    filteredProducts = filteredProducts.sort(
      (a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
    );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>판매 내역</h2>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          options={['최신 순', '오래된 순']}
          selected={dateSort}
          setSelected={setDateSort}
          placeholder="일자"
        />
        <Dropdown
          options={['금액 높은 순', '금액 낮은 순']}
          selected={priceSort}
          setSelected={setPriceSort}
          placeholder="금액"
        />
        <Dropdown
          options={['공구 중', '공구 완료']}
          selected={statusSort}
          setSelected={setStatusSort}
          placeholder="공구 상태"
        />
      </div>
      <div className={styles.content}>
        {pagedProducts.length > 0 ? (
          <ProductList products={pagedProducts} />
        ) : (
          <p className={styles.empty}>판매 내역이 없습니다.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={styles.arrowButton}
          >
            <img src={arrowIcon} alt="이전" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={
                currentPage === i + 1
                  ? `${styles.pageNumber} ${styles.activePage}`
                  : styles.pageNumber
              }
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`${styles.arrowButton} ${styles.nextArrow}`}
          >
            <img src={arrowIcon} alt="다음" style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      )}
    </div>
  );
}
