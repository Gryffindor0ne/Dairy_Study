# Part 1-6.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 01 데이터타입

<br>

> ### undefined VS null

<br>

## undefined

<br>

- 자바스크립트에서 특별히 명시하지 않는 경우, 값이 존재하지 않으면 자동적으로 부여되는 값.

- 다음의 경우들이 해당된다.

1.  값을 할당하지 않은 변수의 값

```js
let name;
console.log(name); // undefined  <- 값이 존재하지 않음. 변수를 선언만 하고 값 할당하지 않았음.
```

2.  존재하지 않는 프로퍼티에 접근할 때

```js
const teamMember = {
  a: "Harry",
  b: "Hermione",
};

console.log(teamMember.a); // Harry
console.log(teamMember.b); // Hermione
console.log(teamMember.c); // undefined   <- 없는 프로퍼티
```

3.  함수 리턴을 하지 않았을 때

```js
function checkMember(name) {
  let check;
  if (name === "Harry") {
    check = true;
  } else {
    check = false;
  }
  // <- return문이 존재하지 않음. 결과값 없다.
}

console.log(checkMember("Harry")); // undefined
```

<br>

## null

<br>

- 값이 '비어있음'을 명시적으로 나타낼 때 사용하는 값.

- 주의사항 : typeof 메서드 사용시 object 가 나온다.

<br>

```js
let check = null;

console.log(typeof check); //  object

console.log(check); // null

console.log(check == null); // true
console.log(check == undefined); // true

console.log(check === null); // true
console.log(check === undefined); // false
```

- null은 undefined와 구분하려면 '==='를 사용해야 한다.

<br>

> null check

- 코드를 짜다보면 어떤 값이 null 혹은 undefined인지 확인하는 작업이 필요할 때가 있다.

  그럴 때 하는 것이 바로
  null check.

<br>

```js
function printIfNotNull(input) {
  if (input !== null && input !== undefined) {
    console.log(input);
  }
}
```

```js
// 아래 세 개의 식은 완전히 같은 의미.
input !== null && input !== undefined;
input != null;
input != undefined;
```
