import styles from './ChatMessage.module.css';

function ChatMessage({ content, time, isMine, isSeller }) {
  const bubbleClass = isMine ? styles.myMsg : styles.theirMsg;
  const rowClass = isMine ? styles.rowReverse : styles.row;

  return (
    <div className={styles.messageWrapper}
      style={{ justifyContent: isMine ? 'flex-end' : 'flex-start' }}
    >
      <div className={`${styles.messageRow} ${rowClass}`}>
        <div className={bubbleClass}>
          <p className={styles.content}>{content}</p>
        </div>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
