import React, { useRef } from 'react';
import styles from './ProfileEditModal.module.css';
import closeIcon from '../../assets/x.svg'; // X 아이콘 경로
import defaultProfile from '../../assets/Ellipse 23.png'; // 기본 프로필 사진

export default function ProfileEditModal({ open, onClose }) {
  const fileInputRef = useRef(null);

  if (!open) return null;

  // 가상의 유저 정보
  const name = "박지현";
  const email = "multicampus@naver.com";

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 닫기(X) 버튼 */}
        <img
          src={closeIcon}
          alt="닫기"
          className={styles.close}
          onClick={onClose}
        />
        {/* 프로필 사진과 변경 버튼 */}
        <div className={styles.profileImgWrapper}>
          <img
            src={defaultProfile}
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
          />
        </div>
        {/* 입력 폼 */}
        <form className={styles.form} autoComplete="off">
          <label className={styles.label}>
            닉네임
            <input className={styles.input} type="text" defaultValue="박지현" />
          </label>
          <label className={styles.label}>
            아이디
            <input className={styles.input} type="email" defaultValue="multicampus@naver.com" />
          </label>
          <label className={styles.label}>
            비밀번호
            <input className={styles.input} type="password" placeholder="비밀번호를 입력해주세요." />
          </label>
          <label className={styles.label}>
            비밀번호 확인
            <input className={styles.input} type="password" placeholder="비밀번호를 다시 한 번 입력해주세요." />
          </label>
          <button type="submit" className={styles.saveBtn}>
            프로필 저장
          </button>
        </form>
      </div>
    </div>
  );
}
