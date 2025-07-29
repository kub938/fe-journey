const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const gear = input.slice(0, 4).map((e) => e.split(""));
const order = input.slice(5).map((e) => e.split(" "));

function gear_same_check(start_gear, spin_dir) {
  let spin_dir_arr = [0, 0, 0, 0];

  spin_dir_arr[start_gear] = spin_dir;

  let left_spin_dir = spin_dir;
  let right_spin_dir = spin_dir;
  for (let left = Number(start_gear); left > 0; left--) {
    left_spin_dir *= -1;

    if (gear[left][6] !== gear[left - 1][2]) {
      spin_dir_arr[left - 1] = left_spin_dir;
    } else {
      break;
    }
  }

  for (let right = Number(start_gear); right < 3; right++) {
    right_spin_dir *= -1;
    if (gear[right][2] !== gear[right + 1][6]) {
      spin_dir_arr[right + 1] = right_spin_dir;
    } else {
      break;
    }
  }
  return spin_dir_arr;
}

function gear_spin(spin_arr) {
  spin_arr.forEach((e, index) => {
    switch (e) {
      case -1:
        const tmp1 = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
          tmp1[i] = gear[index][i + 1];
        }
        tmp1[7] = gear[index][0];
        gear[index] = tmp1;
        break;
      case 1:
        const tmp2 = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
          tmp2[i + 1] = gear[index][i];
        }
        tmp2[0] = gear[index][7];
        gear[index] = tmp2;
        break;
      case 0:
        break;
    }
  });
}

function solution() {
  order.forEach((o) => {
    const target_gear_num = o[0] - 1;
    const spin_dir = Number(o[1]);

    const spin_arr = gear_same_check(target_gear_num, spin_dir);
    gear_spin(spin_arr);
  });

  let result = 0;
  let score = 1;
  gear.forEach((e) => {
    if (e[0] === "1") {
      result += score;
    }
    score *= 2;
  });
  console.log(result);
}

solution();
