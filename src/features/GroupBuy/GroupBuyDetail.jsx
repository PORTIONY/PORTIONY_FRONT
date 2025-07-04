import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sellerProfile from "../../assets/seller-profile.svg";
import clockIcon from "../../assets/clock-icon.svg";
import chevronLeft from "../../assets/chevron-left.svg";
import styles from './GroupBuyDetail.module.css';
import GroupBuyModal from '../../components/GroupBuy/GroupBuyModal';
import dummyProducts from '../../data/dummyProduct'; 
import Pagination from '../../components/PageNumber/Pagination';


function GroupBuyDetail() {
  const { id } = useParams();
console.log('url id:', id, typeof id);
console.log('더미:', dummyProducts.map(d=>d.id));
const product = dummyProducts.find(item => String(item.id) === String(id));

  // 상태값
  const [isSeller, setIsSeller] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // 이미지 슬라이드
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleDotClick = (index) => setCurrentImageIndex(index);

  const getDDay = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    end.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `D-${diff}` : "마감";
  };

  const handleLikeClick = () => {
    setLiked((prev) => !prev); 
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  const dummyComments = Array.from({ length: 43 }, (_, i) => ({
    id: i + 1,
    user: {
      nickname: `user${i + 1}`,
      profileUrl: sellerProfile
    },
    datetime: "2025-07-04 15:30",
    text: `너무 예뻐요! 댓글 ${i + 1}번째입니다`
  }));

  const [comments, setComments] = useState(dummyComments);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newComment = {
      id: comments.length + 1,
      user: {
        nickname: "나",
        profileUrl: sellerProfile
      },
      datetime: new Date().toISOString().slice(0, 16).replace("T", " "),
      text: input
    };
    setComments([newComment, ...comments]);
    setInput("");
    setCurrentPage(1); 
  };

  if (!product) {
    return <div className={styles['group-buy-detail-page']}>상품을 찾을 수 없습니다.</div>
  }

  return (
    <div className={styles['group-buy-detail-page']}>
      <div className={styles['page-background']}>
        <div className={`${styles['white-box']} ${styles['first-box']}`}>
          <div className={styles['product-wrapper']}>

            <div className={styles['product-image']}>
              <img src={product.images[currentImageIndex]} alt={`상품 이미지 ${currentImageIndex + 1}`} />
              {isCompleted && (
                <div className={styles['overlay']}>
                  <span className={styles['overlay-text']}>공구 마감된 상품입니다.</span>
                </div>
              )}
              <div className={styles['image-dots']}>
                {product.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.dot} ${idx === currentImageIndex ? styles.active : ''}`}
                    onClick={() => handleDotClick(idx)}
                  />
                ))}
              </div>
            </div>

            <div className={styles['product-info']}>
              <div className={`${styles['status']} ${isCompleted ? styles['completed'] : ''}`}>
                {!isCompleted && <img src={clockIcon} alt="상태 아이콘" className={styles['status-icon']} />}
                {isCompleted ? "공구완료" : `마감 ${getDDay(product.deadline)}`}
              </div>
              <h1 className={styles['product-title']}>{product.title}</h1>
              <div className={styles['price']}>{Number(product.price).toLocaleString()}원</div>
              <dl className={styles['detail-list']}>
                <div className={styles['detail-row']}>
                  <dt>카테고리</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>1인당 소분량</dt>
                  <dd>{product.amount} {product.unit || product.unitCustom}</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>모집 · 거래 완료</dt>
                  <dd>{product.people}명 · 1명</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>거래 방법</dt>
                  <dd>{product.method}</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>거래 위치</dt>
                  <dd>{product.location}</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>마감일</dt>
                  <dd>{product.deadline}</dd>
                </div>
                <div className={styles['detail-row']}>
                  <dt>작성일</dt>
                  <dd>{product.createdAt}</dd> 
                </div>
              </dl>
              <div className={styles['seller-section']}>
                <p className={styles['section-title']}>판매자 정보</p>
                <hr className={styles['divider']} />
                <div className={styles['seller-box']}>
                  <img src={sellerProfile} alt="판매자" />
                  <div className={styles['seller-info']}>
                    <p className={styles['name']}>박지현</p>
                    <p className={styles['stats']}>누적 거래 횟수: 12회 (구매 0회 / 판매 5회)</p>
                  </div>
                </div>
              </div>

              <div className={styles['buttons']}>
                {isSeller ? (
                  isCompleted ? (
                    <>
                      <button className={styles['gbd-btn-delete']} onClick={() => { setModalType("delete"); setIsModalOpen(true); }}>삭제하기</button>
                      <button className={styles['gbd-btn-reopen']} onClick={() => { setModalType("reopen"); setIsModalOpen(true); }}>재개시하기</button>
                    </>
                  ) : (
                    <>
                      <button className={styles['gbd-btn-edit']} onClick={() => { setModalType("edit"); setIsModalOpen(true); }}>수정하기</button>
                      <button className={styles['gbd-btn-delete']} onClick={() => { setModalType("delete"); setIsModalOpen(true); }}>삭제하기</button>
                      <button className={styles['gbd-btn-complete']} onClick={() => { setModalType("complete"); setIsModalOpen(true); }}>공구완료</button>
                    </>
                  )
                ) : (
                  // 구매자 버튼
                  !isCompleted && (
                    <>
                      <button
                        className={`${styles['gbd-btn-like']} ${liked ? styles.liked : ''}`}
                        onClick={handleLikeClick}
                      >
                        {liked ? (
                          <>
                            <span className={styles['heart-icon']}>❤ </span> {likeCount}
                          </>
                        ) : (
                          "❤ 찜하기"
                        )}
                      </button>
                      <button className={styles['gbd-btn-chat']}>채팅하기</button>
                    </>
                  )
                )}
              </div>
            </div>
          </div>

          {/* 상품 정보(설명) */}
          <div className={styles['description-section']}>
            <p className={styles['section-title']}>상품 정보</p>
            <hr className={styles['divider']} />
            <p>
              {product.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* 모달창 */}
        {isModalOpen && (
          <GroupBuyModal
            message={
              modalType === 'delete'
                ? '글을 삭제하시겠습니까?'
                : modalType === 'complete'
                ? '글을 공구완료 처리하시겠습니까?'
                : modalType === 'reopen'
                ? '공구를 재개시하시겠습니까?'
                : modalType === 'edit'
                ? '글을 수정하시겠습니까?'
                : ''
            }
            confirmText={
              modalType === 'delete'
                ? '삭제하기'
                : modalType === 'complete'
                ? '완료하기'
                : modalType === 'reopen'
                ? '재개시'
                : modalType === 'edit'
                ? '수정하기'
                : ''
            }
            cancelText="취소"
            onConfirm={() => {
              if (modalType === 'delete') {
                navigate('/'); // 삭제 처리 (메인 화면 이동)
              } else if (modalType === 'complete') {
                setIsCompleted(true); // 공구완료 처리
              } else if (modalType === 'reopen') {
                setIsCompleted(false); // 재개시 처리
              } else if (modalType === 'edit') {
                alert('수정하기 처리 진행');
              }
              setIsModalOpen(false);
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        )}

        {/* 댓글 영역*/}
        <div className={`${styles['white-box']} ${styles['second-box']}`}>
          <div className={styles['comment-section']}>
            <h2 className={styles['comment-title']}>
                댓글 <span className={styles['comment-count']}>{comments.length}</span>
            </h2>

            <div className={styles['comment-input-wrapper']}>
              <input
                type="text"
                placeholder="댓글을 작성해주세요."
                className={styles['comment-input']}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button className={styles['comment-submit']} onClick={handleSubmit}>
                  등록
              </button>
            </div>

            <ul className={styles['comment-list']}>
              {currentComments.map((comment) => (
                <li key={comment.id} className={styles['comment-item']}>
                  <img src={comment.user.profileUrl} alt={comment.user.nickname} className={styles['comment-profile']} />
                  <div className={styles['comment-content']}>
                    <div className={styles['comment-header']}>
                      <span className={styles['comment-nickname']}>{comment.user.nickname}</span>
                      <span className={styles['comment-datetime']}>{comment.datetime}</span>
                    </div>
                    <p className={styles['comment-text']}>{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupBuyDetail;
