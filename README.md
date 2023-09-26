# 영화 퀴즈

<img width="1440" alt="스크린샷 2023-09-26 오후 6 55 10" src="https://github.com/yb9255/classting-assignment/assets/92532339/a4efe0a7-e4e6-410d-bea7-d699bf6193ff">

영화 관련 퀴즈를 풀고 오답 노트를 확인할 수 있는 간단한 웹사이트 입니다. 

## 𝌆Table of Contents

- [🔧 Tech Stack](#-tech-stack)
- [🔗 Links](#-links)
- [🕹 Features](#-features)
- [👨‍💻 Test Coverage](#-test-coverage)
- [❓ The way I built my test](#-the-way-i-build-my-test)


## 🔧 Tech Stack

- React
- Typescript
- Styled-Components
- Redux saga
- D3

## 🔗 Links

[실제 사이트 링크](https://yoobin-classting-assignment.netlify.app/) 

## 🕹 Features

- 퀴즈 풀기 버튼을 누르면 랜덤한 10개의 영화 관련 문제가 나옵니다
- 문제는 4개의 선택지 중 하나를 선택하면 되며, 선택 직후 정/오답 여부를 확인할 수 있습니다.
- 오답을 선택 시 어떤 문제가 정답이었는지 즉시 확인할 수 있습니다.
- 문제를 다 푼 이후 소요 시간, 정답 갯수, 오답 갯수를 확인할 수 있습니다.
- 문제를 다 푼 이후 정답 / 오답 갯수가 막대 차트로 표시됩니다.
- 오답 노트 버튼을 누르면, 그동안 틀렸던 문제들이 오답 노트로 정리되어 있습니다.

## 👨‍💻 Test Coverage

<img width="773" alt="스크린샷 2023-09-26 오후 8 45 39" src="https://github.com/yb9255/classting-assignment/assets/92532339/a3a6c001-0ca1-436d-9b13-010f1fb29dbd">
<br/>
Styled-components의 GlobalStyleProvider 파일과 index.tsx, reportWebVitals.ts를 제외한 테스트 커버리지입니다. 

## ❓ The way I built my test



