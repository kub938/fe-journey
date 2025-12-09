//못푼문제

//이 풀이는
//맨 뒤부터 시작해서 dCnt와 pCnt 둘중 한개라도 0 초과이면 무조건 한번 더 들려야 하기 때문에 해당 거리값음
//answer에 더하고 택배를 최대한 들고/덜고 올거기 때문에 -= cap을 한다.
//이 동작은 해당 지역의 택배가 - 또는 0이 될때 까지 반복하면 해당 지역은 택배 배달/수거가 완료된다
//이렇게 뒤에서 부터 0번 지역까지 다 돌면 답이 나옴

//맨 뒤에서부터 시작하는 이유는 어짜피 맨 뒤 까지 가야하고 그곳에서 남은것들로 앞의 택배를 처리하는것이 최적의 수 이기 때문
function solution(cap, n, deliveries, pickups) {
  let answer = 0;
  let dCnt = 0;
  let pCnt = 0;
  for (let i = n - 1; 0 <= i; i--) {
    dCnt += deliveries[i];
    pCnt += pickups[i];

    while (dCnt > 0 || pCnt > 0) {
      answer += (i + 1) * 2;
      dCnt -= cap;
      pCnt -= cap;
    }
  }

  return answer;
}
