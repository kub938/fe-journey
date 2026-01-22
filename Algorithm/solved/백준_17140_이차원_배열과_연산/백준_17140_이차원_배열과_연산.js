const fs = require("fs");
const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [r, c, k] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((e) => e.split(" ").map(Number));

//문제
//한 타임마다 배열을 정렬하고 A[r][c] === k 또는 time < 100일때 까지 진행

//변동되는 값
//각각의 R, C 값(모든 배열 내부의 값) , 길이
//time
//
//바뀌면 안되는 값
//time < 100
//
//함수 req, res 값
//정렬 로직에서 한 배열 arr을 주면 response로 정렬된 배열을 뱉음
//정렬된 배열을 다 받은 배열 resultArr의 각각의 배열의 maxLength를 체크
//maxLength col, row다 확인
//maxLength는 100을 넘어갈 수 없음 (100넘으면 100으로 처리)
//maxLength 만큼 배열 생성하고 resultArr을 복붙
//resultArr 만큼 돌지만 이게 100을 넘어가면 break 처리
//그럼 resultArr 생성 완료
//board = resultArr

//그 후 resultArr의 크기만큼
//로직
//

function sortedCountArr(arr) {
  let count = {};

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) continue;
    count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1;
  }

  count = Object.entries(count).sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  count = count.flat().map(Number);
  return count;
}

function getMaxLength(resultArr) {
  let maxLength = 0;
  for (let i = 0; i < resultArr.length; i++) {
    maxLength = Math.max(resultArr[i].length, maxLength);
  }
  return maxLength;
}
function solution() {
  let time = 0;
  while (time <= 100) {
    if (arr.length >= r && arr[0].length >= c && arr[r - 1][c - 1] === k) {
      break;
    }
    // row는 y값의 길이 변동
    // col은 x값의 길이 변동
    const colCnt = arr[0].length;
    const rowCnt = arr.length;
    let flag = "";
    let resultArr = [];
    if (rowCnt >= colCnt) {
      flag = "row";
      for (let i = 0; i < rowCnt; i++) {
        resultArr.push(sortedCountArr(arr[i]));
      }
    } else {
      flag = "col";
      for (let i = 0; i < colCnt; i++) {
        let colArr = [];
        for (let j = 0; j < rowCnt; j++) {
          colArr.push(arr[j][i]);
        }
        resultArr.push(sortedCountArr(colArr));
      }
    }

    const maxLength = Math.min(100, getMaxLength(resultArr));
    let newBoard = [];
    if (flag === "row") {
      newBoard = Array(resultArr.length)
        .fill(0)
        .map(() => Array(maxLength).fill(0));
    } else {
      newBoard = Array(maxLength)
        .fill(0)
        .map(() => Array(resultArr.length).fill(0));
    }

    for (let i = 0; i < resultArr.length; i++) {
      if (i >= 100) break;
      for (let j = 0; j < resultArr[i].length; j++) {
        if (j >= 100) break;
        if (flag === "row") {
          newBoard[i][j] = resultArr[i][j];
        } else if (flag === "col") {
          newBoard[j][i] = resultArr[i][j];
        }
      }
    }

    arr = newBoard;

    time++;
  }

  if (time > 100) time = -1;

  console.log(time);
}

solution();
