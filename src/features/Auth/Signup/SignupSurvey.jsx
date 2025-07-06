import React, { useState } from 'react';
import styles from './SignupSurvey.module.css';
import back from '../../../assets/chevron-left.svg';
import required from '../../../assets/required.svg';

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
    <div className={styles.allWrapper}>
        <div className={styles.backWrapper}>
            <img
                src={back}
                alt="뒤로가기"
                className={styles.backIcon}
                onClick={onBack} />
            <span className={styles.signupTitle}>회원가입</span>
        </div>

        <div className={styles.dropdownWrapper}>
            <h2 className={styles.heading}>환영합니다, 어떤 상품이 필요하세요?</h2>

            {/* 질문 1 */}
            <div className={styles.surveyWrapper}>
                <label className={styles.surveyLabel}>
                    어떤 종류의 상품을 주로 찾아보시나요?
                    <img src={required} className={styles.requiredIcon} />
                </label>
                <select 
                    className={styles.dropdownBox}
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                        <option value=""
                            disabled hidden>
                            {/* 안전하게 스타일대신 여백주기 (10px대체) */}
                            &nbsp;&nbsp;&nbsp;상품 분야를 선택해주세요.
                        </option>
                        <option value="의류">&nbsp;&nbsp;&nbsp;의류</option>
                        <option value="반려동물">&nbsp;&nbsp;&nbsp;반려동물</option>
                        <option value="문구류">&nbsp;&nbsp;&nbsp;문구류</option>
                        <option value="육아용품">&nbsp;&nbsp;&nbsp;육아용품</option>
                        <option value="화장품/기타">&nbsp;&nbsp;&nbsp;화장품/뷰티</option>
                        <option value="잡화/기타">&nbsp;&nbsp;&nbsp;잡화/기타</option>
                </select>
            </div>

            {/* 질문 2 */}
            <div className={styles.surveyWrapper}>
                <label className={styles.surveyLabel}>
                    주로 어떤 이유로 상품을 구매하시나요?
                    <img src={required} className={styles.requiredIcon} />
                </label>
                <select 
                    className={styles.dropdownBox}
                    value={purpose} 
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                >
                        <option value=""
                            disabled hidden>
                            {/* 안전하게 스타일대신 여백주기 (10px대체) */}
                            &nbsp;&nbsp;&nbsp;구매 목적을 선택해주세요.
                        </option>
                        <option value="가격 절약">&nbsp;&nbsp;&nbsp;가격 절약</option>
                        <option value="혼자서 구매 어려움">&nbsp;&nbsp;&nbsp;혼자서 구매 어려움</option>
                        <option value="이웃들과 공유">&nbsp;&nbsp;&nbsp;이웃들과 공유</option>
                </select>
            </div>

            {/* 질문 3 */}
            <div className={styles.surveyWrapper}>
                <label className={styles.surveyLabel}>
                    어떤 상황에 가장 가까우신가요?
                    <img src={required} className={styles.requiredIcon} />
                </label>
                <select 
                    className={styles.dropdownBox}
                    value={situation} 
                    onChange={(e) => setSituation(e.target.value)} 
                    required
                >
                        <option value="" 
                            disabled hidden>
                            {/* 안전하게 스타일대신 여백주기 (10px대체) */}
                            &nbsp;&nbsp;&nbsp;나의 생활 상황을 골라주세요.
                        </option>
                        <option value="프리랜서">&nbsp;&nbsp;&nbsp;프리랜서</option>
                        <option value="전업주부">&nbsp;&nbsp;&nbsp;전업주부</option>
                        <option value="직장인">&nbsp;&nbsp;&nbsp;직장인</option>
                        <option value="학생">&nbsp;&nbsp;&nbsp;학생</option>
                        <option value="기타">&nbsp;&nbsp;&nbsp;기타</option>
                </select>
            </div>
        </div>

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
