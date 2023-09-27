# 영화 퀴즈

<img width="1440" alt="스크린샷 2023-09-26 오후 6 55 10" src="https://github.com/yb9255/classting-assignment/assets/92532339/a4efe0a7-e4e6-410d-bea7-d699bf6193ff">

영화 관련 퀴즈를 풀고 오답 노트를 확인할 수 있는 간단한 웹사이트입니다. 

[실제 사이트 링크](https://yoobin-classting-assignment.netlify.app/) 


## 𝌆Table of Contents

- [🔧 Tech Stack](#-tech-stack)
- [🕹 Features](#-features)
- [👨‍💻 Test Coverage](#-test-coverage)
- [❓ How I test my code](#-how-i-test-my-code)
- [📖 Key takeaways](#-key-takeaways)
  
## 🔧 Tech Stack

- React
- Typescript
  
  - 선정 이유 : Vanilla Javascript로 작성할 경우 타입이 의도치 않게 변경되거나 잘못된 타입을 입력하여 예상치 못한 버그가 발생하기 쉽기 때문에, Typescript를 적용했습니다.

- Styled-Components
  
  - 선정 이유 : Styled-Components는 Javascript 로직을 CSS에 적용할 수 있고 별도의 CSS 파일이 생성되지 않아 파일관리가 편하다는 장점이 있지만, CSS 파일이 캐싱되지 않기 때문에 지도 라이브러리나 애니메이션처럼 짧은 시간 안에 렌더링이 매우 많이 발생할 경우 성능상에 이슈가 있을 수 있습니다. 해당 과제의 경우 후자에 해당하는 이슈가 문제가 되지 않기 때문에 DX 측면에서 편리한 Styled-Components를 사용했습니다.

- Redux Toolkit

  - 선정 이유 : 이전 프로젝트에서도 개인적으로 많이 사용한 상태관리 툴이며, 프로젝트 크기가 작기 때문에 Redux Toolkit의 단점이라고 불리는 보일러 플레이트가 길고 코드양이 많다는 문제가 크게 중요하지 않다고 생각하여 Redux Toolkit을 선택했습니다.
  
- Redux Saga

  - 선정 이유 : Redux를 사용할 경우 보통 Redux Thunk와 Redux Saga 중 하나로 비동기 상태관리를 하게 되는데, try catch로 에러를 관리할 수 있어 에러 핸들링이 편리하고 yield와 action effect를 통해 비동기 로직을 단계별로 나눠서 관리하기 편한 Redux Saga를 Redux Thunk 대신 선택했습니다.

- Mock Service Worker
  
  - 선정 이유 : msw를 사용할 경우 테스트 환경에서 실제 request를 인터셉트하여 mock response를 보내주기 때문에, mock function을 활용하는 거보다 실제 request - response가 동작하는 환경과 더 유사한 테스트 환경을 만들 수 있다고 생각하여 선택했습니다.

## 🕹 Features

- 메인 페이지에서 퀴즈 풀기 버튼과 오답 노트 버튼을 확인할 수 있습니다.
- 퀴즈 풀기 버튼을 누르면 랜덤한 10개의 영화 관련 문제가 나옵니다.
- 문제는 4개의 선택지 중 하나를 선택하면 되며, 선택 직후 정/오답 여부를 모달로 확인할 수 있습니다.
- 오답을 선택 시 어떤 문제가 정답이었는지 즉시 확인할 수 있습니다.
- 문제를 푸는 도중 현재 몇 개의 문제를 풀었는지 텍스트로 확인할 수 있습니다.
- 문제를 다 푼 이후 소요 시간, 정답 갯수, 오답 갯수를 확인할 수 있습니다.
- 문제를 다 푼 이후 정답 / 오답 갯수가 막대 차트로 표시됩니다.
- 메인 페이지를 제외한 퀴즈 페이지, 퀴즈 결과 페이지, 오답 노트 페이지에서는 메인 페이지와 오답 노트 페이지로 향하는 링크를 가진 네비게이션 바를 확인할 수 있습니다.
- 메인 페이지의 오답 노트 버튼 혹은 네비게이션 바의 오답 노트 버튼을 누르면, 그동안 틀렸던 문제들이 오답 노트로 정리되어 있습니다.

## 👨‍💻 Test Coverage

<img width="554" alt="스크린샷 2023-09-27 오후 5 25 44" src="https://github.com/yb9255/classting-assignment/assets/92532339/62896c40-38ce-4e58-b98b-915ed0a91179">

Styled-components의 GlobalStyleProvider 파일과 index.tsx, reportWebVitals.ts를 제외한 테스트 커버리지입니다. 

## ❓ How I test my code

### 테스트 선정 기준

React Testing Library 공식 홈페이지에 가면 다음과 같은 문장을 인용합니다. 

```The more your tests resemble the way your software is used, the more confidence they can give you.```

이 말은 React Testing Library의 크리에이터인 Kent.C.Dodds가 그의 트위터에 남긴 말로, 테스트가 **사용자의 액션에 가까울수록** 그 테스트가 개발자의 코드에 대한 신뢰성을 보장해 준다는 의미입니다. 저는 React Testing Library의 전반적인 철학에 공감하여 사용자의 액션을 기반으로 테스트 조건을 선정했습니다.

그래서 테스트 조건을 정할 때 **해당 페이지에서 사용자가 무엇을 보아야 하는가**와 **해당 페이지에서 사용자가 어떤 액션을 할 것인가**를 기준으로 하였습니다. 이를 위해 다음의 두 가지 원칙을 만들고 테스트를 작성할 때 적용했습니다.

1. 화면에 필수적으로 보여야 하는 요소를 최대한 *ByRole 혹은 *ByText로 잡을 수 있도록 했습니다.
 
    * 사용자가 화면에서 특정 요소를 인식하는데 가장 의존하는 것은 그 요소의 역할(제목 요소, 버튼 요소 등)과 그 요소의 텍스트(버튼의 텍스트 내용이나 제목의 텍스트 등)입니다. 그래서 이와 최대한 비슷한 방향으로 컴포넌트를 변수에 할당하고 테스트하고자 했습니다.

2. '사용자가 요소를 확인할 수 있음 → 요소에 맞는 액션을 행했을 때 적절한 결과를 볼 수 있음.' 순서로 테스트를 작성했습니다. 

    * 사용자는 웹사이트에 들어올 때, 웹사이트의 요소를 확인한 다음 원하는 결과를 얻기 위해 어떤 행동을 하는 형태로 웹사이트를 서핑합니다. 이 흐름과 테스트의 순서가 일치하도록 테스트 구조를 구성했습니다.


### 테스트 참고 자료

[React Testing Library를 이용한 선언적이고 확장 가능한 테스트](https://ui.toast.com/posts/ko_20210630)

[Kent.C.Dodds - AHA Testing](https://kentcdodds.com/blog/aha-testing)

[Kent.C.Dodds - Test Isolation With React](https://kentcdodds.com/blog/test-isolation-with-react)

[Kent.C.Dodds - Avoid Nesting When you’re Testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)

## 📖 Key Takeaways

처음 테스트를 작성했을 때, 테스트의 추상화나 가독성을 생각하지 않고 기능을 전부 테스트 커버리지에 반영하는 것만을 목표로 하였습니다. 그러다 보니 테스트 코드가 길고 코드의 흐름을 따라가기 어려워 가독성과 유지보수성이 떨어졌습니다. 이 문제를 해결하기 위해 리서치를 하면서 위의 문서들을 발견했고 함수를 통한 테스트 추상화에 대해 알게 되었습니다. 

혼자 여러 차례 코드를 수정하며 테스트를 계속 작성해 본 결과 코드의 양이 크게 줄어듦은 물론 선언적 테스트가 가능해져 가독성과 유지보수성이 올라갔습니다. 또한 함수를 통해서 테스트를 작성하기 때문에 테스트 코드를 추가 시 해당 함수를 재사용하면 되어 확장성도 좋았으며, 각각의 단위 테스트를 고립시키는 데도 효과적이었습니다. 추상화를 통해 읽고 쓰기 쉬운 테스트 코드의 활용을 배우게 된 좋은 경험이었습니다.  

