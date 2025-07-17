import styles from './DeliveryModal.module.css';
import xIxon from '../../../assets/x(black).svg';

function DeliveryModal({ onClose, onNext, data, setData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onNext?.(data);
    onClose();
  };

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
            <input
              className={styles.input}
              name="name"
              placeholder="수령인명을 입력해주세요."
              value={data.name}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>전화번호</span>
            <input
              className={styles.input}
              name="phone"
              placeholder="전화번호를 입력해주세요."
              value={data.phone}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <span>배송지</span>
            <textarea
              className={styles.textarea}
              name="address"
              placeholder="배송지를 입력해주세요."
              value={data.address}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={handleSubmit}>다음</button>
        </div>

      </div>
    </div>
  );
}

export default DeliveryModal;
