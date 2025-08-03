# DP 이론

## 1단계 dp 테이블 정의 명확히 하기

- 내가 무엇을 구하려고 하는지 명확하게 정의하기!
- 이 배열의 각 원소가 무엇을 의미하는지 한 문장으로 정의 하는것

  - 나쁜 정의 : dp[i] = i일때의 값
  - 좋은 정의 : dp[i] = 숫자 i를 1로 만들기 위해 필요한 연산의 최소 횟수
  - 좋은 정의 : dp[i] = i번째 계단까지 오르는 방법의 수

## 2단계 관계(점화식) 찾아내기

dp[i]를 구한다 가정했을 때 이때 이렇게 생각해 본다

> " `dp[i]`를 구하기 위해 이전에 계산된 `dp[i-1]`, `dp[i-2]` , ... 값들을 어떻게 이용할 수 있을까?

즉, i번째 상태는 i 이전의 상태들로부터 어떻게 만들어지는지를 생각하는 것 입니다.

실험 예제
문제: 정수 X가 주어졌을 때, 다음 3가지 연산을 사용해 1로 만들려고 한다. 연산을
사용하는 횟수의 최솟값을 구하시오.

1.  X가 3으로 나누어 떨어지면, 3으로 나눈다.
2.  X가 2로 나누어 떨어지면, 2로 나눈다.
3.  1을 뺀다.

이때 i번째 상태는
dp[i/3] + 1 한 i값 에서 연산을 한번 더 한거기 때문에 i/3 + 1
dp[i/2] + 1 위와 같은 이유로 i/2 +1
dp[i-1] + 1

이걸 수식으로 바꾸면?
dp[i] = dp[i/3] + 1
dp[i] = dp[i/2] + 1
dp[i] = dp[i-1] + 1

문제에 제시된 대로 3 or 2로 나누어 떨어졌을 때만 연산 하고 연산된 결과의 연산 횟수를 비교하는 방식으로 구현한다

## 3단계 기저식 구하기

이때 기저 상태는 dp[1] = 0, dp[2] = 1 , dp[3] = 1 이다.

## 코드

```javascript
const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = Number(fs.readFileSync(file_path).toString().trim());

//여기서 dp[i] i 는 값 value는 연산횟수 n은 1000000까지
//dp[k] = dp[k/3] + 1
//dp[k] = dp[k/2] + 1
//dp[k] = dp[k-1] + 1

//나누기는 누누어 떨어질때만 사용
// 저 세개의 값 중 가장 적은 값 사용
// 그럼 백만까지 일단 배열 구해
// 기저값은 0 = 1, 1 = 1, 2 = 1, 3 = 1

let dp = [0, 0, 0];

function cal_dp(i) {
  let div3 = Infinity;
  let div2 = Infinity;
  let minus1 = Infinity;

  if (i % 3 === 0) {
    div3 = dp[i / 3] + 1;
  }
  if (i % 2 === 0) {
    div2 = dp[i / 2] + 1;
  }
  minus1 = dp[i - 1] + 1;

  return Math.min(div3, div2, minus1);
}

function solution() {
  for (let i = 2; i < n + 1; i++) {
    dp[i] = cal_dp(i);
  }

  console.log(dp[n]);
}

solution();
```
