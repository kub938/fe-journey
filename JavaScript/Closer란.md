# Closer란?

inner 함수가 outer 함수의 Lexical 환경을 참조한 상태로 외부 변수가 inner 함수를 참조 함으로써 outer 함수가 종료된 이후에도 outer 함수의 lexical 환경이 GC 대상이 되지 않고 유지되는 현상

## 왜 그렇게 작동하나요?

outer 함수가 실행되면 inner 함수 객체가 생성되고,
이때 inner 함수 객체의 [[Environment]]에
outer LexicalEnvironment가 참조된다.

outer 함수가 inner 함수를 반환하면
외부 변수에서 inner 함수를 참조하게 되고,
outer 실행 컨텍스트가 종료된 이후에도
inner 함수가 외부에서 참조되고 있으며
inner 함수가 outer LexicalEnvironment를 참조하고 있기 때문에
outer LexicalEnvironment는 GC 대상이 되지 않는다.

## 처음부터 끝까지 흐름

전역 실행 컨텍스트 평가 단계에서
outer 함수 객체가 전역 LexicalEnvironment에 등록된다.

이후 outer 함수가 호출되면
outer 실행 컨텍스트가 생성되고,
outer LexicalEnvironment의 OuterReference는
Global LexicalEnvironment를 가리킨다.

outer 함수 실행 중 inner 함수가 평가되며
inner 함수 객체가 생성되고,
이때 inner 함수 객체의 [[Environment]]에
outer LexicalEnvironment가 캡처된다.

outer 함수가 inner 함수를 반환하면
외부 변수에서 inner 함수가 참조되게 되고,
outer 실행 컨텍스트는 종료되어 스택에서 제거된다.

하지만 inner 함수가 외부에서 참조되고 있고,
inner 함수가 outer LexicalEnvironment를 참조하고 있기 때문에
outer LexicalEnvironment는 GC 대상이 되지 않는다.

---

### 싱글톤이랑 다른점은?

보다 보니까 그냥 싱글톤이랑 좀 비슷한거 같아서 뭐가 다른지 찾아 봤다

#### 클로저

함수가 생성될 당시의 LexicalEnvironment를 기억해 실행이 끝난 뒤에도 그 환경에 접근할 수 있는 메커니즘
-> 언어 기능

#### 싱글톤

프로그램 전체에서 단 하나의 인스턴스만 존재하도록 보장하는 설계 패턴
-> 디자인 패턴

#### 차이점 정리

| 구분        | 클로저              | 싱글톤            |
| ----------- | ------------------- | ----------------- |
| 정체성      | 언어 메커니즘       | 설계 패턴         |
| 목적        | 스코프 유지, 캡슐화 | 인스턴스 1개 보장 |
| 인스턴스 수 | 제한 없음           | 반드시 1개        |
| 생성 시점   | 함수 생성 시        | 설계에 따라 다름  |
| 독립성      | 단독 개념           | 구현 수단 필요    |
