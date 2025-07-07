import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../assets/chevron-left.svg';
import styles from './SignupTerms.module.css'; 
import checkedBox from '../../../assets/checkbox-checked.svg';
import uncheckedBox from '../../../assets/checkbox-unchecked.svg';
import TermsModal from '../../../components/Auth/SignupTermsModal';
import termsList from '../../../components/Auth/termsData.json';

const SignupTerms = ({ onNext }) => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    location: false,
    age: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalContent, setModalContent] = useState('');

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

  // 모달열기로직
   const openModal = (label, content) => {
    setModalLabel(label);
    setModalContent(content);
    setModalOpen(true);
  };

  // 모달닫기로직
  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
    setModalLabel('');
  };

  useEffect(() => {
    const allTrue = Object.values(checkedItems).every(Boolean);
    setAllChecked(allTrue);
  }, [checkedItems]);

  const isNextEnabled = Object.values(checkedItems).every(Boolean);

  const renderCheckboxTerm = ({ key, label, content }) => (
    <label key={key} className={styles.checkbox} onClick={() => handleIndividualChange(key)}>
      <img
        src={checkedItems[key] ? checkedBox : uncheckedBox}
        alt="체크박스" className={styles.checkboxIcon}/>

      <span className={styles.termLable}>{label}</span>
      <span className={styles.view} onClick={(e) => {e.stopPropagation(); openModal(label, content);}}>[보기]</span>
    </label>
  );

  return (
    <>
      <div className={styles.allContainer}>
        
        <div className={styles.backWrapper}>
        <img src={back} alt="뒤로가기" className={styles.backIcon} onClick={() => navigate('/login')}/>
        <span className={styles.signupTitle}>회원가입</span>
        </div>

        <h2 className={styles.heading}>Portiony 서비스 이용약관을 확인해주세요.</h2>

        <div className={styles.contentBox}>
          <div className={styles.allAgreeBox} onClick={handleAllChange}>
            <div className={styles.checkbox}>
              <img src={allChecked ? checkedBox : uncheckedBox} alt="체크박스" className={styles.checkboxIcon}/>
              <span>모두 동의</span>
            </div>
          </div>

          <hr className={styles.divider}/>

          <div className={styles.termList}>{termsList.map(renderCheckboxTerm)}</div>
        </div>

        <button type="button" className={styles.nextButton} onClick={onNext} disabled={!isNextEnabled}><span>다음</span></button>
      </div>

      {/* 모달창 구현 시 */}
      {/* <TermsModal
        isOpen={modalOpen}
        label={modalLabel}
        content={modalContent}
        onClose={closeModal}
      /> */}
    </>
  );
};

export default SignupTerms;
