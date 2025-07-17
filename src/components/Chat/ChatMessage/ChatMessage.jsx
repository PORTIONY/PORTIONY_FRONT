import styles from './ChatMessage.module.css';

function ChatMessage({ content, image, time, isMine, isSeller, isSystem, systemType }) {
  const bubbleClass = isMine ? styles.myMsg : styles.theirMsg;
  const rowClass = isMine ? styles.rowReverse : styles.row;

  // 시스템 메시지 색상 클래스 선택
  const systemClass = isSystem
    ? ({
        promise: styles.promiseMsg,
        pay: styles.payMsg,
        address: styles.addressMsg,
        delivery: styles.deliveryMsg,
        completed: styles.completedMsg,
      }[systemType] || styles.defaultSystemMsg)
    : '';

  return (
    <div
      className={styles.messageWrapper}
      style={{ justifyContent: isMine ? 'flex-end' : 'flex-start' }}
    >
      <div className={`${styles.messageRow} ${rowClass}`}>
        <div className={`${bubbleClass} ${isSystem ? systemClass : ''}`}>
          {/* 텍스트 메시지 */}
          {content && (
            <p className={styles.content}>
              {content.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}

          {/* 이미지 메시지 */}
          {image && (
            <img
              src={image}
              alt="보낸 이미지"
              className={styles.messageImage}
            />
          )}
        </div>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
}

export default ChatMessage;