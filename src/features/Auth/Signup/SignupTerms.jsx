import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../assets/chevron-left.svg';
import styles from './SignupTerms.module.css'; 
import checkedBox from '../../../assets/checkbox-checked.svg';
import uncheckedBox from '../../../assets/checkbox-unchecked.svg';

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
    <div className={styles.allWrapper}>
      
      <div className={styles.backWrapper}>
      <img src={back} alt="뒤로가기" className={styles.backIcon} onClick={() => navigate('/login')} />
      <span className={styles.signupTitle}>회원가입</span>
      </div>

      <h2 className={styles.title}>Portiony 서비스 이용약관을 확인해주세요.</h2>

      <div className={styles.contentBox}>
        <div className={styles.allAgreeBox} onClick={handleAllChange}>
          <div className={styles.checkbox}>
            <img 
              src={allChecked ? checkedBox : uncheckedBox}
              alt="체크박스"
              className={styles.checkboxIcon}
            />
            <span className={styles.allAgree}>모두 동의</span>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.checkList}>

          <label className={styles.checkbox} onClick={() => handleIndividualChange('terms')}>
            <img
              src={checkedItems.terms ? checkedBox : uncheckedBox}
              alt="체크박스"
              className={styles.checkboxIcon}
            />
            <span className={styles.requiredAgree}>[필수] 서비스 이용약관 </span>
            <span className={styles.view}>[보기]</span>
          </label>

          <label className={styles.checkbox} onClick={() => handleIndividualChange('terms')}>
            <img
              src={checkedItems.terms ? checkedBox : uncheckedBox}
              alt="체크박스"
              className={styles.checkboxIcon}
            />
            <span className={styles.requiredAgree}>[필수] 개인정보 수집 및 이용 </span>
            <span className={styles.view}>[보기]</span>
          </label>

          <label className={styles.checkbox} onClick={() => handleIndividualChange('terms')}>
            <img
              src={checkedItems.terms ? checkedBox : uncheckedBox}
              alt="체크박스"
              className={styles.checkboxIcon}
            />
            <span className={styles.requiredAgree}>[필수] 위치기반서비스 이용약관 </span>
            <span className={styles.view}>[보기]</span>
          </label>

        <label className={styles.checkbox} onClick={() => handleIndividualChange('terms')}>
            <img
              src={checkedItems.terms ? checkedBox : uncheckedBox}
              alt="체크박스"
              className={styles.checkboxIcon}
            />
            <span className={styles.requiredAgree}>[필수] 14세 이상입니다. </span>
            <span className={styles.view}>[보기]</span>
          </label>

        </div>
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
