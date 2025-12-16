// -> 함수 구간 l, r의 가장 큰 값과 가장 작은 값
// -> 기저조건은? l==r 일때의 값 == 가장 작으면서도 가장 큰 값
// -> 그럼 l < r 일때는?
// 다시 구간을 나눠서 배분
// 끝

const arr = [10, -1, 3, 50, 10, 203, 23, 201, 2];

let min = 10000000;
let max = -1;

function divSolution(l, r) {
  if (l == r) {
    return { min: arr[l], max: arr[l] };
  }

  const mid = Math.floor((l + r) / 2);
  const leftMinMaxValue = divSolution(l, mid);
  const rightMinMaxValue = divSolution(mid, r);

  return {
    min: Math.min(leftMinMaxValue.min, rightMinMaxValue.min), //왼쪽과 오른쪽 각각의 최소, 최대값을 반환
    max: Math.min(leftMinMaxValue.max, rightMinMaxValue.max),
  };
}

function sumArr(l, r) {
  if (l === r) {
    return arr[l];
  }

  const mid = Math.floor((l + r) / 2);
  const left = sumArr(l, mid);
  const right = sumArr(mid + 1, r);

  const sum = left + right;
  console.log(sum);
  return sum;
}

function getMinValue(l, r) {
  if (l == r) {
    return { min: arr[l], max: arr[l] };
  }

  const mid = Math.floor((l + r) / 2);
  const leftResult = getMinValue(l, mid);
  const rightResult = getMinValue(mid + 1, r);

  return {
    min: Math.min(leftResult.min, rightResult.min),
    max: Math.max(leftResult.max, rightResult.max),
  };
}

function getMaxSumValue(l, r) {
  if (l === r) {
    return {
      maxValue: arr[l], //왼쪽 최대값, 오른쪽 최대값, 가운데 값 중 가장 큰 값
      totalSum: arr[l], //왼쪽 오른쪽 싹다 더한 값
      maxLeftSum: arr[l], //반으로 나눴을때 왼쪽 더한 값
      maxRightSum: arr[l], // 반으로 나눴을때 오른쪽 더한 값
    };
  }

  const mid = Math.floor((l + r) / 2);
  const leftResult = getMaxSumValue(l, mid);
  const rightResult = getMaxSumValue(mid + 1, r);

  const maxCross = leftResult.maxRightSum + rightResult.maxLeftSum;
  const maxValue = Math.max(
    leftResult.maxValue,
    rightResult.maxValue,
    maxCross
  );
  const totalSum = leftResult.totalSum + rightResult.totalSum;
  const maxLeftSum = Math.max(
    leftResult.maxLeftSum,
    leftResult.totalSum + rightResult.maxLeftSum
  );
  const maxRightSum = Math.max(
    rightResult.maxRightSum,
    rightResult.totalSum + leftResult.maxRightSum
  );

  return {
    maxValue: maxValue,
    totalSum: totalSum,
    maxLeftSum: maxLeftSum,
    maxRightSum: maxRightSum,
  };
}

function solution() {
  //   sumArr(0, arr.length - 1);
  //   console.log(getMinValue(0, arr.length - 1));
  console.log(getMaxSumValue(0, arr.length - 1));
}

solution();
