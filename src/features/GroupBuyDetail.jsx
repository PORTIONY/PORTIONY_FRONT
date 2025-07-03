import React, { useState } from "react";
import { useParams } from "react-router-dom";
import sampleImg from "../assets/sample-img.svg";
import sellerProfile from "../assets/seller-profile.svg";
import clockIcon from "../assets/clock-icon.svg";
import './GroupBuyDetail.css';

function GroupBuyDetail() {

  const dummy = {
    category: "문구류",
    title: "치이카와 마스킹테이프 세트 같이 나눠요!",
    description: "안녕하세요!\n치이카와 마스킹테이프 세트를 10개 묶음으로 구매했는데,\n다 쓰기엔 양이 많아 같이 나눠쓰실 분 찾고 있어요 :)",
    images: [sampleImg],
    amount: "2",
    unit: "묶음",
    unitCustom: "",
    people: "2",
    price: "6000",
    deadline: "2025-07-05",
    method: "직거래",
    location: "망우본동"
  };

  const [isSeller, setIsSeller] = useState(true); // true:판매자, flase:구매자
  const [isCompleted, setIsCompleted] = useState(false); // 공구완료 여부
  const [modalType, setModalType] = useState(null); // "delete", "complete", "reopen"
  const [liked, setLiked] = useState(false); // 찜 여부
  const [likeCount, setLikeCount] = useState(12); // 전체 찜 수 (기본값예시:12)

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 마감일 함수
  const getDDay = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24)); // 남은 일 수
    return diff >= 0 ? `D-${diff}` : "마감";
  };

  // 찜하기 클릭핸들러
  const handleLikeClick = () => {
    setLiked((prev) => !prev); // 상태 토글
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };


  // 더미 댓글 27개 생성
  const dummyComments = Array.from({ length: 43 }, (_, i) => ({
    id: i + 1,
    user: {
      nickname: `user${i + 1}`,
      profileUrl: sellerProfile
    },
    datetime: "2025-07-03 14:30",
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
    <div className="group-buy-detail-page">
      <div className="page-background">
        <div className="white-box first-box">
            <div className="product-wrapper">

              {/* 왼쪽 이미지 영역 */}
              <div className="product-image">
                {/* dummy.images 배열 중 첫 번째 이미지 출력 */}
                <img src={dummy.images[0]}/>
              </div>

              {/* 오른쪽 정보 영역 */}
              <div className="product-info">

                {/* 마감 디데이 (여기선 임시로 deadline 보여줌) */}
                <div className="status">
                  <img src={clockIcon} alt="상태 아이콘" className="status-icon" />
                  {isCompleted ? "공구완료" : `마감 ${getDDay(dummy.deadline)}`}
                </div>

                <h1 className="product-title">{dummy.title}</h1>

                {/* 가격 2500원 -> 2,500원 형태로 포맷 */}
                <div className="price">{Number(dummy.price).toLocaleString()}원</div>

                <dl className="detail-list">
                  <div className="detail-row">
                    <dt>카테고리</dt>
                    <dd>{dummy.category}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>1인당 소분량</dt>
                    <dd>{dummy.amount} {dummy.unit || dummy.unitCustom}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>모집 · 거래 완료</dt>
                    <dd>{dummy.people}명 · 1명</dd>
                  </div>
                  <div className="detail-row">
                    <dt>거래 방법</dt>
                    <dd>{dummy.method}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>거래 위치</dt>
                    <dd>{dummy.location}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>마감일</dt>
                    <dd>{dummy.deadline}</dd>
                  </div>
                  <div className="detail-row">
                    <dt>작성일</dt>
                    <dd>{new Date().toISOString().slice(0, 10)}</dd>
                  </div>
                </dl>

                {/* 판매자 정보 */}
                <div className="seller-section">
                    <p className="section-title">판매자 정보</p>
                      <hr className="divider" />
                    <div className="seller-box">
                      <img src={sellerProfile} alt="판매자" />
                      <div className="seller-info">
                        <p className="name">박지현</p>
                        <p className="stats">누적 거래 횟수: 12회 (구매 0회 / 판매 5회)</p>
                      </div>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="buttons">
                  {isSeller ? (
                    isCompleted ? (
                      <>
                        <button className="btn-delete" onClick={() => { setModalType("delete"); setIsModalOpen(true); }}>삭제하기</button>
                        <button className="btn-reopen" onClick={() => { setModalType("reopen"); setIsModalOpen(true); }}>재개시하기</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-edit">수정하기</button>
                        <button className="btn-delete" onClick={() => { setModalType("delete"); setIsModalOpen(true); }}>삭제하기</button>
                        <button className="btn-complete" onClick={() => { setModalType("complete"); setIsModalOpen(true); }}>공구완료</button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        className={`btn-like ${liked ? "liked" : ""}`}
                        onClick={handleLikeClick}
                      >
                        {liked ? (
                          <>
                            <span className="heart-icon">❤</span> {likeCount}
                          </>
                        ) : (
                          "❤ 찜하기"
                        )}
                      </button>
                      <button className="btn-chat">채팅하기</button>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* 상품 정보 */}
            <div className="description-section">
                <p className="section-title">상품 정보</p>
                <hr className="divider" />
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

        {/* 댓글 영역*/}
        <div className="white-box second-box">
          <div className="comment-section">
            <h2 className="comment-title">
                댓글 <span className="comment-count">{comments.length}</span>
            </h2>

            <div className="comment-input-wrapper">
              <input
                type="text"
                placeholder="댓글을 작성해주세요."
                className="comment-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button className="comment-submit">
                  등록
              </button>
            </div>

            <ul className="comment-list">
              {comments
                .slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage)
                .map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <img src={comment.user.profileUrl} alt={comment.user.nickname} className="comment-profile" />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-nickname">{comment.user.nickname}</span>
                        <span className="comment-datetime">{comment.datetime}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={pageNum === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}


export default GroupBuyDetail;