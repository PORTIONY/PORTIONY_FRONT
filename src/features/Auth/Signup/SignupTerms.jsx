import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/chevron-left.svg';
import styles from './SignupTerms.module.css'; 

const SignupTerms = ({ onNext }) => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    location: false,
    age: false,
  });

  const handleAllChange = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setCheckedItems({
      terms: newValue,
      privacy: newValue,
      location: newValue,
      age: newValue,
    });
  };

  const handleIndividualChange = (key) => {
    const newCheckedItems = {
      ...checkedItems,
      [key]: !checkedItems[key],
    };
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    const allTrue = Object.values(checkedItems).every(Boolean);
    setAllChecked(allTrue);
  }, [checkedItems]);

  const isNextEnabled = Object.values(checkedItems).every(Boolean);

return (
  <>
    <div className={styles.backWrapper}>
      <img src={back} alt="뒤로가기" className={styles.backIcon} onClick={() => navigate('/login')} />
      <span className={styles.signupTitle}>회원가입</span>
    </div>

    <div className={styles.termsWrapper}>
      <h2 className={styles.title}>Portiony 서비스 이용약관을 확인해주세요.</h2>

      <div className={styles.allAgreeBox}>
        <label className={styles.checkbox}>
          <input 
            className={styles.allAgree}
            type="checkbox" 
            checked={allChecked} 
            onChange={handleAllChange} />
            모두 동의
        </label>
      </div>

      <hr className={styles.divider} />

      <div className={styles.checkList}>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={checkedItems.terms} onChange={() => handleIndividualChange('terms')} />
          <span className={styles.requiredAgree}>[필수] 서비스 이용약관 </span>
          <span className={styles.view}>[보기]</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={checkedItems.privacy} onChange={() => handleIndividualChange('privacy')} />
          <span className={styles.requiredAgree}>[필수] 개인정보 수집 및 이용 </span>
          <span className={styles.view}>[보기]</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={checkedItems.location} onChange={() => handleIndividualChange('location')} />
          <span className={styles.requiredAgree}>[필수] 위치기반서비스 이용약관 </span>
          <span className={styles.view}>[보기]</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={checkedItems.age} onChange={() => handleIndividualChange('age')} />
          <span className={styles.requiredAgree}>[필수] 14세 이상입니다. </span>
          <span className={styles.view}>[보기]</span>
        </label>

      </div>

      <button 
        className={styles.nextButton} 
        onClick={onNext} 
        disabled={!isNextEnabled}>
        <span className={styles.nextButtonText}>다음</span>
      </button>
    </div>
  </>
);
};
export default SignupTerms;
