# PORTIONY_FRONT 
함께 사서, 함께 나누는 **소분 공동구매 플랫폼** PORTIONY의 프론트엔드 리포지토리입니다.
<br>
<br>


## 기술 스택

| 구성           | 기술                      | 
| ------------ | ----------------------- |
| **Frontend** | React                   | 
| **Backend**  | Spring Boot             | 
| **통신 방식**    | REST API (JSON)         |
| **배포**       | CloudType, Netlify |
<br>

## 폴더 구조

```
PORTIONY_FRONT/
├── public/
├── src/
│   ├── assets/           # 이미지, 폰트 등 정적 파일
│   ├── components/       # 공통 UI 컴포넌트
│   ├── pages/            # 라우트 페이지 컴포넌트
│   ├── routes/           # 라우터 설정
│   ├── styles/           # 글로벌 스타일 정의
│   ├── utils/            # 유틸 함수 및 상수
│   └── App.jsx
├── .gitignore
├── index.html
├── package.json
└── README.md
```

<br>

## 실행 방법

```bash
# 1. 리포지토리 클론
git clone https://github.com/PORTIONY/PORTIONY_FRONT.git

# 2. 디렉토리 이동
cd PORTIONY_FRONT

# 3. 패키지 설치
npm install

# 4. 로컬 서버 실행
npm start
```

<br>

## Git 브랜치 전략

PORTIONY는 GitHub Flow를 기반으로 협업합니다.

- `main` : 배포 가능한 안정 코드
- `develop` : 통합 개발 브랜치 (default)
- `feature/{기능명}` : 기능 개발 브랜치  

<br>

## 커밋 컨벤션

| 타입 | 설명 |
|------|------|
| feat | 새로운 기능 추가 |
| fix  | 버그 수정 |
| style | 코드 포맷팅, 세미콜론 누락 등 |
| refactor | 코드 리팩토링 (기능 변경 없음) |
| chore | 빌드 업무, 패키지 매니저 설정 등 |

예시:

```bash
git commit -m "feat: 로그인 페이지 UI 구현"
```

