import React, { useState, useRef, useEffect } from 'react';
import styles from './ReviewsModal.module.css';
import x from '../../../assets/x.svg';
import arrowIcon from '../../../assets/chevron-down-outline.svg';
import clearIcon from '../../../assets/x.svg';

const options = [
  '연락이 빨라요',
  '친절하고 매너가 좋아요.',
  '상품 설명과 같아요',
  '약속 시간에 늦었어요.',
  '상품 설명과 달랐어요',
  '기타(직접 입력)',
];

export default function ReviewsModal({
  onClose,
  productName,
  onRegister,
  onDelete,
  savedReview, // {review, date}, 없으면 작성 모드
  mode = 'write', // 'write' | 'view' | 'edit'
}) {
  // 내부 모드 전환 (view → edit 등)
  const [internalMode, setInternalMode] = useState(mode);
  const [selectedReview, setSelectedReview] = useState('');
  const [customReview, setCustomReview] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // edit 진입 시 기존값 세팅
  useEffect(() => {
    if (internalMode === 'edit' && savedReview) {
      if (options.includes(savedReview.review)) {
        setSelectedReview(savedReview.review);
        setCustomReview('');
      } else {
        setSelectedReview('기타(직접 입력)');
        setCustomReview(savedReview.review);
      }
    }
    if (internalMode === 'view' && savedReview) {
      if (options.includes(savedReview.review)) {
        setSelectedReview(savedReview.review);
        setCustomReview('');
      } else {
        setSelectedReview('기타(직접 입력)');
        setCustomReview(savedReview.review);
      }
    }
    if (internalMode === 'write') {
      setSelectedReview('');
      setCustomReview('');
    }
  }, [internalMode, savedReview]);

  // textarea 200자 초과, 비활성 조건
  const isOver = selectedReview === '기타(직접 입력)' && customReview.length > 200;
  const isDisabled =
    !selectedReview ||
    (selectedReview === '기타(직접 입력)' &&
      (customReview.trim().length === 0 || isOver));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedReview(option);
    setDropdownOpen(false);
    if (option !== '기타(직접 입력)') setCustomReview('');
  };
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedReview('');
    setCustomReview('');
    setDropdownOpen(false);
  };
  const handleSubmit = () => {
    const finalReview = selectedReview === '기타(직접 입력)' ? customReview : selectedReview;
    if (onRegister) {
      onRegister(productName, {
        review: finalReview,
        date: new Date().toISOString(),
      });
    }
  };
  const handleDelete = () => {
    if (onDelete) onDelete(productName);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>거래 후기</span>
          <img src={x} alt="닫기" className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.productName}>{productName}</div>
        <div className={styles.body}>
          <div className={styles.dropdownContainer} ref={containerRef}>
            <button
              type="button"
              className={`${styles.dropdownButton} ${dropdownOpen ? styles.open : ''}`}
              onClick={() => {
                if (internalMode !== 'view') setDropdownOpen(!dropdownOpen);
              }}
              tabIndex={0}
              disabled={internalMode === 'view'}
              style={internalMode === 'view' ? { background: '#f6f6f6', color: '#aaa', cursor: 'default' } : {}}
            >
              <span className={!selectedReview ? styles.placeholder : ''}>
                {selectedReview || '후기를 선택해주세요'}
              </span>
              {(selectedReview && internalMode !== 'view') ? (
                <img
                  src={clearIcon}
                  alt="clear"
                  className={styles.clearIcon}
                  onClick={handleClear}
                  tabIndex={0}
                />
              ) : (
                <img
                  src={arrowIcon}
                  alt="arrow"
                  className={`${styles.arrow} ${dropdownOpen ? styles.rotated : ''}`}
                />
              )}
            </button>
            {dropdownOpen && internalMode !== 'view' && (
              <ul className={styles.dropdownMenu}>
                {options.map((opt, i) => (
                  <li
                    key={i}
                    className={styles.menuItem}
                    onClick={() => handleSelect(opt)}
                    tabIndex={0}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedReview === '기타(직접 입력)' ? (
            <div>
              <textarea
                className={`${styles.textarea} ${isOver ? styles.error : ''}`}
                placeholder="200자 이내 작성해주세요."
                value={customReview}
                maxLength={400}
                onChange={(e) => setCustomReview(e.target.value)}
                readOnly={internalMode === 'view'}
                style={internalMode === 'view'
                  ? { background: '#f6f6f6', color: '#aaa', cursor: 'not-allowed' }
                  : {}
                }
              />
              <div style={{
                textAlign: 'right',
                fontSize: '12px',
                color: isOver ? '#ff4444' : '#999',
                marginTop: '4px'
              }}>
                {customReview.length} / 200자
              </div>
            </div>
          ) : null}
        </div>

        {/* 하단 버튼 */}
        {internalMode === 'write' && (
          <button
            className={styles.submitButton}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            거래 후기 등록하기
          </button>
        )}
        {internalMode === 'view' && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={styles.submitButton}
              style={{ background: '#FECD24', color: '#000', flex: 1 }}
              onClick={() => setInternalMode('edit')}
            >
              수정
            </button>
            <button
              className={styles.submitButton}
              style={{
                background: '#fff',
                color: '#ff4444',
                border: '1px solid #ff4444',
                flex: 1
              }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
        {internalMode === 'edit' && (
          <button
            className={styles.submitButton}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            저장하기
          </button>
        )}
      </div>
    </div>
  );
}
