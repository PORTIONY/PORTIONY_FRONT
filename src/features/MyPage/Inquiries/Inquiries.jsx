import React, { useState } from 'react';
import styles from './Inquiries.module.css';
import Dropdown from '../../../components/DropDown/DropDown';

export default function InquiriesHistory() {
  const [statusSort, setStatusSort] = useState('문의 상태'); 
  const [typeSort,   setTypeSort]   = useState('문의 유형'); 

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 내역</h2>
      <div className={styles.dropdownWrapper}>
        <Dropdown
          options={['처리 전', '처리 완료']}
          selected={statusSort}
          setSelected={setStatusSort}
          placeholder="문의 상태"
        />
        <Dropdown
          options={[
            '상품 관련',
            '결제·환불',
            '판매자 응대',
            '사기 의심',
            '커뮤니티/콘텐츠',
            '기타'
          ]}
          selected={typeSort}
          setSelected={setTypeSort}
          placeholder="문의 유형"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.empty}>문의 내역이 없습니다.</p>
      </div>
    </div>
  );
}
