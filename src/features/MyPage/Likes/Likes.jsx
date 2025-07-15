import React, { useState } from 'react';
import styles from './Likes.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import ProductList from '../../../components/ProductList/productList';
import Pagination from '../../../components/PageNumber/Pagination';
import dummyProducts from '../../../data/dummyProduct';

export default function LikesHistory() {
  const [sortOption, setSortOption] = useState('정렬 기준');
  const [statusOption, setStatusOption] = useState('공구 상태');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const likedIds = [1, 3, 7, 13, 15, 17, 22];

  const products = dummyProducts
    .filter(item => likedIds.includes(item.id))
    .map(item => ({
      id: item.id,
      name: item.title,
      price: `${Number(item.price).toLocaleString()} 원`,
      details: `등록 일자 : ${item.createdAt}`,
      image: item.images[0],
      location: item.location,
      endDate: item.deadline,
      status: Number(item.id) % 2 === 0 ? '공구 완료' : '공구 중', 
    }));

  let filtered = products.filter(
    (item) => statusOption === '공구 상태' || item.status === statusOption
  );

  if (sortOption === '마감 임박순') {
    filtered = filtered.sort((a, b) => a.endDate.localeCompare(b.endDate));
  } else if (sortOption === '마감 여유순') {
    filtered = filtered.sort((a, b) => b.endDate.localeCompare(a.endDate));
  } else if (sortOption === '최근 찜순') {
    filtered = filtered.sort((a, b) => a.endDate.localeCompare(b.endDate));
  } else if (sortOption === '오래된 찜순') {
    filtered = filtered.sort((a, b) => b.endDate.localeCompare(a.endDate));
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
