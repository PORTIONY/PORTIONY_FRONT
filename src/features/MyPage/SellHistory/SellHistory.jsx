import React, { useState } from 'react';
import styles from './SellHistory.module.css';
import Dropdown from '../../../components/DropDown/DropDown';

export default function BuyHistory() {
  const [dateSort, setDateSort] = useState('일자');
  const [priceSort, setPriceSort] = useState('금액');
  const [statusSort, setStatusSort] = useState('공구 상태');


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
        <p className={styles.empty}>판매 내역이 없습니다.</p>
      </div>
    </div>
  );
}
