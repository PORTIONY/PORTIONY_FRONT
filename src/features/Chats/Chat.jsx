import React, { useState } from 'react';
import boxImage from '../../assets/chat_logo.png';
import styles from './Chats.module.css';
import Dropdown from '../../components/DropDown/DropDown';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import profileImg from '../../assets/profile.png';
import postImage from '../../assets/product.png'; //상품 이미지

function Chat() {
  const [dateSort, setDateSort] = useState('전체');

  const [chatRooms, setChatRooms] = useState([
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  
]);


  const [selectedRoom, setSelectedRoom] = useState(null);

  const isEmpty = chatRooms.length === 0;

  return (
    <div className={styles.container}>
      {/* 왼쪽: 채팅 목록 */}
      <div className={styles.leftWrapper}>
        <div className={styles.leftTop}>
          <h2 className={styles.chatTitle}>채팅 목록</h2>
          <Dropdown
            options={['구매', '판매']}
            selected={dateSort}
            setSelected={setDateSort}
            placeholder="날짜"
          />
        </div>

        <div className={styles.left}>
          {isEmpty ? (
            <>
              <p className={styles.chatEmptyText}>
                💬 아직 시작된 채팅이 없습니다.<br /><br />
                이웃과 함께 나누는 첫 거래를 시작해보세요!
              </p>
              <p className={styles.chatEmptyText1}>
                공동구매 상품을 골라 시작할 수 있어요.
              </p>
              <button className={styles.button}>상품 둘러보기</button>
            </>
          ) : (
            chatRooms.map((room) => (
              <ChatListItem
                key={room.id}
                partnerName={room.partnerName}
                lastMessage={room.lastMessage}
                lastMessageTime={room.time}
                postImage={room.postImage}
                profileImg={room.profileImg}
                hasUnread={true}
                onClick={() => setSelectedRoom(room)}
              />
            ))
          )}
        </div>
      </div>

      {/* 오른쪽: 채팅 상세 or 기본 박스 이미지 */}
      <div className={styles.right}>
        {selectedRoom ? (
          <div className={styles.chatDetail}>
            <div className={styles.productInfo}>
              <p className={styles.productTitle}>{selectedRoom.title}</p>
              <p className={styles.productPrice}>{selectedRoom.price}원</p>
              <span className={styles.dday}>{selectedRoom.ddayText}</span>
            </div>

            <div className={styles.chatMessages}>
              {selectedRoom.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.isMine ? styles.myMsg : styles.theirMsg}
                >
                  <p>{msg.content}</p>
                  <span>{msg.time}</span>
                </div>
              ))}
            </div>

            <div className={styles.inputBox}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="메시지를 입력하세요"
              />
              <button className={styles.sendButton}>전송</button>
              <div className={styles.icons}>
                <button>📷</button>
                <button>📍</button>
                <button>💬</button>
              </div>
            </div>
          </div>
        ) : (
          <img src={boxImage} alt="박스" className={styles.image} />
        )}
      </div>
    </div>
  );
}

export default Chat;
