import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfileEditModal.module.css';
import closeIcon from '../../assets/x.svg';
import defaultProfile from '../../assets/Ellipse 23.png';

export default function ProfileEditModal({ open, onClose, currentProfile, onSave }) {
  const fileInputRef = useRef(null);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState(defaultProfile);

  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // 에러 메시지, 어떤 인풋에 에러 표시할지 구분
  const [errorMsg, setErrorMsg] = useState('');
  const [errorType, setErrorType] = useState(''); // 'old', 'new', 'confirm', ''

  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (open) {
      setNickname(currentProfile.nickname || '');
      setEmail(currentProfile.email || '');
      setProfileImg(currentProfile.profileImg || defaultProfile);
      setOldPasswordInput('');
      setPassword('');
      setPasswordConfirm('');
      setErrorMsg('');
      setErrorType('');
      setPasswordChanged(false);
      setCurrentPassword(localStorage.getItem('password') || '');
    }
  }, [open, currentProfile]);

  if (!open) return null;

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 비밀번호 바꿀 때만 검증
    if (oldPasswordInput || password || passwordConfirm) {
      if (!oldPasswordInput) {
        setErrorMsg('현재 비밀번호를 입력하세요.');
        setErrorType('old');
        return;
      }
      if (oldPasswordInput !== currentPassword) {
        setErrorMsg('현재 비밀번호가 일치하지 않습니다.');
        setErrorType('old');
        return;
      }
      if (!password || !passwordConfirm) {
        setErrorMsg('새 비밀번호를 입력하세요.');
        setErrorType('new');
        return;
      }
      if (password !== passwordConfirm) {
        setErrorMsg('새 비밀번호가 일치하지 않습니다.');
        setErrorType('confirm');
        return;
      }
      if (password === oldPasswordInput) {
        setErrorMsg('새 비밀번호가 이전 비밀번호와 동일합니다.');
        setErrorType('new');
        return;
      }
      // 비밀번호 저장
      localStorage.setItem('password', password);
      setPasswordChanged(true);
      setTimeout(() => setPasswordChanged(false), 2000);
      setErrorType('');
    }

    // 닉네임, 이메일, 프로필 사진 저장 (변경된 경우만)
    onSave({ nickname, email, profileImg });
    onClose();
  };

  // 에러 발생시 input에 스타일 추가
  const getInputClass = (field) =>
    `${styles.input} ${errorType === field ? styles.errorInput : ''}`;

  // 에러 메시지 input 바로 아래
  const ErrorMsg = ({ field }) => (
    errorType === field && errorMsg
      ? <div className={styles.errorMsg}>{errorMsg}</div>
      : null
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          src={closeIcon}
          alt="닫기"
          className={styles.close}
          onClick={onClose}
        />
        <div className={styles.profileImgWrapper}>
          <img
            src={profileImg}
            alt="프로필"
            className={styles.profileImg}
          />
          <button
            type="button"
            className={styles.photoChangeBtn}
            onClick={() => fileInputRef.current.click()}
          >
            사진 변경
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <label className={styles.label}>
            닉네임
            <input
              className={styles.input}
              type="text"
              value={nickname}
              onChange={e => {
                setNickname(e.target.value);
                setErrorType('');
                setErrorMsg('');
              }}
              required
            />
          </label>
          <label className={styles.label}>
            아이디
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setErrorType('');
                setErrorMsg('');
              }}
              required
            />
          </label>
          <label className={styles.label}>
            현재 비밀번호
            <input
              className={getInputClass('old')}
              type="password"
              value={oldPasswordInput}
              onChange={e => {
                setOldPasswordInput(e.target.value);
                setErrorType('');
                setErrorMsg('');
              }}
              placeholder="현재 비밀번호를 입력해주세요."
              autoComplete="current-password"
            />
            <ErrorMsg field="old" />
          </label>
          <label className={styles.label}>
            새 비밀번호
            <input
              className={getInputClass('new')}
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setErrorType('');
                setErrorMsg('');
              }}
              placeholder="새 비밀번호를 입력해주세요."
              autoComplete="new-password"
            />
            <ErrorMsg field="new" />
          </label>
          <label className={styles.label}>
            새 비밀번호 확인
            <input
              className={getInputClass('confirm')}
              type="password"
              value={passwordConfirm}
              onChange={e => {
                setPasswordConfirm(e.target.value);
                setErrorType('');
                setErrorMsg('');
              }}
              placeholder="새 비밀번호를 다시 한 번 입력해주세요."
              autoComplete="new-password"
            />
            <ErrorMsg field="confirm" />
          </label>
          {passwordChanged && (
            <div style={{ color: "green", margin: "6px 0", fontSize: 13 }}>비밀번호가 변경되었습니다.</div>
          )}
          <button type="submit" className={styles.saveBtn}>
            프로필 저장
          </button>
        </form>
      </div>
    </div>
  );
}
