import React, { useState } from 'react';
import styles from './BuyHistory.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import ProductList from '../../../components/ProductList/productList';
import Pagination from '../../../components/PageNumber/Pagination';
import dummyProducts from '../../../data/dummyProduct';

export default function BuyHistory() {
  const [dateSort, setDateSort] = useState('날짜');
  const [priceSort, setPriceSort] = useState('금액');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const buyIds = [1, 2, 5, 6, 8, 14, 18, 22]; 

  const products = dummyProducts
    .filter(item => buyIds.includes(item.id))
    .map(item => ({
      id: item.id,
      name: item.title,
      price: `${Number(item.price).toLocaleString()} 원`,
      details: `구매 일자 : ${item.deadline}`,
      image: item.images[0],
      location: item.location,
      endDate: item.deadline,
    }));

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

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const pagedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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
