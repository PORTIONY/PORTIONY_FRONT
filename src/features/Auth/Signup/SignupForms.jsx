import React, { useState, useRef } from 'react';
import styles from './SignupForms.module.css';
import { useNavigate } from 'react-router-dom';

import defaultProfileImage from '../../../assets/profile-image.svg'
import back from '../../../assets/chevron-left.svg';
import requiredIcon from '../../../assets/required.svg';
import close from '../../../assets/x.svg';

const domainOptions = ['직접 입력', 'gmail.com', 'naver.com', 
                      'daum.net', 'hanmail.net'];

function SignupForms({ onNext, onBack }) {
  const fileInputRef = useRef(null);

  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [domainType, setDomainType] = useState('직접 입력');
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    //프론트테스트용 미리보기 로컬 URl 설정
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    // 서버 전송 로직 백엔드 연결 후 다시 활성화 예정
    // const formData = new FormData();
    // formData.append('file', file); // key는 백엔드에서 정한대로 추후 수정

    // const res = await fetch('/api/upload-profile-image', { // api 경로 백엔드구현 후 수정
    //   method: 'POST',
    //   body: formData,
    // });

    // const data = await res.json();
    // if (data.url) {
    //   setProfileImage(data.url); // 서버에서 받은 URL로 이미지 설정
    // }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  }

  const fullEmail = `${emailId}@${domainType === '직접 입력' ? emailDomain : domainType}`;

  //추후 백엔드와 연동, 예시코드만 작성, 백엔드연동 후 예시코드 지우기 
  const handleEmailCheck = async () => {
    alert('사용 가능한 이메일입니다. (임시)');
    setEmailValid(true);
    // const res = await fetch(`/api/users/check-email?email=${fullEmail}`);
    // const data = await res.json();
    // if (data.exists) {
    //     alert('이미 사용 중인 이메일입니다.');
    //     setEmailValid(false);
    // } else {
    //     alert('사용 가능한 이메일입니다.');
    //     setEmailValid(true);
    // }
};

  const handleNicknameCheck = async () => {
    alert('사용 가능한 닉넴입니다. (임시)');
    setNicknameValid(true);
    // const res = await fetch(`/api/users/check-nickname?nickname=${nickname}`);
    // const data = await res.json();
    // if (data.exists) {
    //     alert('이미 사용 중인 닉네임입니다.');
    //     setNicknameValid(false);
    // } else {
    //     alert('사용 가능한 닉네임입니다.');
    //     setNicknameValid(true);
    // }
  };

  const isPasswordValid = (pw) => {
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  return pw.length >= 8 && hasLetter && hasNumber;
};

  const isNextValid = () => {
    return (
      emailId &&
      (domainType !== '직접 입력' || emailDomain) &&
      emailValid &&
      isPasswordValid(password) &&
      password === passwordCheck &&
      nickname &&
      nicknameValid
    );
  };

  return (
    <>
      <div className={styles.allContainer}>

      <div className={styles.backWrapper}>
        <img src={back} onClick={onBack} className={styles.backIcon} alt="뒤로가기" />
        <span className={styles.signupTitle}>회원가입</span>
      </div>

      {/* 프로필 사진 */}
      <div className={styles.profileImageWrapper}>
        <div className={styles.imageWrapper}>
          <img src={profileImage || defaultProfileImage} alt="프로필" className={styles.profileImage}/>
          {profileImage && (
            <img src={close} alt="삭제" className={styles.xIcon} onClick={removeProfileImage}/>
          )}
        </div>

        <div className={styles.uploadButton} onClick={() => fileInputRef.current.click()}>프로필 사진 등록</div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: 'none' }}/>
      </div>

      <div className={styles.inputFormWrapper}>
        <div className={styles.formGroup}>
          {/* 이메일 */}
          <label className={styles.formLabel}>이메일<img src={requiredIcon} className={styles.requiredIcon}/> </label>

          <div className={styles.emailRow}>
            <input
              className={`${styles.inputForm}  ${styles.domainInputForm}`}
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="이메일을 입력해주세요."/>

              <span>@</span>

              {domainType === '직접 입력' ? (
                <input
                    className={`${styles.inputForm} ${styles.domainInputForm}`}
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    placeholder="도메인을 입력해주세요."/>
                ) : (
                <input 
                  className={`${styles.inputForm} ${styles.domainInputForm}`}
                  value={domainType} readOnly/>
                )
              }

              <select
                className={`${styles.inputForm} ${styles.domainInputForm}`}
                value={domainType}
                onChange={(e) => setDomainType(e.target.value)}>

                {domainOptions.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>

              <button className={styles.validButton} onClick={handleEmailCheck}> <span>중복 확인</span> </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            {/* 비밀번호 */}
            <label className={styles.formLabel}>비밀번호<img src={requiredIcon} className={styles.requiredIcon}/> </label>
            
            <div className={styles.passwordRow}>
              <input
                className={`${styles.inputForm}`}
                type="password"
                value={password}
                placeholder="영문, 숫자 포함 8자 이상 입력해주세요."
                onChange={(e) => setPassword(e.target.value)}/>

              <input
                className={`${styles.inputForm}`}
                type="password"
                value={passwordCheck}
                placeholder="비밀번호를 다시 입력해주세요."
                onChange={(e) => setPasswordCheck(e.target.value)}/>
            </div>

            {password && !isPasswordValid(password) && (
              <span className={styles.errorText}>비밀번호는 영문과 숫자를 포함한 8자 이상이어야 합니다.</span>
            )}
          </div>

          <div className={styles.formGroup}>
            {/* 닉네임 */}
            <label className={styles.formLabel}>닉네임<img src={requiredIcon} className={styles.requiredIcon}/></label>

            <div className={styles.nicknameRow}>
              <input
                className={`${styles.inputForm}`}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."/>

              <button className={styles.validButton} onClick={handleNicknameCheck}><span>중복 확인</span></button>
            </div>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button type="button" className={styles.nextButton} onClick={onNext} disabled={!isNextValid()}><span>다음</span></button>
      </div>
    </>
  );
};

export default SignupForms;
