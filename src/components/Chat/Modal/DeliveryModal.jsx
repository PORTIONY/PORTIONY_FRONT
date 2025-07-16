import styles from './DeliveryModal.module.css';
import xIxon from '../../../assets/x(black).svg';

function DeliveryModal({ onClose, onNext }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>배송지 정보</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={xIxon} alt="사진 전송"/>
          </button>
        </div>

        <div className={styles.form}>
          <label className={styles.label}>
            <span>수령인명</span>
            <input className={styles.input} type="text" placeholder="수령인명을 입력해주세요." />
          </label>

          <label className={styles.label}>
            <span>전화번호</span>
            <input className={styles.input} type="text" placeholder="전화번호를 입력해주세요." />
          </label>

          <label className={styles.label}>
            <span>배송지</span>
            <textarea className={styles.textarea} placeholder="배송지를 입력해주세요." />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={onNext}>다음</button>
        </div>

      </div>
    </div>
  );
}

export default DeliveryModal;
