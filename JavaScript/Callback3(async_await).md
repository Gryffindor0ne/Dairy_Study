# Part 4-3.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 04-3 Async / await

<br>

**Promise** Chaining이 많아지면 가독성이 현저히 떨어지는 문제가 발생하는데,

ES2017(ES8)에서는 **Promise** 의 단점을 보완하고자 **Async / await** 이란 새로운 방식이 도입되었다.

**Async / await** 은 완전히 새로운 것이라기 보다는 기존 **Promise**를 토대로 좀 더 간편한 API를 제공하는 녀석이라고 보면 된다.

이런 것을 `Syntactic sugar` 라고 한다.

![syntactic sugar](https://user-images.githubusercontent.com/79234473/139531285-342ab2ec-01fe-4f56-bb77-5ddf9189867d.jpeg)

<br>

---

## **Async / await**

<br>

**기존 Promise 예시**

```jsx
function fetchUser() {
  return new Promise((resolve, reject) => {
    // return "Ryan"  //   Promise {<pending>}
    resolve("Ryan");
  });
}

const user = fetchUser();
user.then(console.log); // Ryan
console.log(user); // Promise {<fulfilled>: 'Ryan'}
```

기존 **Promise** 구문의 예시이다. Promise 에서는 반드시 내부에서 resolve 나 reject 함수를 호출하여 상태를 완료시켜야만 결과가 도출된다.

> 그냥 리턴문을 적을 시 `Promise {<pending>}` 상태가 유지된다.

<br>

### **Async**

<br>

```jsx
async function fetchUser() {
  return "Ryan";
}

const user = fetchUser();
user.then(console.log); // Ryan
console.log(user); // Promise {<fulfilled>: 'Ryan'}
```

**async** 를 사용하면 코드블럭 ( `{}` ) 안에 있는 코드들이 자동적으로 **Promise**로 변경된다. 엄청 간단한 코드가 된다.

<br>

**async** 키워드를 함수 앞에 적어주기만 하면 된다.

```jsx
const fetchUser = async function () {
  // 함수 표현식은 ...
  return "Ryan";
};

const fetchUser = async () => {
  // 화살표 함수는 ...
  return "Ryan";
};
```

<br>

### **Await**

<br>

**기존 Promise 예시**

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getHalloweenItem1() {
  return delay(1000).then(() => `🎃`);
}
function getHalloweenItem2() {
  return delay(1000).then(() => `👻`);
}

function goHalloweenParty() {
  return getHalloweenItem1().then((item1) => {
    return getHalloweenItem2().then((item2) => `${item1} & ${item2}`);
  });
}
goHalloweenParty().then((result) => console.log(result)); // 🎃 & 👻
```

기존 **Promise** 구문에서 `goHalloweenParty()`의 복잡한 체이닝은 콜백지옥을 연상시킨다.
**Async / await** 를 사용하면 좀 더 간결한 코드로 만들 수 있다.

<br>

위의 코드를 바꿔보면,

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  // await 뒤에 오는 메소드는 비동기 작업을 실행하는 것이어야 한다.
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(1000);
  return `👻`;
}

async function goHalloweenParty() {
  const item1 = await getHalloweenItem1();
  const item2 = await getHalloweenItem2();
  return `${item1} & ${item2}`;
}

goHalloweenParty().then(console.log); // 🎃 & 👻
```

> ### **await** 은 **async** 키워드로 설정된 함수 안에서만 사용이 가능하다.

<br>

---

## **Error handling**

<br>

> ### **For Example**

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(1000);
  throw new Error(`error => 🙀`);
  return `👻`;
}

async function goHalloweenParty() {
  const item1 = await getHalloweenItem1();
  const item2 = await getHalloweenItem2();
  return `${item1} & ${item2}`;
}

goHalloweenParty().then(console.log);
```

```jsx
// Uncaught (in promise) Error: error => 🙀
```

getHalloweenItem2 함수 내부에 에러를 발생시키면 현재 구문에서는 에러를 핸들링하지 못한다.

### **Async / await** 에서는 `try / catch` 구문을 통해 에러 핸들링한다.

<br>

다음과 같이 수정하면 가능해진다.

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(1000);
  throw new Error(`error => 🙀`);
  return `👻`;
}

async function goHalloweenParty() {
  try {
    const item1 = await getHalloweenItem1();
  } catch (err) {
    console.log(err);
    return "🙀";
  }
  try {
    const item2 = await getHalloweenItem2();
  } catch (err) {
    console.log(err);
    return "🙀";
  }
  return `${item1} & ${item2}`;
}
goHalloweenParty().then(console.log);
```

```jsx
Error: error => 🙀

🙀
```

<br>

---

> ### **Additional**

<br>

## **Promise.all**

<br>

다시 코드를 보자.

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(1000);
  return `👻`;
}

async function goHalloweenParty() {
  const item1 = await getHalloweenItem1();
  const item2 = await getHalloweenItem2();
  return `${item1} & ${item2}`;
}

goHalloweenParty().then(console.log); // 🎃 & 👻
```

getHalloweenItem1 함수와 getHalloweenItem2 함수는 각각 독립적인 함수이다. 굳이 위의 코드에서처럼 순차적으로 실행할 필요가 없다.

<br>

### **Promise.all - Promise의 병렬 처리**

여러 개의 비동기 작업을 병렬적으로 처리하고 싶을 때 사용하는 것이 바로 **Promise.all** 이다.

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(1000);
  return `👻`;
}

const getAllItems = () => {
  return Promise.all([getHalloweenItem1(), getHalloweenItem2()]) //
    .then((items) => {
      return items.join(` & `);
    });
};

getAllItems().then(console.log); // 🎃 & 👻
```

<br>

다른 예시를 보면, 이해하기가 더 쉽다.

```jsx
function makePizza(toppings = []) {
  const pizzaPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(
        `Here is your pizza 🍕 with the toppings ${toppings.join(" & ")}`
      );
    }, 1000);
  });
  return pizzaPromise;
}

const pizzaPromise1 = makePizza(["hot peppers", "onion", "pineapple"]);
const pizzaPromise2 = makePizza(["mozzarella", "bacon", "mushroom"]);
const pizzaPromise3 = makePizza(["ham", "cheese"]);

const dinnerPromise = Promise.all([
  pizzaPromise1,
  pizzaPromise2,
  pizzaPromise3,
]);

dinnerPromise.then((pizzas) => {
  console.log(pizzas);
});

/*
['Here is your pizza 🍕 with the toppings hot peppers & onion & pineapple', 'Here is your pizza 🍕 with the toppings mozzarella & bacon & mushroom', 
'Here is your pizza 🍕 with the toppings ham & cheese']
*/
```

피자 만드는데 들어가는 토핑재료를 받아서 알려주는 함수가 있다고 치자.

3가지 종류의 피자가 만들어지는데 각각의 promise 를 병렬적으로 묶어서 실행하도록 **Promise.all**을 사용하고 있다.

<br>

## **Promise.race**

<br>

여러 개의 비동기 작업 중 가장 먼저 끝나는 작업만 알고 싶다면 사용하는 방법이다.

<br>

예시코드를 조금 바꿔보자.

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getHalloweenItem1() {
  await delay(1000);
  return `🎃`;
}
async function getHalloweenItem2() {
  await delay(3000);
  return `👻`;
}

const getFastItem = () => {
  return Promise.race([getHalloweenItem1(), getHalloweenItem2()]);
};

getFastItem().then(console.log); //  🎃
```

getHalloweenItem2 함수의 시간을 3초로 변경하고, **Promise.race**를 실행하면 가장 먼저 실행되는 녀석만 출력된다.

<br>

```jsx
function makePizza(toppings = []) {
  const pizzaPromise = new Promise(function (resolve, reject) {
    const amountOfTimeToBake = 500 + toppings.length * 200;
    // 토핑 수에 따라 시간을 달리 준다.
    setTimeout(function () {
      resolve(
        `Here is your pizza 🍕 with the toppings ${toppings.join(" & ")}`
      );
    }, amountOfTimeToBake);
  });
  return pizzaPromise;
}

const pizzaPromise1 = makePizza([
  "hot peppers",
  "onion",
  "pineapple",
  "garlic",
]);
const pizzaPromise2 = makePizza(["mozzarella", "bacon", "mushroom"]);
const pizzaPromise3 = makePizza(["ham", "cheese"]);

const firstPizzaPromise = Promise.race([
  pizzaPromise1,
  pizzaPromise2,
  pizzaPromise3,
]);

firstPizzaPromise.then((pizza) => {
  console.log("You must be hungry, here is the first one ready");
  console.log(pizza);
});

/*
You must be hungry, here is the first one ready
Here is your pizza 🍕 with the toppings ham & cheese
*/
```

피자가 만들어지는 시간을 토핑의 개수에 따라 다르게 설정하는 코드를 추가하였다.

**Promise.race**를 실행하면 3종류의 피자 중 가장 빠르게 만들어지는 피자인 토핑 2개의 `ham & cheese` 피자가 출력되고, 나머지는 무시된다.

<br>

---

### 앞서 살펴보았던 코드를 이제 **Async / await** 으로 바꿔 보자.

<br>

<br>

> ### **For Example** 1

<br>

```jsx
const favoriteDrink = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 500);
  });
};

const drinkMaker = async () => {
  let drinkList = "";
  let _favoriteDrink = async (name) => {
    drinkList += (drinkList ? ", " : "") + (await favoriteDrink(name));
  };
  await _favoriteDrink("Toffee Nut Latte");
  console.log(drinkList);
  await _favoriteDrink("Jeju Organic Green Tea");
  console.log(drinkList);
  await _favoriteDrink("Mango Banana Blended");
  console.log(drinkList);
  await _favoriteDrink("Cool Lime Fizzio");
  console.log(drinkList);
};

drinkMaker();

/*
Toffee Nut Latte (0.5초)
Toffee Nut Latte, Jeju Organic Green Tea  (1초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended  (1.5초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended, Cool Lime Fizzio (2초)
*/
```

<br>

> ### **For Example** 2

<br>

```jsx
const delay = (ms, result) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms));

async function delays() {
  let a = await delay(800, "Hello, I'm in an");
  console.log(a);

  let b = await delay(400, "async function!");
  console.log(b);
}

delays();

/*
    -- 실행 결과 --

    Hello, I'm in a  (0.8초)
    async function!  (1.2초)

*/
```

<br>

---

## 참고자료

- [드림코딩 엘리\_비동기의 꽃 JavaScript async 와 await 그리고 유용한 Promise APIs](https://www.youtube.com/watch?v=aoQSOZfz3vQ)

- [Wes Bos](https://wesbos.com/javascript/12-advanced-flow-control/67-promises/#promiseall)
