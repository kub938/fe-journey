const ob = {
  key1: "hello",
  key2: "my",
  key3: "name",
  key4: "is",
  key5: "yun",
};

const arr = ["this", "is", "array"];

console.log("object keys  = ", Object.keys(ob).join(", "));
console.log("object values = ", Object.values(ob).join(", "));

Object.entries(ob).forEach(([k, v]) => {
  console.log();
});

const newOb = structuredClone(ob);

console.log(newOb);

//아래와  같이 Object 메서드는 arr에서도 상용할 수 있다.
console.log(Object.keys(arr));
