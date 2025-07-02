import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import Dropdown from '../../../components/DropDown/DropDown';
import arrowIcon from '../../../assets/chevron-left.svg';
import uncheckedIcon from '../../../assets/checkbox-unchecked.svg';
import checkedIcon from '../../../assets/checkbox-checked.svg';
import minusIcon from '../../../assets/minus.svg';

// 예시 데이터에 rating(별점) 추가
const sampleData = [
  { id: 1,  name: '치이카와 스티커', type: '구매', date: '2025-06-10', writeStatus: '작성됨', rating: 5 },
  { id: 2,  name: '치이카와 스티커', type: '판매', date: '2025-06-11', writeStatus: '미작성', rating: 4 },
  { id: 3,  name: '치이카와 스티커', type: '판매', date: '2025-06-15', writeStatus: '미작성', rating: 3 },
  { id: 4,  name: '치이카와 스티커', type: '판매', date: '2025-06-14', writeStatus: '미작성', rating: 5 },
  { id: 5,  name: '치이카와 스티커', type: '구매', date: '2025-06-16', writeStatus: '작성됨', rating: 5 },
  { id: 6,  name: '치이카와 스티커', type: '판매', date: '2025-06-12', writeStatus: '미작성', rating: 2 },
  { id: 7,  name: '치이카와 스티커', type: '판매', date: '2025-06-17', writeStatus: '미작성', rating: 1 },
  { id: 8,  name: '치이카와 스티커', type: '구매', date: '2025-06-18', writeStatus: '작성됨', rating: 4 },
  { id: 9,  name: '치이카와 스티커', type: '판매', date: '2025-06-13', writeStatus: '미작성', rating: 5 },
  { id: 10, name: '치이카와 스티커', type: '판매', date: '2025-06-19', writeStatus: '미작성', rating: 5 },
  { id: 11, name: '치이카와 스티커', type: '판매', date: '2025-06-10', writeStatus: '미작성', rating: 3 },
  { id: 12, name: '치이카와 스티커', type: '구매', date: '2025-06-10', writeStatus: '작성됨', rating: 5 },
  { id: 13, name: '치이카와 스티커', type: '판매', date: '2025-06-10', writeStatus: '미작성', rating: 4 },
  { id: 14, name: '치이카와 스티커', type: '판매', date: '2025-06-10', writeStatus: '미작성', rating: 5 },
];

export default function ReviewsHistory() {
  const [viewType,        setViewType]        = useState('');               // '내가 남긴 후기' or '받은 후기'
  const [transactionType, setTransactionType] = useState('거래 유형');
  const [dateSort,        setDateSort]        = useState('거래 일자');
  const [writeStatus,     setWriteStatus]     = useState('작성 상태');
  const [ratingSort,      setRatingSort]      = useState('별점');
  const [currentPage,     setCurrentPage]     = useState(1);
  const [checkedItems,    setCheckedItems]    = useState({});

  const perPage = 7;

  // 페이지가 바뀔 때, 체크박스 초기화
  useEffect(() => setCheckedItems({}), [currentPage]);
  // viewType 바뀔 때, 필터 · 페이지 · 체크 초기화
  useEffect(() => {
    setTransactionType('거래 유형');
    setDateSort('거래 일자');
    setWriteStatus('작성 상태');
    setRatingSort('별점');
    setCurrentPage(1);
    setCheckedItems({});
  }, [viewType]);

  // 1) 필터링
  const filtered = sampleData.filter(item => {
    // 거래 유형 필터
    if (transactionType !== '거래 유형') {
      const want = transactionType.includes('구매') ? '구매' : '판매';
      if (item.type !== want) return false;
    }
    // 내가 남긴 후기일 때만, 작성 상태 필터
    if (viewType === '내가 남긴 후기' && writeStatus !== '작성 상태') {
      if (item.writeStatus !== writeStatus) return false;
    }
    return true;
  });

  // 2) 정렬
  const sorted = [...filtered].sort((a, b) => {
    // 날짜 정렬
    if (dateSort === '최신 순') {
      return new Date(b.date) - new Date(a.date);
    } else if (dateSort === '오래된 순') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  // 받은 후기일 때 별점 정렬 추가
  if (viewType === '받은 후기') {
    sorted.sort((a, b) => {
      if (ratingSort === '별점 높은 순') return b.rating - a.rating;
      if (ratingSort === '별점 낮은 순') return a.rating - b.rating;
      return 0;
    });
  }

  // 3) 페이징
  const totalPages = Math.ceil(sorted.length / perPage);
  const pagedData  = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  // 전체 선택 체크 여부
  const allChecked = pagedData.length > 0 && pagedData.every(item => checkedItems[item.id]);

  const toggleAll = () => {
    const newMap = {};
    pagedData.forEach(item => newMap[item.id] = !allChecked);
    setCheckedItems(newMap);
  };
  const toggleOne = id => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>거래 후기 내역</h2>

      {/* 1) 내가 남긴 후기 / 받은 후기 토글 */}
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

      {/* 2) 선택 바 */}
      {Object.values(checkedItems).filter(Boolean).length > 0 && (
        <div className={styles.selectionBar}>
          <button onClick={toggleAll} className={styles.clearButton} aria-label="선택 해제">
            <img src={minusIcon} alt="-" />
          </button>
          <span className={styles.selectionText}>
            {Object.values(checkedItems).filter(Boolean).length}개 선택됨
          </span>
          <button
            className={styles.deleteButton}
            onClick={() => {
              console.log('삭제할 ID들:', Object.keys(checkedItems).filter(id => checkedItems[id]));
            }}
          >
            후기 삭제
          </button>
        </div>
      )}

      {/* 3) 필터 드롭다운 */}
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

      {/* 4) 테이블 & 페이지네이션 */}
      {viewType ? (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      id="select-all"
                      className={styles.hiddenCheckbox}
                      checked={allChecked}
                      onChange={toggleAll}
                    />
                    <label htmlFor="select-all" className={styles.checkboxLabel}>
                      <img
                        src={allChecked ? checkedIcon : uncheckedIcon}
                        alt=""
                        className={styles.checkboxImage}
                      />
                    </label>
                  </th>
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
                    <td>
                      <input
                        type="checkbox"
                        id={`chk-${item.id}`}
                        className={styles.hiddenCheckbox}
                        checked={!!checkedItems[item.id]}
                        onChange={() => toggleOne(item.id)}
                      />
                      <label htmlFor={`chk-${item.id}`} className={styles.checkboxLabel}>
                        <img
                          src={checkedItems[item.id] ? checkedIcon : uncheckedIcon}
                          alt=""
                          className={styles.checkboxImage}
                        />
                      </label>
                    </td>
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
                          ? <button className={styles.reviewButton}>후기 보기</button>
                          : <button className={styles.reviewButton}>후기 작성</button>)
                        : <button className={styles.reviewButton}>후기 보기</button>
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
    </div>
  );
}
