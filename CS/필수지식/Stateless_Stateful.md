## Stateful / Stateless

시스템이 이전 상태를 기억하느냐를 구분하는 CS 개념

> ```js
> //예시
> //Stateless (순수 함수)
> add(a, b);
>
> //Stateful (내부 변수에 의존하는 함수))
> let sum = 0;
> sum += a;
> ```

### 네트워크에서 Stateless가 중요해진 이유

초기 네트워크의 문제

1. 연결이 자주 끊김
2. 신뢰성 낮음
3. 패킷 유실 빈번

👉 “이전 상태를 믿을 수가 없음”

### Stateless의 예시

IP 계층은 기본적으로 Stateless  
HTTP도 기본적으로 Stateless 프로토콜  
REST도 Stateless
