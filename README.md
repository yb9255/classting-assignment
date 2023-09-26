# 영화 퀴즈

<img width="1440" alt="스크린샷 2023-09-26 오후 6 55 10" src="https://github.com/yb9255/classting-assignment/assets/92532339/a4efe0a7-e4e6-410d-bea7-d699bf6193ff">

영화 관련 퀴즈를 풀고 오답 노트를 확인할 수 있는 간단한 웹사이트 입니다. 

## 𝌆Table of Contents

- [🔧 Tech Stack](#-tech-stack)
- [🔗 Links](#-links)
- [🕹 Features](#-features)
- [👨‍💻 Test Coverage](#-test-coverage)
- [❓ The way I built my test](#-the-way-i-built-my-test)

## 🔧 Tech Stack

- React
- Typescript
  
  - 선정 이유 : Vanilla Javascript로 작성을 할 경우 타입이 의도치 않게 변경되거나 잘못된 타입을 입력하여 예상치 못한 버그가 발생하기 쉽기 때문에, Typescript를 적용했습니다.

- Styled-Components
  
  - 선정 이유 : Styled-Components는 Javascript 로직을 CSS에 적용할 수 있고 별도의 CSS파일이 생성되지 않아 파일관리가 편하다는 장점이 있지만, CSS 파일이 캐싱되지 않기때문에 지도 라이브러리나 애니메이션처럼 짧은 시간 안에 렌더링이 매우 많이 발생할 경우 성능상에 이슈가 있을 수 있습니다. 해당 과제의 경우 후자에 해당하는 이슈가 문제가 되지 않기 때문에 DX 측면에서 편리한 Styled-Components를 사용했습니다.

- Redux Toolkit

  - 선정 이유 : 이전 프로젝트에서도 개인적으로 많이 사용한 상태관리 툴이며, 프로젝트 크기가 작기 때문에 Redux Toolkit의 단점이라고 불리는 보일러플레이트가 길고 코드양이 많다는 문제가 크게 중요하지 않다고 생각하여 Redux Toolkit을 선택했습니다.
  
- Redux saga

  - 선정 이유 : Redux를 사용할 경우 try catch를 사용할 수 있어 에러 핸들링이 매우 편리하고 yield와 action effect를 통해 비동기 로직을 단계별로 나눠서 관리하기 편한 Redux saga를 thunk 대신 사용했습니다.

- D3

  - 선정 이유 : 차트 생성 관련 라이브러리 중 가장 대표적이고 자유도가 높은 라이브러리로 알려져 있으며, 이전에 D3로 만든 훌륭한 차트 포트폴리오들을 보고 사용해보고 싶다는 생각이 들어 사용해 보았습니다.
  
- Mock Service Worker
  
  - 선정 이유 : jest의 함수 mocking 기능을 활용하는 것은 response를 그때그때 다양하게 바꿀 수 있다는 점에서 좋지만, 매 fetch마다 mock function을 적용해줘야 하는 것에 번거로움이 있고 실제 API가 동작하는 원리와 조금 다르다고 생각했습니다. 그래서 테스트 환경에서 request를 인터셉트하여 mock response를 보내주는 msw가 실제 환경과 더 유사한 테스트 환경을 만들 수 있다고 생각하여 선택했습니다.
  
- Husky

  - 선정 이유 : 작업 과정에서 제 나름의 커밋 컨벤션을 지정하였으나, 오탈자나 제 착각으로 커밋 메세지가 컨벤션에 어긋나서 리베이스로 메세지를 되돌려야 하는 불상사가 있었습니다. 그래서 pre-commit단계에서 커밋 메세지 컨벤션을 강제하기 위해 Husky를 적용했습니다. 또한 pre-push 단계에서 타입 체킹을 한번 더 하여 타입 문제가 빌드된 결과물에서 일어나는 것을 이중으로 방지하고자 선택했습니다.

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

React-testing-library 공식 홈페이지에 가면 다음과 같은 문장을 인용합니다. 

The more your tests resemble the way your software is used, the more confidence they can give you.  

이 말은 react-testing-library의 크리에이터인 Kent.C.Dodds가 그의 트위터에 남긴 말로, 테스트가 사용자의 액션에 가까워질수록 그 테스트가 개발자의 코드에 대한 신뢰성을 보장해준다는 의미입니다. 저는 React-testing-library 전반의 철학에 공감하여 사용자의 액션에 기반에서 테스팅을 선정했습니다.

테스트의 대부분 내용은 특정 요소가 Document 내부에 있는지 여부, 혹은 특정 요소가 document 내부에 얼마나 있는가를 기준으로 잡았습니다. 사용자의 액션에 맞춰 반드시 화면에 나타나야 하는 해당요소가 잘 나타나고 있으면, 그 웹페이지가 최소한의 기능을 하고 있다고 여겼기 때문입니다. 

또한 사용자가 어떻게 행동할지 흐름을 예상해서 그 흐름에 맞춰서 테스트를 순서대로 작성했습니다. 예를 들면, 메인 페이지에서는 타이틀과 시작 링크를 봐야되고, 시작링크를 클릭하면 다음 페이지로 넘어가야 되고 등으로 사용자의 액션을 상상하면서 그에 맞게 테스트 코드를 작성했습니다. 이를 위해 유닛 테스트 모듈에서는 해당 유닛이 중심이 되는 페이지를 중심으로 테스트를 작성하되, 그 유닛에서 일어난 액션이 다른 페이지로 이동 혹은 영향 등을 주는 상황이면 다른 컴포넌트나 페이지를 불러오는 통합 테스트의 형태로 작성했습니다.


