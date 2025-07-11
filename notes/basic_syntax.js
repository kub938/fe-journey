// 반복문
const a = [1, 3, 45, 2, 10];
a.forEach((e, i) => {
  console.log(e, i);
});

//배열 선언
let array = Array(5).fill(0); // [0,0,0,0,0]
let dual_array = Array(2)
  .fill(0)
  .map((e) => Array(4).fill(0));

console.log(dual_array);

// 공백 기반 분할 [O(N)]
const str = "Hello World";
let ret = str.split(" ");
console.log(ret); //[ 'Hello', 'World' ]

// 리스트 str으로 합치기 [O(N)]
non_space_elem = ret.join(""); //사이에 삽입할 것을 명시
space_elem = ret.join(" ");
console.log(non_space_elem, space_elem);

//정렬 [O(N log N)]
let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
numbers = numbers.sort((a, b) => a - b); //오름차순 정렬 그냥 sort()만 해도 동작함
console.log(numbers);

numbers = numbers.sort((a, b) => b - a); //오름차순 정렬
console.log(numbers);

//필터 [O(N)]
const filter_numbers = numbers.filter((e) => e % 2 == 0);
console.log("filter_numbers = ", filter_numbers);

//배열에 다른 값을 반환하고 싶을때
//한개의 원소에 대해 각각 계산 결과 값 리스트로 반환
const map_numbers = [1, 2, 3, 4, 5];
const map_numbers_result = map_numbers.map((e) => e * 3);
const map_booleans_result = map_numbers.map((e) => e === 3);
console.log("map_numbers_result = ", map_numbers_result); //[3, 6, 9, 12, 15]
console.log("map_booleans_result = ", map_booleans_result); //[false, false, true, false, false]

//하나의 값을 만들기
const reduce_numbers = [1, 2, 3, 4, 5];
const reduced_number = reduce_numbers.reduce((total, e) => e * 2 + total, 0); // 0 = 토탈 초기값
console.log("reduced_number = ", reduced_number);

//값 검색
//해당하는 맨 첫번째 숫자 반환
const find_numbers = [1, 2, 3, 4];
const found_number = find_numbers.find((e) => e > 1);
console.log(found_number);

//값 인덱스 검색
//해당하는 맨 첫번째 인덱스 반환
const findIndex_numbers = [10, 11, 12, 13];
const foundIndex_number = findIndex_numbers.findIndex((e) => e > 10);
console.log("foundIndex_number = ", foundIndex_number);

//값의 존재 유무 확인
//true or false 반환
const include_numbers = [1, 2, 3, 4, 5];
const isInclude_number = include_numbers.includes(3);
console.log("isInclude_number = ", isInclude_number);

//문자열 일부를 추출
const apple = "apple";
const sub_apple = apple.substring(1, 3);
console.log("sub_apple = ", sub_apple);

//배열 또는 문자열에서 일부를 얕은 복사
console.log("abcdef".slice(1, 4));
console.log([1, 2, 3, 4, 5].slice(1, 4));

//객체관련 메소드
//Object.keys(obj)
const mock_object = {
  a: 0,
  b: 1,
  c: 2,
};

//key 리스트 출력
console.log(Object.keys(mock_object));
//value 리스트 출력
console.log(Object.values(mock_object));
//배열로 반환
console.log(Object.entries(mock_object));

//Math 관련 메서드

//반올림
//무조건 정수로 반환
//해당 자릿수 까지 반올림 하고 싶을 경우 10^n을 곱하고 그 이후 round 한 뒤 다시 10^n을 나누면 됨
console.log(Math.round(2.33)); // 2
console.log(Math.round(2.01234 * 10 ** 2) / 10 ** 2); // 2.01

//올림
console.log(Math.ceil(2.33)); // 3
console.log(Math.ceil(2.01234 * 10 ** 2) / 10 ** 2); // 2.02

//내림
console.log(Math.floor(2.33)); // 2
console.log(Math.floor(2.01234 * 10 ** 2) / 10 ** 2); // 2.01

//절댓값
console.log(Math.abs(2)); // 2
console.log(Math.abs(-2)); // 2
