import React, { useState } from 'react';
import styles from './secessionModal.module.css';
import warningIcon from '../../assets/alert-triangle.svg';

export default function WithdrawModal({ open, onClose, onWithdraw }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (open) {
      setPassword('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img
            src={warningIcon}
            alt="경고"
            style={{ width: 38, height: 38, marginBottom: 10 }}
          />
          <div className={styles.title} style={{ fontSize: 18, fontWeight: 700, marginBottom: 7 }}>
            정말 탈퇴하시겠습니까?
          </div>
          <div className={styles.desc} style={{ marginBottom: 18 }}>
            탈퇴 시 1개월간 재가입이 불가능합니다.
          </div>
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="비밀번호 입력해주세요."
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
        />
        {error && <div className={styles.errorMsg}>{error}</div>}
        <div className={styles.buttonRow} style={{ gap: 10, marginTop: 14 }}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            type="button"
          >
            취소하기
          </button>
          <button
            className={styles.continueBtn}
            onClick={() => {
              if (!password) {
                setError('비밀번호를 입력해주세요.');
                return;
              }
              onWithdraw(password);
            }}
            type="button"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
