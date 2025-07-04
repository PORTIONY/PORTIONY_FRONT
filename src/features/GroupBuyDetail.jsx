import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import sampleImg from "../assets/sample-img.svg";
import sampleImg2 from "../assets/sample-img2.svg";
import sampleImg3 from "../assets/sample-img3.svg";
import sellerProfile from "../assets/seller-profile.svg";
import clockIcon from "../assets/clock-icon.svg";
import chevronLeft from '../assets/chevron-left.svg';
import styles from './GroupBuyDetail.module.css'
import GroupBuyModal from '../components/GroupBuy/GroupBuyModal';

function GroupBuyDetail() {

  const dummy = {
    category: "문구류",
    title: "치이카와 마스킹테이프 세트 같이 나눠요!",
    description: "안녕하세요!\n치이카와 마스킹테이프 세트를 10개 묶음으로 구매했는데,\n다 쓰기엔 양이 많아 같이 나눠쓰실 분 찾고 있어요 :)",
    images: [sampleImg, sampleImg2, sampleImg3],
    amount: "2",
    unit: "묶음",
    unitCustom: "",
    people: "2",
    price: "2500",
    deadline: "2025-07-10",
    method: "직거래",
    location: "망우본동"
  };

  // 상태값 : 판매자/구매자
  const [isSeller, setIsSeller] = useState(true); // true:판매자, flase:구매자
  // 상태값 : 공구중/공구완료
  const [isCompleted, setIsCompleted] = useState(true); // 공구완료 여부

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "delete", "complete", "reopen", "edit"
  const [liked, setLiked] = useState(false); // 찜 여부
  const [likeCount, setLikeCount] = useState(12); // 전체 찜 수 (기본값예시:12)

  const navigate = useNavigate();

  // 현재 보고 있는 이미지 인덱스 상태 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 클릭 시 인덱스 변경 함수 (선택)
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // 마감일 함수
  const getDDay = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24)); // 남은 일 수
    return diff >= 0 ? `D-${diff}` : "마감";
  };

  // 찜하기 클릭 핸들러
  const handleLikeClick = () => {
    setLiked((prev) => !prev); // 상태 토글
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  // 더미 댓글 43개 생성
  const dummyComments = Array.from({ length: 43 }, (_, i) => ({
    id: i + 1,
    user: {
      nickname: `user${i + 1}`,
      profileUrl: sellerProfile
    },
    datetime: "2025-07-04 15:30",
    text: `너무 예뻐요! 댓글 ${i + 1}번째입니다`
  }));

  // 댓글 상태 및 페이지 상태
  const [comments, setComments] = useState(dummyComments);
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지당 댓글 수 및 총 페이지 수
  const commentsPerPage = 10;
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // 현재 페이지의 댓글 계산
  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  // 댓글 입력 상태
  const [input, setInput] = useState("");

  // 댓글 등록 함수
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
    setCurrentPage(1); // 최신 댓글 보이도록 1페이지로 이동
  };

  return (
    <div className={styles['group-buy-detail-page']}>
      <div className={styles['page-background']}>
        <div className={`${styles['white-box']} ${styles['first-box']}`}>
            <div className={styles['product-wrapper']}>

              {/* 이미지 보여주는 부분 */}
              <div className={styles['product-image']}>
                <img src={dummy.images[currentImageIndex]} alt={`상품 이미지 ${currentImageIndex + 1}`} />
                {isCompleted && (
                  <div className={styles['overlay']}>
                    <span className={styles['overlay-text']}>공구 마감된 상품입니다.</span>
                  </div>
                )}
                <div className={styles['image-dots']}>
                  {dummy.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`${styles.dot} ${idx === currentImageIndex ? styles.active : ''}`}
                      onClick={() => handleDotClick(idx)}
                    />
                  ))}
                </div>
              </div>


              {/* 이미지 오른쪽 정보 영역 */}
              <div className={styles['product-info']}>

                {/* 마감 디데이 / 공구완료 (여기선 임시로 deadline 보여줌) */}
                <div className={`${styles['status']} ${isCompleted ? styles['completed'] : ''}`}>
                  {!isCompleted && (
                    <img src={clockIcon} alt="상태 아이콘" className={styles['status-icon']} />
                  )}
                  {isCompleted ? "공구완료" : `마감 ${getDDay(dummy.deadline)}`}
                </div>

                <h1 className={styles['product-title']}>{dummy.title}</h1>

                {/* 2500원 -> 2,500원 형태 바꾸기 */}
                <div className={styles['price']}>{Number(dummy.price).toLocaleString()}원</div>

                {/* 정보 */}
                <dl className={styles['detail-list']}>
                  <div className={styles['detail-row']}>
                    <dt>카테고리</dt>
                    <dd>{dummy.category}</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>1인당 소분량</dt>
                    <dd>{dummy.amount} {dummy.unit || dummy.unitCustom}</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>모집 · 거래 완료</dt>
                    <dd>{dummy.people}명 · 1명</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>거래 방법</dt>
                    <dd>{dummy.method}</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>거래 위치</dt>
                    <dd>{dummy.location}</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>마감일</dt>
                    <dd>{dummy.deadline}</dd>
                  </div>
                  <div className={styles['detail-row']}>
                    <dt>작성일</dt>
                    <dd>{new Date().toISOString().slice(0, 10)}</dd>
                  </div>
                </dl>

                {/* 판매자 정보 */}
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

                {/* 버튼 영역 */}
                <div className={styles['gbd-buttons']}>
                  {isSeller ? (
                    isCompleted ? (
                      <>
                        <button className={styles['gbd-btn-delete']} onClick={() => { setModalType("delete"); setIsModalOpen(true); }}>삭제하기</button>
                        <button className={styles['gbd-btn-reopen']} onClick={() => { setModalType("reopen"); setIsModalOpen(true); }}>재개시하기</button>
                      </>
                    ) : (
                      <>
                        <button className={styles['gbd-btn-edit']}
                                                                   onClick={() => { setModalType("edit"); setIsModalOpen(true); }}>수정하기</button>
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
            <div className={`${styles['description-section']}`}>
                <p className={styles['section-title']}>상품 정보</p>
                <hr className={styles['divider']} />
                {/* 줄바꿈 */}
                <p>
                  {dummy.description.split('\n').map((line, index) => (
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
                // 수정 처리 예시
                alert('수정하기 처리 진행');
                // 또는 navigate('/edit-page');
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
                  등 록
              </button>
            </div>

            <ul className={styles['comment-list']}>
              {comments
                .slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage)
                .map((comment) => (
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


            {/* 댓글 - 페이지네이션 */}
            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                className={styles['pagination-button']}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <img src={chevronLeft} alt="이전" className={styles['pagination-arrow']} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={`${styles['pagination-button']} ${pageNum === currentPage ? styles.active : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                className={styles['pagination-button']}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <img src={chevronLeft} alt="다음" className={`${styles['pagination-arrow']} ${styles.right}`} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}


export default GroupBuyDetail;