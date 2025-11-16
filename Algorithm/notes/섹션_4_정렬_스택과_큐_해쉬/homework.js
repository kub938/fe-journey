// Q.
// 다음과 같이 숫자로 이루어진 배열이 두 개가 있다.
// 하나는 상품의 가격을 담은 배열이고, 하나는 쿠폰을 담은 배열이다.
// 쿠폰의 할인율에 따라 상품의 가격을 할인 받을 수 있다.
// 이 때, 최대한 할인을 많이 받는다면 얼마를 내야 하는가?
// 단, 할인쿠폰은 한 제품에 한 번씩만 적용 가능하다.

const prices = [30000, 2000, 1500000]; //상품의 가격
const coupons = [20, 40]; //쿠폰, 할인율의 단위는 % 입니다.

function solution() {
  const max_discount = Math.max(...coupons);
  const min_discount = Math.min(...coupons);

  const max_discount_price = prices.map(
    (price) => price * (1 - max_discount / 100)
  );
  const min_discount_price = prices.map(
    (price) => price * (1 - min_discount / 100)
  );

  return Math.min(...max_discount_price, ...min_discount_price);
}

console.log(solution());
