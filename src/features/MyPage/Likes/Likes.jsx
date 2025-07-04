import React, { useState } from 'react';
import styles from './Likes.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import ProductList from '../../../components/ProductList/productList';
import Pagination from '../../../components/Pagination/Pagination';
import logo from '../../../assets/Ellipse 23.png';

export default function LikesHistory() {
  const [sortOption, setSortOption] = useState('정렬 기준');
  const [statusOption, setStatusOption] = useState('공구 상태');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const products = [
    {
      name: '치이카와 스티커 함께 나눠요',
      price: '6,000 원',
      details: '찜한 날짜 : 2025-07-03',
      image: logo,
      location: '망우본동',
      endDate: '2025-07-07',
      status: '공구 중',
      likedDate: '2025-07-03',
    },
    {
      name: '짱구 인형 공동구매',
      price: '12,000 원',
      details: '찜한 날짜 : 2025-07-02',
      image: logo,
      location: '중곡동',
      endDate: '2025-07-12',
      status: '공구 완료',
      likedDate: '2025-07-02',
    },
    {
      name: '도라에몽 인형 공동구매',
      price: '8,000 원',
      details: '찜한 날짜 : 2025-07-01',
      image: logo,
      location: '면목동',
      endDate: '2025-07-10',
      status: '공구 중',
      likedDate: '2025-07-01',
    },
    {
      name: '훈이 인형 공동구매',
      price: '10,000 원',
      details: '찜한 날짜 : 2025-07-04',
      image: logo,
      location: '망우본동',
      endDate: '2025-07-11',
      status: '공구 완료',
      likedDate: '2025-07-04',
    },
    {
      name: '포켓몬 인형 나눔',
      price: '15,000 원',
      details: '찜한 날짜 : 2025-07-05',
      image: logo,
      location: '신내동',
      endDate: '2025-07-13',
      status: '공구 중',
      likedDate: '2025-07-05',
    },
    {
      name: '유미의 세포 인형',
      price: '9,500 원',
      details: '찜한 날짜 : 2025-07-05',
      image: logo,
      location: '상봉동',
      endDate: '2025-07-09',
      status: '공구 중',
      likedDate: '2025-07-05',
    },
    {
      name: '몽글몽글 쿠션',
      price: '13,000 원',
      details: '찜한 날짜 : 2025-07-06',
      image: logo,
      location: '망우본동',
      endDate: '2025-07-15',
      status: '공구 완료',
      likedDate: '2025-07-06',
    },
    {
      name: '카카오프렌즈 리미티드 인형',
      price: '17,000 원',
      details: '찜한 날짜 : 2025-07-06',
      image: logo,
      location: '상봉동',
      endDate: '2025-07-15',
      status: '공구 중',
      likedDate: '2025-07-06',
    },
    {
      name: '미니언즈 봉제인형',
      price: '8,500 원',
      details: '찜한 날짜 : 2025-07-07',
      image: logo,
      location: '면목동',
      endDate: '2025-07-16',
      status: '공구 중',
      likedDate: '2025-07-07',
    },
    {
      name: '쿠로미 인형 공구',
      price: '11,000 원',
      details: '찜한 날짜 : 2025-07-08',
      image: logo,
      location: '신내동',
      endDate: '2025-07-17',
      status: '공구 중',
      likedDate: '2025-07-08',
    },
    {
      name: '짱구 수면인형',
      price: '14,000 원',
      details: '찜한 날짜 : 2025-07-09',
      image: logo,
      location: '상봉동',
      endDate: '2025-07-18',
      status: '공구 중',
      likedDate: '2025-07-09',
    },
    {
      name: '도라에몽 한정판 인형',
      price: '20,000 원',
      details: '찜한 날짜 : 2025-07-09',
      image: logo,
      location: '면목동',
      endDate: '2025-07-19',
      status: '공구 완료',
      likedDate: '2025-07-09',
    },
    {
      name: '치이카와 한정판 인형',
      price: '25,000 원',
      details: '찜한 날짜 : 2025-07-10',
      image: logo,
      location: '망우본동',
      endDate: '2025-07-20',
      status: '공구 중',
      likedDate: '2025-07-10',
    },
    {
      name: '포켓몬 2025 한정 인형',
      price: '16,000 원',
      details: '찜한 날짜 : 2025-07-11',
      image: logo,
      location: '신내동',
      endDate: '2025-07-21',
      status: '공구 완료',
      likedDate: '2025-07-11',
    },
  ];

  let filtered = products.filter(
    (item) => statusOption === '공구 상태' || item.status === statusOption
  );

  if (sortOption === '마감 임박순') {
    filtered = filtered.sort((a, b) => a.endDate.localeCompare(b.endDate));
  } else if (sortOption === '마감 여유순') {
    filtered = filtered.sort((a, b) => b.endDate.localeCompare(a.endDate));
  } else if (sortOption === '최근 찜순') {
    filtered = filtered.sort((a, b) => b.likedDate.localeCompare(a.likedDate));
  } else if (sortOption === '오래된 찜순') {
    filtered = filtered.sort((a, b) => a.likedDate.localeCompare(b.likedDate));
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const pagedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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
        {pagedProducts.length > 0 ? (
          <ProductList products={pagedProducts} />
        ) : (
          <p className={styles.empty}>찜 내역이 없습니다.</p>
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
