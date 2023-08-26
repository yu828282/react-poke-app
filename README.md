# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# react-poke-app

## vite로 리액트 생성
```npm init vite```
- 파일명 : ./
- react, javascript 선택

## 패키지 설치
```npm install axios react-router-dom```
```npm install -D autoprefixer postcss tailwindcss```
```npm install```

### vite 사용 이유
- 피드백 속도의 개선
- 기본적으로 타입스크립트 지원 
- Create React에 비해 설치속도가 빠르고 파일사이즈가 적은 편이다
### vite 단점?
- 호환성 검증 필요

## css 프레임 워크(css 파일 모음집) 중 Tailwind CSS 사용
- https://tailwindcss.com/docs/installation
- 부트스트랩처럼 class 이용해 스타일링
### 셋팅
1. vscode 확장 이용
2. ```npx tailwindcss init``` 
3. 파일 생성 및 설정

```javascript
(tailwind.config.js)
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/styles/main.css'
],
```
```javascript
(postcss.config.cjs 생성)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```javascript
(index.css 내용 삭제 후)
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## postcss
- JS 플러그인을 사용하여 CSS를 변환시키는 툴
- css 후처리기
## autoprefixer
- 새 CSS 기능을 이전 버전 브라우저에 제공
- postcss & autoprefixer 사용이유
  1. 코드 가독성 향상
  2. 최신 css를 대부분의 브라우저가 이해할 수 있도록 변환
  3. classname 중복 방지
  4. 정확한 에러 알림

## react 실행
```npm run dev```

## API를 이용해 데이터 가져오기
- https://pokeapi.co/

### Axios란?
- Node.js, 브라우저를 위한 Promise Api 를 활용하는 http 비동기 통신 라이브
- 백-프론트엔드랑 통신을 쉽가 하기 위해 ajax와 더불어 사용

### 스크롤 css 모듈 추가 설치
```npm install -D tailwind-scrollbar```

## react router dom 설치
``` ```
### BrowserRouter 
- ul를 url과 동기화된 상태로 유지

## Firebase 추가
- https://firebase.google.com/?hl=ko
- 구글 로그인 기능 구현 및 배포
### 설치
```npm install firebase```

### 배포
1. 깃허브 업로드
2. 파이어베이스 모듈 전역 설치
```npm install -g firebase-tools```
3. 파이어베이스 CLI 로그인
  - CLI : 명령어로 컴퓨터 조작
```firebase login```
4. 호스팅 기능 이용
```javascript
npm run build
firebase init 

Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys 

Use an existing project

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? Yes
? File dist/index.html already exists. Overwrite? (y/N) No
```
5. 깃허브 리포지토리에 셋업
```javascript 
깃허브유저명/리포지토리명 
배포 전 bild 여부 Y
npm install && npm run build
자동 배포 여부 Y
```

## Styled Component 
- javascript 파일 안에서 css를 처리할 수 있게 해주는 라이브러리(Css-in JS)
- 네비게이션 바, 로그인 부분 css 처리
### 설치
```npm install --save styled-components```
