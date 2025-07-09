import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/back-icon.svg';
import removeIcon from '../../assets/remove-icon.svg';
import modalIcon from '../../assets/modal-icon.svg';
import dropdownIcon from '../../assets/dropdown.svg';
import checkedIcon from '../../assets/checkbox-checked.svg';
import uncheckedIcon from '../../assets/checkbox-unchecked.svg';
import styles from './GroupBuyNew.module.css';
import GroupBuyModal from '../../components/GroupBuy/GroupBuyModal';

function GroupBuyNew({ mode = 'create', initialData = null, productId = null }) {

  // 라우팅
  const navigate = useNavigate();


  // form 입력값 상태
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    image: null,
    amount: '',
    unit: '',
    unitCustom: '',
    people: '',
    price: '',
    deadline: '',
    method: '',
  });


  // 이미지 관련 상태
  const [images, setImages] = useState([]);             // 파일 객체 저장
  const [previewUrls, setPreviewUrls] = useState([]);   // 이미지 미리보기 URL
  const [selectedImage, setSelectedImage] = useState(null);  // 클릭된 이미지 URL (확대용)
  // 체크박스 상태
  const [isChecked, setIsChecked] = useState(false);
  //  작성 취소 모달 상태
  const [showCancelModal, setShowCancelModal] = useState(false);

  // --------------------------- 날짜 계산 (마감 기한 최소~최대 범위 설정)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const maxDate = threeMonthsLater.toISOString().split('T')[0];

  // ------------------------------ input 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'people') {
      if (value === '') {
        setForm(prev => ({ ...prev, [name]: '' }));
        return;
      }
      const number = parseInt(value);
      if (isNaN(number) || number < 1 || number > 99) return;
    }
    if (name === 'title' && value.length > 50) return;
    if (name === 'description' && value.length > 500) return;
    if (name === 'price') {
      const formatted = formatPrice(value);
      setForm(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };


  // 가격 1000단위 콤마 포맷터
  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    return parseInt(numericValue, 10).toLocaleString();
  };

  // --------------------- 이미지 관련 핸들러
  // 이미지 추가 (최대 10장)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = images.length + files.length;
    if (totalFiles > 10) {
      alert('이미지는 최대 10장까지 등록할 수 있습니다.');
      return;
    }
    const newPreviews = files.map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newPreviews).then(results => {
      setImages(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...results]);
    });
  };
  // 이미지 삭제
  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    setPreviewUrls(prev => prev.filter((_, i) => i !== indexToRemove));
  };
  // 이미지 확대 보기 클릭
  const handlePreviewClick = (url) => {
    setSelectedImage(url);
  };

  // 이미지 확대 모달 닫기
  const handleCloseImgModal = () => {
    setSelectedImage(null);
  };

  // -------------------- 체크박스 핸들러
  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };
  // 폼 전체 유효성 검사 (버튼 활성화 조건)
  const isFormComplete = () => {
    return (
      form.category &&
      form.title &&
      form.description &&
      images.length > 0 &&
      form.amount &&
      (form.unit || form.unitCustom) &&
      form.people &&
      form.price &&
      form.deadline &&
      form.method &&
      isChecked
    );
  };

  // ------------------------ 모달 관련 핸들러
  // 작성 취소 버튼 클릭 → 모달 열기
  const handleCancelClick = () => setShowCancelModal(true);
  // 모달 내 '계속 작성' → 모달 닫기
  const handleCloseModal = () => setShowCancelModal(false);
  // 모달 내 '작성 취소' → 이전 페이지로 이동
  const handleConfirmCancel = () => window.history.back();


  // ----------------------- submit 핸들러 (등록 or 수정 → 상세 페이지로 이동)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'edit') {
      // 수정 모드: 현재 productId로 이동
      navigate(`/group-buy/${productId}`);
    } else {
      // 등록 모드: 새 id가 있다고 가정하고 이동
      const newId = 99;  // 추후 백엔드 연동 필요
      navigate(`/group-buy/${newId}`);
    }
  };

  // ------------------------------ 수정 모드일 경우, 초기 데이터로 form 채우기
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm(initialData);
    }
  }, [initialData, mode]);

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['form-header']}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles['back-button']}
          onClick={() => window.history.back()}
        />
        <h2 className={styles['form-title']}>상품 등록</h2>
      </div>

      <div className={styles['product-form-wrapper']}>
        <form onSubmit={handleSubmit}>
          {/* 카테고리 */}
          <div className={styles['form-group']}>
            <label>카테고리</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={styles.selectCustom}
              style={{
                backgroundImage: `url(${dropdownIcon})`,
                color: form.category ? 'black' : 'gray',
              }}
            >
              <option value="" hidden>카테고리를 선택해주세요.</option>
              <option value="생활용품">생활용품</option>
              <option value="반려동물">반려동물</option>
              <option value="의류">의류</option>
              <option value="문구류">문구류</option>
              <option value="육아용품">육아용품</option>
              <option value="화장품/뷰티">화장품/뷰티</option>
              <option value="잡화/기타">잡화/기타</option>
            </select>
          </div>

          {/* 상품명 */}
          <div className={styles['form-group']}>
            <label>상품명</label>
            <input type="text" name="title" placeholder="50자 이내로 입력해주세요." value={form.title} onChange={handleChange} />
          </div>

          {/* 상품 설명 */}
          <div className={styles['form-group']}>
            <label>상품 설명</label>
            <textarea name="description" placeholder="500자 이내로 입력해주세요." value={form.description} onChange={handleChange} />
          </div>

          {/* 이미지 첨부 */}
          <div className={styles['form-group']}>
            <label>이미지 첨부 (최대 10장)</label>

            <div className={styles['image-upload-wrapper']}>
              <div className={styles['image-upload-box']}>
                <label htmlFor="image-upload" className={styles['upload-label']}>
                  이미지 선택
                </label>
                <input
                  id="image-upload"
                  type="file"
                  className={styles['hidden-file-input']}
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                />

                <div className={styles['image-preview-grid']}>
                  {previewUrls.map((url, index) => (
                    <div key={index} className={styles['image-thumbnail']}>
                      <img
                        src={url}
                        alt={`미리보기${index}`}
                        onClick={() => handlePreviewClick(url)}
                      />
                      <button
                        type="button"
                        className={styles['remove-button']}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                      >
                        <img src={removeIcon} alt="삭제" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>



          {/* 소분 량 */}
          <div className={styles['form-group']}>
            <label>소분 량</label>
            <div className={styles['horizontal-inputs']}>
              <input
                type="number"
                name="amount"
                placeholder="소분 량을 입력해주세요."
                value={form.amount}
                onChange={handleChange}
              />
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className={styles.selectCustom}
                style={{
                  backgroundImage: `url(${dropdownIcon})`,
                  color: form.unit ? 'black' : 'gray',
                }}
              >
                <option value="" hidden>소분 단위를 선택해주세요.</option>
                <option value="개">개</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="cm">cm</option>
                <option value="봉지">봉지</option>
                <option value="장">장</option>
                <option value="직접 입력">직접 입력</option>
              </select>
              <input
                type="text"
                name="unitCustom"
                placeholder="직접 입력"
                value={form.unitCustom}
                onChange={handleChange}
                disabled={form.unit !== '직접 입력'}
                style={{
                  backgroundColor: form.unit !== '직접 입력' ? '#d9d9d9' : 'white',
                  cursor: form.unit !== '직접 입력' ? 'not-allowed' : 'text',
                }}
              />
            </div>
          </div>

          {/* 공구 인원 */}
          <div className={styles['form-group']}>
            <label>공구 인원</label>
            <input
                type="number"
                name="people"
                placeholder="최대 99명까지 입력할 수 있습니다."
                value={form.people}
                onChange={handleChange}
            />
          </div>

          {/* 소분 당 가격 */}
          <div className={styles['form-group']}>
            <label>소분당 가격</label>
            <input
                type="text"
                name="price"
                placeholder="최대 100만원까지 입력할 수 있습니다."
                value={form.price}
                onChange={handleChange}
            />
          </div>

          {/* 마감 기한 */}
          <div className={styles['form-group']}>
            <div className={styles['label-row']}>
              <label>마감 기한</label>
              {!form.deadline && (
                <span className={styles['date-info-text']}>
                  현재일로부터 3개월 이내까지만 입력할 수 있습니다.
                </span>
              )}
            </div>
            <input
                type="date"
                name="deadline"
                placeholder="현재일로부터 3개월 이내까지만 입력할 수 있습니다."
                min={minDate}
                max={maxDate}
                value={form.deadline}
                onChange={handleChange}
            />
          </div>


          {/* 거래 방법 */}
          <div className={styles['form-group']}>
            <label>거래 방법</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className={styles.selectCustom}
              style={{
                backgroundImage: `url(${dropdownIcon})`,
                color: form.method ? 'black' : 'gray',
              }}
            >
              <option value="" disabled hidden>거래 방법을 선택해주세요.</option>
              <option value="직거래">직거래</option>
              <option value="택배 배송">택배 배송</option>
              <option value="직거래 및 택배 배송">직거래 및 택배 배송</option>
            </select>
          </div>

          <div className={styles['info-text']}>
            <p>식품 등 관련 법령에 따라 인허가 또는 신고가 필요한 상품을 판매하는 경우,</p>
            <p>해당 법적 책임은 전적으로 판매자(등록자)에게 있으며, 플랫폼은 이에 대한 책임을 지지 않습니다.</p>
            <label
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',            // 넓게 잡기
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckChange}
                style={{ display: 'none' }}
              />
              확인했어요!
              <img src={isChecked ? checkedIcon : uncheckedIcon} alt={isChecked ? "체크됨" : "체크 안됨"} />
            </label>
          </div>

          <div className={styles['button-group']}>
            <button
              type="button"
              className={`${styles.groupbuynewButton} ${styles.cancel}`}
              onClick={handleCancelClick}
            >
              작성 취소
            </button>
            <button
              type="submit"
              className={`${styles.groupbuynewButton} ${styles.submit}`}
              disabled={!isFormComplete()}
            >
              {mode === "edit" ? "수정하기" : "등록하기"}
            </button>
          </div>


          {showCancelModal && (
            <GroupBuyModal
              message="글 작성을 취소하시겠습니까?"
              confirmText="작성 취소"
              cancelText="계속 작성"
              onCancel={handleCloseModal}     // 계속 작성 버튼
              onConfirm={handleConfirmCancel} // 작성 취소 버튼
            />
          )}
        </form>
        {selectedImage && (
          <div className={styles['image-modal-overlay']} onClick={handleCloseImgModal}>
            <div
              className={styles['image-modal']}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles['close-button']}
                onClick={handleCloseImgModal}
              >
                ✕
              </button>
              <img src={selectedImage} alt="확대 이미지" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupBuyNew;
