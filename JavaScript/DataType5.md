# Part 1-5.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 01 데이터타입

<br>

> ### 얕은 복사 VS 깊은 복사

<br>

## <div style = "grey"> 얕은 복사

<br>

```js
const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: "guseul chigi",
    fourth: "dalgona",
  },
};

const shallowCopy = function (item) {
  const result = {};
  for (const key in item) {
    result[key] = item[key];
  }
  return result;
};

const player2 = shallowCopy(player);

player2.name = "Hermione";
console.log(player.name === player2.name); // false
console.log(player.name, player2.name); // Harry Hermione

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first); // true
console.log(player.playSports.first, player2.playSports.first); // Squid Game Squid Game

player2.playSports.fourth = "";
console.log(player.playSports.fourth === player2.playSports.fourth); // true
```

얕은 복사를 실행하는 함수 shallowCopy를 통해 기존의 player 객체를 복사하여 player2 객체를 만들었다.

- player2의 깊이 1의 프로퍼티 name의 값을 변경하니 'Harry'에서 'Hermione'로 변경되었고 기존의 player의 값은 원본 그대로 유지됨을 볼 수 있다.

- player2의 깊이 2의 프로퍼티 playSports의 first, fourth의 값을 변경하자 원본과 사본 모두 데이터가 변경됨을 알 수 있다.

<br>

> 얕은 복사를 통한 객체 복사는 깊이 1 (한 단계의 깊이)의 프로퍼티는 변경이 가능하지만 깊이 2(중첩된 객체의 프로퍼티, 두 단계의 깊이)의 데이터는 기존의 데이터를 동일하게 참조하고 있기 때문에 원본, 사본 모두 변경됨을 알 수 있다.
>
> > 즉, 얕은 복사는 깊이 1의 복사만 가능하다고 할 수 있다.

<br>

---

<br>

> 중첩된 객체의 내부 프로퍼티까지 다 복사하는 `깊은 복사`를 실행하는 방법은 2가지가 있다. (이 책의 경우)

<br>

## <div style = "grey"> 깊은 복사

<br>

1. 중첩된 깊이만큼 내부의 프로퍼티에 접근하여 얕은 복사를 실행하는 것이다. 얕은 복사를 재귀적 방법으로 실행하여야 한다.

```js
const deepCopy = function (item) {
  let result = {};
  if (typeof item === "object" && item !== null) {
    // null이 object로 인식되는 것 때문에
    for (const key in item) {
      result[key] = deepCopy(item[key]);
    }
  } else {
    result = item;
  }
  return result;
};

const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: ["guseul chigi", "dalgona"],
  },
};

const player2 = deepCopy(player);

player2.name = "Hermione";
console.log(player.name === player2.name); // false
console.log(player.name, player2.name); // Harry Hermione

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first); // false
console.log(player.playSports.first, player2.playSports.first); // Squid Game Quidditch

player2.playSports.third[1] = "";
console.log(player.playSports.third === player2.playSports.third); // false
console.log(player.playSports.third, player2.playSports.third); //  ["guseul chigi", "dalgona"]   third: { 0:"guseul chigi", 1:""}
```

- 함수 deepCopy를 사용하면 프로퍼티의 값이 object 임을 확인하며 재귀적 방법을 통해 깊은 복사를 실행할 수 있다.

- 그러나, 함수 deepCopy의 'result = item'으로 인해 프로퍼티의 값이 배열인 경우 객체로 변경되는 부분이 발생한다는 점에서 완벽한 깊은 복사는 아니다.

<br>

2. JSON.parse(JSON.stringify(객체)) 사용

```js
const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: ["guseul chigi", "dalgona"],
  },
};

const player2 = JSON.parse(JSON.stringify(player));

player2.name = "Hermione";
console.log(player.name === player2.name); // false
console.log(player.name, player2.name); // Harry Hermione

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first); // false
console.log(player.playSports.first, player2.playSports.first); // Squid Game Quidditch

player2.playSports.third[1] = "";
console.log(player.playSports.third === player2.playSports.third); // false
console.log(player.playSports.third, player2.playSports.third); // ['guseul chigi', 'dalgona']  ['guseul chigi', '']
```

- player의 객체를 문자열로 변경하였다가 (JSON.stringify) 다시 객체로 변환하는 (JSON.parse) 방식의 JSON 문법을 이용하는 것이다.

  보다시피 완벽하게 깊은 복사가 실행되는 것을 볼 수 있다.

  그렇지만, 이 방법 역시 아쉬운 점이 있다.

  만약 프로퍼티의 값이 문자열로 변경이 불가능한 것들(가령, 함수와 같은)이라면, 위와 같은 JSON 방식의 깊은 복사가 불가능하다.

  <br>

```js
const example = [function () {}, () => {}];
const copied = JSON.parse(JSON.stringify(example));

console.log(copied); // [null, null]
```

---

## **얕은 복사**의 추가적인 예시

<br>

> ### Array.prototype.slice()

<br>

```js
const arr = [1, 2, 3, 4];
const copied = arr.slice();

copied[3] = 9;

console.log(arr === copied); // false
console.log(arr, copied); // [1,2,3,4] [1,2,3,9]
```

- slice 메서드를 사용한 배열 복사 역시 얕은 복사이다.

<br>

```js
const arr = [1, 2, 3, ["a", "b"]];
const copied = arr.slice();

copied[3][1] = "c";

console.log(arr === copied); // false
console.log(arr, copied); //  [1,2,3,['a','c']]  [1,2,3,['a','c']]
```

- slice 메서드를 통한 중첩 객체 복사, 깊은 복사는 이뤄지지 않는다.

<br>

> ### Spread Operator

<br>

```js
const arr = [1, 2, 3, 4];
const copied = [...arr];

copied[3] = 9;

console.log(arr === copied); //  false
console.log(arr, copied); // [1,2,3,4] [1,2,3,9]
```

- Spread Operator 용법을 통한 객체 복사 역시 얕은 복사이다.

<br>

```js
const arr = [1, 2, 3, ["a", "b"]];
const copied = [...arr];

copied[3][1] = "c";

console.log(arr === copied); //  false
console.log(arr, copied); //  [1,2,3,['a','c']]  [1,2,3,['a','c']]
```

- slice 메서드를 사용한 것과 마찬가지로 이것 또한 깊은 복사는 이뤄지지 않는다.

<br>

> ### Object.assign()

<br>

```js
const arr = [1, 2, 3, 4];
const copied = Object.assign([], arr);

copied[3] = 9;

console.log(arr === copied); // false
console.log(arr, copied); // [1,2,3,4] [1,2,3,9]
```

- Object.assign()을 통한 복사도 얕은 복사이다. 이것 역시나 깊은 복사는 되지 않는다.

<br>

```js
const arr = [1, 2, 3, ["a", "b"]];
const copied = Object.assign([], arr);

copied[3][1] = "c";

console.log(arr === copied); // false
console.log(arr, copied); //  [1,2,3,['a','c']]  [1,2,3,['a','c']]
```
