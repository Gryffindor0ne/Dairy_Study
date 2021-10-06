# Part 1-4.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 01 데이터타입

<br>

### 불변 객체

<br>

참조형 데이터의 `가변성`은 객체 내부의 프로퍼티를 변경할 때에만 해당

<br>

    그럼, 불변 객체는 어떤 경우에 필요한 것일까?

<br>

- 다음의 예시를 살펴보자.

```js
const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const changeName = function (player, newName) {
  const newPlayer = player;
  newPlayer.name = newName;
  return newPlayer;
};

const player2 = changeName(player, "Ron");

console.log(player.name, player2.name); // Ron Ron
console.log(player === player2); // true
```

<br>

    1. player 변수 안에 객체를 생성하여 할당하였다.

    2. 이름만 변경하는 함수 changeName을 작성하고
       player2 변수에 이름을 바꾼 객체를 할당하였다.

- player의 값은 디폴트로 놔두고, 이름만 변경한 새로운 데이터를 player2에 입력하고 싶었으나
  결과는 player, player2의 이름이 모두 변경됨을 알 수 있다.

- player와 player2의 값은 같은 주소값을 가리키고 있기 때문에
  위의 함수 changeName를 사용하면 해당 주소값에 연결된 데이터 객체가 변경된다.

  객체 내부의 프로퍼티만 바꾸는 참조형 데이터의 가변성의 예라고 볼 수 있다.

<br>

```
그럼, 의도대로 player의 값은 변경하지 않고, player의 값을 기준으로 player2의 name 값만 바꾸려면 어떻게 해야 할까?
```

<br>

- 다음은 객체 가변성을 해결하는 불변 객체를 만드는 예시이다.

```js
const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const changeName = function (player, newName) {
  return {
    name: newName,
    number: player.number,
    playSports: player.playSports,
    position: player.position,
  };
};

const player2 = changeName(player, "Ron");

console.log(player.name, player2.name); // Harry, Ron
console.log(player === player2); // false
```

- 위와 같이 코드를 수정하면,

  player의 값을 디폴트로 설정하고, 함수 changeName를 통해 이름만 변경된 새로운 객체를 생성하여 사용할 수 있다.

  그러나, 위의 코드는 이름을 제외한 나머지 프로퍼티들을 하드 코팅하여 효율성이 떨어진다. 객체의 프로퍼티가 훨씬 많다면 너무 비효율적인 코드가 된다.

<br>

> 그래서 불변 객체를 만드는 방법 중 많이 사용되는 것이 `얕은 복사`를 하는 방법이다.

```js
const copyObject = function (item) {
  const result = {};
  for (const key in item) {
    result[key] = item[key];
  }
  return result;
};

const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const player2 = copyObject(player);
player2.name = "Ron";

console.log(player.name, player2.name); // Harry Ron
console.log(player === player2); // false
```

<br>

> 뭐, 좀 더 간단한 방법도 있다.

```js
내장메소드 Object.assign을 쓰면 좀 더 간단한 얕은 복사가 가능하다.
```

<br>

```js
const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const player2 = Object.assign({}, player);
player2.name = "Ron";

console.log(player.name, player2.name); // Harry Ron
console.log(player === player2); // false
```
