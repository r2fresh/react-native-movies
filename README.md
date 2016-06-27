# React Native Movies

리액트 네이티브 학습을 위해 공식 예제 중 하나인 '[Movies](https://github.com/facebook/react-native/tree/master/Examples/Movies)'를 따라해 보기위한 프로젝트입니다.

## 원래 예제와 차이점

- ES6 문법으로 구성되어 있습니다.
- 디렉토리 및 파일 구성, 소스코드 구조를 다소 바꾸어 보았습니다.
- 원래 예제에는 서버로부터 받은 데이터를 캐싱하는 기능이 있는데 이 부분을 제거하였습니다. (예제의 복잡성을 많이 높이기 때문에)

## 개발환경 구성

레파지토리를 받으신 후, 다음과 같이 합니다.

```
1. npm 패키지 설치

npm install

2. 테스트 환경 실행

2-1. iOS

npm run ios

2-2. 안드로이드 (안드로이드의 경우, 에뮬레이터를 먼저 실행하여야 합니다.)

npm run emul
npm run android
```

## NPM 스크립트 명령어

```
npm run ios - 아이폰 개발환경 실행
npm run android - 안드로이드 개발환경 실행
npm run emul - 안드로이드 에뮬레이터 실행
npm run menu - 안드로이드 에뮬레이터 메뉴 버튼 실행
```

## 알려진 문제점

- 영화 상세 정보 화면에 표시되는 영화 이미지 해상도 낮음 (영화 정보 API가 낮은 해상도의 이미지만 제공되게끔 변경됨)
- 검색어를 입력해도 적용되지 않는 문제 (영화 정보 API가 검색어 기능을 제거한 것으로 보임)
