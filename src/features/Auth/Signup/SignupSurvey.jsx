import React, { useState } from 'react';
import styles from './SignupSurvey.module.css';
import back from '../../assets/chevron-left.svg';
import requiredIcon from '../../assets/required.svg';

function SignupSurvey({ onNext, onBack }) {
  const [category, setCategory] = useState('');
  const [purpose, setPurpose] = useState('');
  const [situation, setSituation] = useState('');

  const isFormValid = category && purpose && situation;

  const handleSkip = () => {
    // AI 추천없이 시작하기 => 회원가입완료페이지로 넘어감.
    onNext();
  };

  return (
    <>
    <div className={styles.backWrapper}>
        <img
            src={back}
            alt="뒤로가기"
            className={styles.backIcon}
            onClick={onBack} />
        <span className={styles.signupTitle}>회원가입</span>
    </div>

    <div className={styles.survey}>
        <h2 className={styles.heading}>환영합니다, 어떤 상품이 필요하세요?</h2>

        {/* 질문 1 */}
        <label className={styles.label}>
            어떤 종류의 상품을 주로 찾아보시나요?
            <img src={requiredIcon} className={styles.requiredIcon} />
        </label>
        <select 
            className={styles.dropdownBox}
            value={category} 
            onChange={(e) => setCategory(e.target.value)}>
                <option value="">상품 분야를 선택해주세요.</option>
                <option value="의류">의류</option>
                <option value="반려동물">반려동물</option>
                <option value="문구류">문구류</option>
                <option value="육아용품">육아용품</option>
                <option value="화장품/기타">화장품/뷰티</option>
                <option value="잡화/기타">잡화/기타</option>
        </select>

        {/* 질문 2 */}
        <label className={styles.label}>
            주로 어떤 이유로 상품을 구매하시나요?
            <img src={requiredIcon} className={styles.requiredIcon} />
        </label>
        <select 
            className={styles.dropdownBox}
            value={purpose} 
            onChange={(e) => setPurpose(e.target.value)}>
                <option value="">구매 목적을 선택해주세요.</option>
                <option value="가격 절약">가격 절약</option>
                <option value="혼자서 구매 어려움">혼자서 구매 어려움</option>
                <option value="이웃들과 공유">이웃들과 공유</option>
        </select>

        {/* 질문 3 */}
        <label className={styles.label}>
            어떤 상황에 가장 가까우신가요?
            <img src={requiredIcon} className={styles.requiredIcon} />
        </label>
        <select 
            className={styles.dropdownBox}
            value={situation} 
            onChange={(e) => setSituation(e.target.value)}>
                <option value="">나의 생활 상황을 골라주세요.</option>
                <option value="프리랜서">프리랜서</option>
                <option value="전업주부">전업주부</option>
                <option value="직장인">직장인</option>
                <option value="학생">학생</option>
                <option value="기타">기타</option>
        </select>

        {/* 시작 버튼 */}
        <button
            className={styles.startButton}
            onClick={onNext}
            disabled={!isFormValid}
        >
            <span className={styles.startButtonText}>PORTIONY 시작하기</span>
        </button>

        {/* 건너뛰기 */}
        <p className={styles.skipText} onClick={handleSkip}>
            AI 추천 없이 시작하기
        </p>
    </div> </>
  );
}

export default SignupSurvey;
