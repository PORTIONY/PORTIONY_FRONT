import React from 'react';
import styles from './productList.module.css';

import mapIcon from '../../assets/location_on.svg'; 
import clockIcon from '../../assets/alarm.svg';

function getDDay(endDate) {
  const end = new Date(endDate);
  const now = new Date();
  end.setHours(0,0,0,0);
  now.setHours(0,0,0,0);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return '마감';
  if (diffDays === 0) return 'D-day';
  return `D-${diffDays}`;
}

export default function ProductList({ products: propProducts }) {
  const data = propProducts || [];

  return (
    <div className={styles.container}>
      {data.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <div className={styles.imageContainer}>
            <div className={styles.topBadges}>
              <span className={styles.badgeLocation}>
                <img
                  src={mapIcon}
                  alt="위치"
                  className={styles.icon}
                />
                {product.location}
              </span>
              <span className={styles.badgeDDay}>
                <img
                  src={clockIcon}
                  alt="마감"
                  className={styles.icon}
                />
                {getDDay(product.endDate)}
              </span>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
            <p className={styles.productDetails}>{product.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
