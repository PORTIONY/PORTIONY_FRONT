import React, { useState } from 'react';
import styles from './SignupSurvey.module.css';
import back from '../../../assets/chevron-left.svg';
import required from '../../../assets/required.svg';
import arrow from '../../../assets/chevron-down-outline.svg';
import DropDownSurvey from '../../../components/DropDown/DropDownSurvey';

function SignupSurvey({ onNext, onBack }) {
  const [category, setCategory] = useState('');
  const [purpose, setPurpose] = useState('');
  const [situation, setSituation] = useState('');

  const isNextValid = category && purpose && situation;

  const handleSkip = () => {
    // AI 추천없이 시작하기 => 회원가입완료페이지로 넘어감.
    onNext();
  };

  // 설문
  const questions = [
    {
      label: '어떤 종류의 상품을 주로 찾아보시나요?',
      value: category,
      setValue: setCategory,
      placeholder: '상품 분야를 선택해주세요.',
      options: ['의류', '반려동물', '문구류', '육아용품', '화장품/뷰티', '잡화/기타'],
    },
    {
      label: '주로 어떤 이유로 상품을 구매하시나요?',
      value: purpose,
      setValue: setPurpose,
      placeholder: '구매 목적을 선택해주세요.',
      options: ['가격 절약', '혼자서 구매 어려움', '이웃들과 공유'],
    },
    {
      label: '어떤 상황에 가장 가까우신가요?',
      value: situation,
      setValue: setSituation,
      placeholder: '나의 생활 상황을 골라주세요.',
      options: ['프리랜서', '전업주부', '직장인', '학생', '기타'],
    },
  ];

return (
  <>
      <div className={styles.allContainer}>

        <div className={styles.backWrapper}>
          <img src={back} alt="뒤로가기" className={styles.backIcon} onClick={onBack}/>
          <span className={styles.signupTitle}>회원가입</span>
        </div>

        <div className={styles.dropdownWrapper}>
          <h2 className={styles.heading}>환영합니다, 어떤 상품이 필요하세요?</h2>

          {questions.map((q, index) => (
            <div className={styles.surveyFormWrapper} key={index}>
              <label className={styles.surveyLabel}> {q.label}
                  <img src={required} className={styles.requiredIcon} alt="필수"/>
              </label>

              <div className={styles.selectWrapper}>
                <DropDownSurvey
                  value={q.value}
                  setValue={q.setValue}
                  placeholder={q.placeholder}
                  options={q.options}
              />
              </div>
            </div>
          ))}
        </div>

        {/* 시작 버튼 */}
        <button type="button" className={styles.startButton} onClick={onNext} disabled={!isNextValid}><span>PORTIONY 시작하기</span></button>

        {/* 건너뛰기 */}
        <p className={styles.skipText} onClick={handleSkip}>AI 추천 없이 시작하기</p>
      </div> 
    </>
  );
}

export default SignupSurvey;
