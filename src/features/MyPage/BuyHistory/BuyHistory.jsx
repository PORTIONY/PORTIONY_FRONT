import React, { useState } from 'react';
import styles from './BuyHistory.module.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../../components/DropDown/DropDown';
import ProductList from '../../../components/ProductList/productList';
import Pagination from '../../../components/Pagination/Pagination';
import logo from '../../../assets/Ellipse 23.png';

const products = [
  {
    id: 1,
    name: '치이카와 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-07',
  },
  {
    id: 2,
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '중곡동',
    endDate: '2025-07-12',
  },
  {
    id: 3,
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '면목동',
    endDate: '2025-07-10',
  },
  {
    id: 4,
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-08',
  },
  {
    id: 5,
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-09',
  },
  {
    id: 6,
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-10',
  },
  {
    id: 7,
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-11',
  },
  {
    id: 8,
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-12',
  },
  {
    id: 9,
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-13',
  },
  {
    id: 10,
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-14',
  },
  {
    id: 11,
    name: '짱구 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-15',
  },
  {
    id: 12,
    name: '도라에몽 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-16',
  },
  {
    id: 13,
    name: '훈이 스티커 함께 나눠요',
    price: '6,000 원',
    details: '구매 일자 : 2025-07-04',
    image: logo,
    location: '망우본동',
    endDate: '2025-07-17',
  }
];

export default function BuyHistory() {
  const [dateSort, setDateSort] = useState('최신 순');
  const [priceSort, setPriceSort] = useState('금액');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();

  // 정렬
  let filtered = [...products];
  if (dateSort === '최신 순') {
    filtered = filtered.sort((a, b) => b.endDate.localeCompare(a.endDate));
  } else if (dateSort === '오래된 순') {
    filtered = filtered.sort((a, b) => a.endDate.localeCompare(b.endDate));
  }
  if (priceSort === '금액 높은 순') {
    filtered = filtered.sort(
      (a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
    );
  } else if (priceSort === '금액 낮은 순') {
    filtered = filtered.sort(
      (a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
    );
  }

  // 페이지네이션
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const pagedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // 상품 클릭시 상세 이동
  const handleProductClick = (product) => {
    navigate(`/group-buy/${product.id}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>구매 내역</h2>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          options={['최신 순', '오래된 순']}
          selected={dateSort}
          setSelected={setDateSort}
          placeholder="날짜"
        />
        <Dropdown
          options={['금액 높은 순', '금액 낮은 순']}
          selected={priceSort}
          setSelected={setPriceSort}
          placeholder="금액"
        />
      </div>
      <div className={styles.content}>
        {pagedProducts.length > 0 ? (
          <ProductList
            products={pagedProducts}
            onClickProduct={handleProductClick}
          />
        ) : (
          <p className={styles.empty}>구매 내역이 없습니다.</p>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
