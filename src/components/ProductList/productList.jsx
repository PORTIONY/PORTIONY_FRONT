import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function ProductList({ products: propProducts, onClickProduct }) {
  const data = propProducts || [];
  const navigate = useNavigate();

  const handleClick = (product) => {
    if (onClickProduct) {
      onClickProduct(product); // 외부에서 prop이 넘어오면 그걸 우선!
    } else {
      navigate(`/group-buy/${product.id}`); // 아니면 상세페이지로 이동
    }
  };

  return (
    <div className={styles.container}>
      {data.map((product, index) => (
        <div
          key={product.id || index}
          className={styles.productCard}
          onClick={() => handleClick(product)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.imageContainer}>
            <div className={styles.topBadges}>
              <span className={styles.badgeLocation}>
                <img src={mapIcon} alt="위치" className={styles.icon} />
                {product.location}
              </span>
              <span className={styles.badgeDDay}>
                <img src={clockIcon} alt="마감" className={styles.icon} />
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
