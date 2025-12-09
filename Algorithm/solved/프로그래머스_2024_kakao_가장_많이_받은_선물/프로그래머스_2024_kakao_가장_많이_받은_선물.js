function solution(friends, gifts) {
  let answer = 0;
  const n = friends.length;
  const friendsKey = Object.fromEntries(friends.map((e, idx) => [e, idx]));
  let passGiftList = Array(n)
    .fill(0)
    .map((_) => Array(n).fill(0));
  let result = Array(n)
    .fill(0)
    .map((_) => Array(n).fill(0));
  let giftPoints = Array(n).fill(0);

  passGift(passGiftList, friendsKey, friends, gifts);
  calcGiftPoint(n, giftPoints, passGiftList);
  calcNextMonthGiftPoint(n, passGiftList, result, giftPoints);

  answer = getMaxGiftPoint(result, n);
  return answer;
}

function passGift(passGiftList, friendsKey, friends, gifts) {
  gifts.forEach((g) => {
    const gift = g.split(" ");
    const [fromIdx, toIdx] = [friendsKey[gift[0]], friendsKey[gift[1]]];
    passGiftList[fromIdx][toIdx] += 1;
  });
}

function calcGiftPoint(n, giftPoints, passGiftList) {
  for (let i = 0; i < n; i++) {
    let giftPoint = 0;
    for (let j = 0; j < n; j++) {
      giftPoint += passGiftList[i][j] - passGiftList[j][i];
    }
    giftPoints[i] = giftPoint;
  }
}

function calcNextMonthGiftPoint(n, passGiftList, result, giftPoints) {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const give = passGiftList[i][j];
      const receive = passGiftList[j][i];

      if (give > receive) {
        result[i][j] += 1;
      } else if (give < receive) {
        result[j][i] += 1;
      } else {
        if (giftPoints[i] > giftPoints[j]) {
          result[i][j] += 1;
        } else if (giftPoints[i] < giftPoints[j]) {
          result[j][i] += 1;
        }
      }
    }
  }
}

function getMaxGiftPoint(result, n) {
  let maxGiftPoint = 0;
  for (let i = 0; i < n; i++) {
    let sumGiftPoint = 0;
    for (let j = 0; j < n; j++) {
      sumGiftPoint += result[i][j];
    }
    maxGiftPoint = Math.max(sumGiftPoint, maxGiftPoint);
  }

  return maxGiftPoint;
}
