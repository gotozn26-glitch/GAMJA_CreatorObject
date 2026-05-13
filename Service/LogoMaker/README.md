# 영채 로고 작업실 (OpenAI 버전)

Google AI Studio 기반 템플릿을 OpenAI API 기반으로 전환한 로고 생성기입니다.

## 로컬 실행

**Prerequisites:** Node.js 18+

1. 의존성 설치  
   `npm install`
2. 환경변수 설정 (`.env.local`)  
   `CHAE_GPT_API_KEY=YOUR_OPENAI_COMPATIBLE_API_KEY`
3. 개발 서버 실행  
   `npm run dev`

## 현재 동작 방식

- 사용자 자연어 프롬프트 + 레퍼런스 이미지를 OpenAI가 먼저 해석해 생성 전략을 수립
- 수립된 전략을 기반으로 OpenAI 이미지 생성 모델이 로고 결과물 생성
- 결과는 PNG data URL로 반환되어 카드에서 다운로드 가능

## GitHub + Firebase Hosting 배포/공유 흐름

AI Studio처럼 "자동 공유 링크" 대신, 일반 웹앱 배포 방식으로 URL을 만듭니다.

1. GitHub 저장소 생성/연결 후 코드 푸시
2. Firebase 프로젝트 준비
3. 호스팅 설정 및 배포

예시 명령:

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

배포 후 발급되는 `https://<project-id>.web.app` URL이 공유 링크 역할을 합니다.

## 운영 시 권장 사항 (중요)

현재 구조는 프론트엔드에서 OpenAI 키를 직접 사용합니다.  
실서비스/공유 사이트에서는 반드시 **Firebase Functions(서버)** 를 두고:

- 브라우저 -> Functions 호출
- Functions에서 OpenAI API 호출
- API 키는 Functions 환경변수/시크릿에 저장

구조로 전환해 키 노출을 막는 것을 권장합니다.
