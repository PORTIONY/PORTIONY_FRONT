import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import ReviewsModal from './ReviewsModal';
import arrowIcon from '../../../assets/chevron-left.svg';

const LOCAL_KEY = 'portiony_reviews';
function getLocalReviews() {
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : {};
}
function setLocalReview(productName, reviewData) {
  const reviews = getLocalReviews();
  reviews[productName] = reviewData;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(reviews));
}
function removeLocalReview(productName) {
  const reviews = getLocalReviews();
  delete reviews[productName];
  localStorage.setItem(LOCAL_KEY, JSON.stringify(reviews));
}

const sampleData = [
  { id: 1,  name: '치이카와 스티커', type: '구매', date: '2025-06-10', rating: 5 },
  { id: 2,  name: '짱구 스티커', type: '판매', date: '2025-06-11', rating: 4 },
  { id: 3,  name: '도라에몽 스티커', type: '판매', date: '2025-06-15', rating: 3 },
  { id: 4,  name: '치이카와 스티커', type: '판매', date: '2025-06-14', rating: 5 },
  { id: 5,  name: '치이카와 스티커', type: '구매', date: '2025-06-16', rating: 5 },
  { id: 6,  name: '치이카와 스티커', type: '판매', date: '2025-06-12', rating: 2 },
  { id: 7,  name: '치이카와 스티커', type: '판매', date: '2025-06-17', rating: 1 },
  { id: 8,  name: '치이카와 스티커', type: '구매', date: '2025-06-18', rating: 4 },
  { id: 9,  name: '치이카와 스티커', type: '판매', date: '2025-06-13', rating: 5 },
  { id: 10, name: '치이카와 스티커', type: '판매', date: '2025-06-19', rating: 5 },
  { id: 11, name: '치이카와 스티커', type: '판매', date: '2025-06-10', rating: 3 },
  { id: 12, name: '치이카와 스티커', type: '구매', date: '2025-06-10', rating: 5 },
  { id: 13, name: '치이카와 스티커', type: '판매', date: '2025-06-10', rating: 4 },
  { id: 14, name: '치이카와 스티커', type: '판매', date: '2025-06-10', rating: 5 },
];

export default function ReviewsHistory() {
  const [viewType, setViewType] = useState('');
  const [transactionType, setTransactionType] = useState('거래 유형');
  const [dateSort, setDateSort] = useState('거래 일자');
  const [writeStatus, setWriteStatus] = useState('작성 상태');
  const [ratingSort, setRatingSort] = useState('별점');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalInfo, setModalInfo] = useState({ open: false, productName: '', mode: 'write', received: false });
  const [localReviews, setLocalReviews] = useState(getLocalReviews());

  const perPage = 9;

  useEffect(() => {
    setTransactionType('거래 유형');
    setDateSort('거래 일자');
    setWriteStatus('작성 상태');
    setRatingSort('별점');
    setCurrentPage(1);
  }, [viewType]);

  const syncLocal = () => setLocalReviews(getLocalReviews());

  const handleRegisterReview = (productName, review) => {
    setLocalReview(productName, review);
    syncLocal();
    setModalInfo({ open: false, productName: '', mode: 'write', received: false });
  };
  const handleDeleteReview = (productName) => {
    removeLocalReview(productName);
    setLocalReviews(getLocalReviews()); 
    setModalInfo({ open: false, productName: '', mode: 'write', received: false }); // 모달 닫기
  };
  
  const dataWithWriteStatus = sampleData.map(item => ({
    ...item,
    writeStatus: localReviews[item.name] ? '작성됨' : '미작성',
  }));

  const filtered = dataWithWriteStatus.filter(item => {
    if (transactionType !== '거래 유형') {
      const want = transactionType.includes('구매') ? '구매' : '판매';
      if (item.type !== want) return false;
    }
    if (viewType === '내가 남긴 후기' && writeStatus !== '작성 상태') {
      if (item.writeStatus !== writeStatus) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (dateSort === '최신 순') return new Date(b.date) - new Date(a.date);
    if (dateSort === '오래된 순') return new Date(a.date) - new Date(b.date);
    return 0;
  });
  if (viewType === '받은 후기') {
    sorted.sort((a, b) => {
      if (ratingSort === '별점 높은 순') return b.rating - a.rating;
      if (ratingSort === '별점 낮은 순') return a.rating - b.rating;
      return 0;
    });
  }
  const totalPages = Math.ceil(sorted.length / perPage);
  const pagedData = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>거래 후기 내역</h2>
      <div className={styles.toggleButtons}>
        {['내가 남긴 후기', '받은 후기'].map(type => (
          <button
            key={type}
            className={viewType === type ? styles.active : ''}
            onClick={() => setViewType(v => (v === type ? '' : type))}
          >
            {type}
          </button>
        ))}
      </div>

      {viewType && (
        <div className={styles.dropdownWrapper}>
          <Dropdown
            options={['구매 후기', '판매 후기']}
            selected={transactionType}
            setSelected={setTransactionType}
            placeholder="거래 유형"
          />
          <Dropdown
            options={['최신 순', '오래된 순']}
            selected={dateSort}
            setSelected={setDateSort}
            placeholder="거래 일자"
          />
          {viewType === '내가 남긴 후기' && (
            <Dropdown
              options={['미작성', '작성됨']}
              selected={writeStatus}
              setSelected={setWriteStatus}
              placeholder="작성 상태"
            />
          )}
          {viewType === '받은 후기' && (
            <Dropdown
              options={['별점 높은 순', '별점 낮은 순']}
              selected={ratingSort}
              setSelected={setRatingSort}
              placeholder="별점"
            />
          )}
        </div>
      )}

      {viewType ? (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>거래 유형</th>
                  <th>거래 일자</th>
                  {viewType === '내가 남긴 후기'
                    ? <th>작성 상태</th>
                    : <th>별점</th>}
                  <th>후기 상태</th>
                </tr>
              </thead>
              <tbody>
                {pagedData.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    {viewType === '내가 남긴 후기' ? (
                      <td>{item.writeStatus}</td>
                    ) : (
                      <td className={styles.starCell}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i} className={styles.star}>★</span>
                        ))}
                      </td>
                    )}
                    <td>
                      {viewType === '내가 남긴 후기'
                        ? (item.writeStatus === '작성됨'
                          ? <button
                              className={styles.reviewButton}
                              onClick={() =>
                                setModalInfo({
                                  open: true,
                                  productName: item.name,
                                  mode: 'view',
                                  received: false,
                                })
                              }
                            >
                              후기 보기
                            </button>
                          : <button
                              className={styles.reviewButton}
                              onClick={() =>
                                setModalInfo({
                                  open: true,
                                  productName: item.name,
                                  mode: 'write',
                                  received: false,
                                })
                              }
                            >
                              후기 작성
                            </button>)
                        : <button
                            className={styles.reviewButton}
                            onClick={() =>
                              setModalInfo({
                                open: true,
                                productName: item.name,
                                mode: 'view',
                                received: true,
                              })
                            }
                          >
                            후기 보기
                          </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={currentPage === 1} className={styles.arrowButton}>
              <img src={arrowIcon} alt="이전" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? `${styles.pageNumber} ${styles.activePage}`
                    : styles.pageNumber
                }
              >
                {i + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}
                    className={`${styles.arrowButton} ${styles.nextArrow}`}>
              <img src={arrowIcon} alt="다음" />
            </button>
          </div>
        </>
      ) : (
        <div className={styles.content}>
          <p className={styles.empty}>
            “내가 남긴 후기” 또는 “받은 후기”를 선택해주세요.
          </p>
        </div>
      )}

      {modalInfo.open && (
        <ReviewsModal
          onClose={() => setModalInfo({ open: false, productName: '', mode: 'write', received: false })}
          productName={modalInfo.productName}
          mode={modalInfo.mode}
          received={modalInfo.received}
          savedReview={localReviews[modalInfo.productName]}
          onRegister={handleRegisterReview}
          onDelete={handleDeleteReview}
        />
      )}
    </div>
  );
}
