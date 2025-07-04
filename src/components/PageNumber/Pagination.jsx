import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages < 2) return null; 

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={
            currentPage === i + 1
              ? `${styles.pageNumber} ${styles.activePage}`
              : styles.pageNumber
          }
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        &gt;
      </button>
    </div>
  );
}
