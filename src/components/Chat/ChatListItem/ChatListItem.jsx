import React from 'react';
import styles from './ChatListItem.module.css';
import isReadIcon from '../../../assets/is_read.svg'; //읽음 표시 아이콘

function ChatListItem({
  postImage,       // 게시글 이미지
  profileImg,      // 프사
  partnerName,     // 상대방 이름
  lastMessage,     // 마지막 메시지
  lastMessageTime, // 마지막 메시지 시간
  hasUnread,       // 읽음 여부
  onClick,
}) {
  return (
    <div className={styles.chatItem} onClick={onClick}>
      {/* 겹치는 이미지 감싸기 */}
      <div className={styles.imageWrapper}>
        <img src={postImage} alt="게시글 이미지" className={styles.postImg} />
        <img src={profileImg} alt="프로필" className={styles.profileImg} />
      </div>

      <div className={styles.chatContent}>
        <div className={styles.chatTop}>
          <span className={styles.partnerName}>{partnerName}</span>
          <span className={styles.lastMessageTime}>{lastMessageTime}</span>
        </div>
        <div className={styles.chatBottom}>
          <div className={styles.messageWrapper}>
          <p className={styles.lastMessage}>{lastMessage}</p>
          </div>

          {hasUnread && (
            <div className={styles.readIconWrapper}>
              <img src={isReadIcon} alt="읽지 않음" className={styles.readIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
