import React, { useState } from 'react';
import styles from './BuyHistory.module.css';
import Dropdown from '../../../components/DropDown/DropDown';

export default function BuyHistory() {
  const [dateSort, setDateSort] = useState('날짜');
  const [priceSort, setPriceSort] = useState('금액');

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
        <p className={styles.empty}>구매 내역이 없습니다.</p>
      </div>
    </div>
  );
}
