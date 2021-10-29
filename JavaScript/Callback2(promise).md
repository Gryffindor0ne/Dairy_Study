# Part 4-2.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 04-2 Promise

<br>

### **`Promise`** 는 자바스크립트에서 비동기 작업을 간편하게 할 수 있게 도와주는 객체이다.

<br>

비동기 작업을 수행하다가 작업이 성공적으로 이루어지면 성공의 결과값을 반환하지만, 예상치 못한 상황이 발생하여 작업이 실패하면 error를 반환한다.

<br>

## Promise의 주요 POINT!

<br>

### 1. **State**

<br>

> ### **Promise** 는 3가지 상태를 가진다.

<br>

**pending** : 비동기 처리가 아직 진행되지 않은 상태 [`resolve 또는 reject 함수가 실행되지 않음`]

**fulfulled** : 비동기 처리가 수행된 상태 (성공) [`resolve 함수 실행`]

**rejected** : 비동기 처리가 수행된 상태 (실패) [`reject 함수 실행`]

<br>

![promiseFlow](https://user-images.githubusercontent.com/79234473/139370123-69734ba7-fd54-4906-a05d-acdcbc72d539.png)

<br>

### 2. **Producer** vs **Consumer**

<br>

### **Producer**

<br>

> ### **Notice**
>
> > **Promise**는 생성한 즉시 실행된다. 자동적으로~

```jsx
const promise = new Promise((resolve, reject) => {
  // 주로 비동기 작업 실행 (network, read files)
  console.log("Execution!"); // Execution! // promise 생성되면 무조건 실행!
  setTimeout(() => {
    resolve("Success!"); // 성공시
    // reject(new Error("no network"));  // 실패시
  }, 2000);
});
```

<br>

### **Consumers**

<br>

> ### then, catch, finally : 결과값을 받아온다.

```jsx
promise
  .then((value) => {
    console.log(value); // Success!  // 성공시
  })
  .catch((error) => {
    console.log(error); // Error: no network    // 실패시
  })
  .finally(() => {
    console.log("Finally"); // Finally
  });
```

생성자 함수로 만들어진 promise 객체를 통해 결과값을 받아올 수 있다.

<br>

**then**

```
then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
```

**catch**

```
예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다.
```

**finally**

```
Promise가 처리되면 충족되거나 거부되는지 여부에 관계없이 지정된 콜백 함수가 실행된다. 이것은 Promise가 성공적으로 실행되었는지 거절되었는지에 관계없이 Promise가 처리 된 후에 코드가 무조건 한 번은 실행되게 한다.
```

---

<br>

> ### **For Example**

```jsx
let promise = new Promise((resolve, reject) => {
  let complete = false;

  if (complete) {
    // resolve callback
    resolve("result!");
  } else {
    // reject callback
    reject("something wrong!");
  }
});

promise
  .then((value) => {
    // onFulfilled() in .then method
    console.log("value ->", value);
  })
  .catch((value) => {
    // onRejected() in .catch method
    console.log("value ->", value);
  });
```

위의 예시를 보면, 좀 더 이해가 될 듯 하다.

변수 complete를 가지고 성공, 실패를 확인할 수 있는데, 지금 변수의 값이 false 임으로 reject 함수가 실행될 것이다.

결과는 `value -> something wrong!`

변수 complete가 true 라면 resolve 함수가 실행되고,

결과는 `value -> result!` 가 나올 것이다.

---

<br>

---

## 참고자료

- [프로미스](https://poiemaweb.com/es6-promise)

- [드림코딩 엘리\_ Javascript promise](https://www.youtube.com/watch?v=JB_yU6Oe2eE)
