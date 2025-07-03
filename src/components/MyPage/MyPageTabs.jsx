import React from 'react';
import styles from './MyPageTabs.module.css';

function MyPageTabs({ selectedTab, setSelectedTab }) {
  const tabItems = [
    { key: 'buy', label: '구매 내역' },
    { key: 'sell', label: '판매 내역' },
    { key: 'review', label: '거래 후기 내역' },
    { key: 'like', label: '찜 내역' },
    { key: 'inquiry', label: '문의 내역' }
  ];

  return (
    <nav className={styles.nav}>
      {tabItems.map(tab => (
        <button
          key={tab.key}
          className={`${styles.tabButton} ${selectedTab === tab.key ? styles.active : ''}`}
          onClick={() => setSelectedTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default MyPageTabs;
