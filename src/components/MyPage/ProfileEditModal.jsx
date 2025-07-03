import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfileEditModal.module.css';

import closeIcon from '../../assets/x.svg';
import removePhotoIcon from '../../assets/backgroundX.svg';
import defaultProfile from '../../assets/LOGOMAIN.png';
import WithdrawModal from './secessionModal';

export default function ProfileEditModal({ open, onClose, currentProfile, onSave }) {
  const fileInputRef = useRef(null);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState(defaultProfile);

  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [errorType, setErrorType] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [duplicateChecked, setDuplicateChecked] = useState(false);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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
      setDuplicateChecked(false);
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

  const handleRemoveImg = () => setProfileImg(defaultProfile);

  const handleSubmit = e => {
    e.preventDefault();

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

      localStorage.setItem('password', password);
      setPasswordChanged(true);
      setTimeout(() => setPasswordChanged(false), 2000);
      setErrorType('');
    }

    onSave({ nickname, email, profileImg });
    onClose();
  };

  const isNicknameChanged = nickname !== currentProfile.nickname && nickname.length > 0;

  const getInputClass = (field) =>
    `${styles.input} ${errorType === field ? styles.errorInput : ''}`;

  const ErrorMsg = ({ field }) => (
    errorType === field && errorMsg
      ? <div className={styles.errorMsg}>{errorMsg}</div>
      : null
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 상단 닫기 X - 모달 전체 닫기 */}
        <div className={styles.headerRow}>
          <div className={styles.title}>프로필 편집</div>
          <img
            src={closeIcon}
            alt="닫기"
            className={styles.close}
            onClick={onClose}
          />
        </div>

        {/* 프로필 이미지/사진 삭제 */}
        <div className={styles.profileImgWrapper}>
          <div className={styles.profileImgBox}>
            <img
              src={profileImg}
              alt="프로필"
              className={styles.profileImg}
              onError={e => { e.target.onerror = null; e.target.src = defaultProfile; }}
            />
          
            {profileImg !== defaultProfile && (
              <button
                type="button"
                className={styles.profileImgClose}
                onClick={handleRemoveImg}
                tabIndex={-1}
                aria-label="프로필 이미지 삭제"
              >
                <img src={removePhotoIcon} alt="" />
              </button>
            )}
          </div>
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
            <div className={styles.nicknameRow}>
              <input
                className={styles.input}
                type="text"
                value={nickname}
                onChange={e => {
                  setNickname(e.target.value);
                  setErrorType('');
                  setErrorMsg('');
                  setDuplicateChecked(false);
                }}
                required
              />
              <button
                type="button"
                className={styles.duplicateBtn}
                style={{
                  background: isNicknameChanged ? "#FECD24" : "#F6F6F6",
                  color: isNicknameChanged ? "#000" : "#C0C0C0",
                  border: isNicknameChanged ? "1px solid #FECD24" : "1px solid #ECECEC",
                  cursor: isNicknameChanged ? "pointer" : "not-allowed"
                }}
                disabled={!isNicknameChanged}
                onClick={() => setDuplicateChecked(true)}
              >
                중복 확인
              </button>
            </div>
            {nickname && nickname !== '박지현' && duplicateChecked && (
              <div
                style={{
                  color: "#32C05C",
                  fontSize: 11,
                  margin: "4px 2px 0 2px",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: "14px"
                }}
              >
                사용 가능한 닉네임입니다.
              </div>
            )}
          </label>

          <label className={styles.label}>
            아이디
            <input
              className={`${styles.input} ${styles.disabledInput}`}
              type="email"
              value={email}
              readOnly
              tabIndex={-1}
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

          <div
            className={styles.withdraw}
            onClick={() => setShowWithdrawModal(true)}
          >
            탈퇴하기
          </div>
          <WithdrawModal
            open={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            onWithdraw={password => {
              if (password !== currentPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
              }
              alert('정상적으로 탈퇴 처리되었습니다.');
              setShowWithdrawModal(false);
              onClose();
            }}
          />
          <div className={styles.buttonRow}>
            <button type="submit" className={styles.saveBtn}>
              프로필 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
