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

## 1. **State**

<br>

> ### **Promise** 는 3가지 상태를 가진다.

<br>

**pending** : 비동기 처리가 아직 진행되지 않은 상태 [`resolve 또는 reject 함수가 실행되지 않음`]

**fulfulled** : 비동기 처리가 수행된 상태 (성공) [`resolve 함수 실행`]

**rejected** : 비동기 처리가 수행된 상태 (실패) [`reject 함수 실행`]

<br>

![promiseFlow](https://user-images.githubusercontent.com/79234473/139370123-69734ba7-fd54-4906-a05d-acdcbc72d539.png)

<br>

## 2. **Producer** vs **Consumer**

<br>

## **Producer**

<br>

> ### **Notice**
>
> > **Promise** 는 생성한 즉시 실행된다. 자동적으로~

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

## **Consumers**

<br>

> ### then, catch, finally : 결과값을 받아온다.
>
> <br>

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

<br>

### **then**

```
then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다.

첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고

두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
```

```jsx
p.then(onFulfilled, onRejected);

p.then(
  function (value) {
    // fulfillment
  },
  function (reason) {
    // rejection
  }
);
```

<br>

### **catch**

```
예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다.
```

```jsx
p.catch(onRejected);

p.catch(function (reason) {
  // rejection
});
```

<br>

### **finally**

```
Promise가 처리되면 충족되거나 거부되는지 여부에 관계없이 지정된 콜백 함수가 실행된다.

이것은 Promise가 성공적으로 실행되었는지 거절되었는지에 관계없이 Promise가 처리 된 후에 코드가 무조건 한 번은 실행되게 한다.
```

```jsx
p.finally(onFinally);

p.finally(function () {
  // settled (fulfilled or rejected)
});
```

---

<br>

> ### **For Example**
>
> <br>

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
  })
  .finally(() => {
    console.log("finally");
  });
```

위의 예시를 보면, 좀 더 이해가 될 듯 하다.

변수 complete를 가지고 성공, 실패를 확인할 수 있는데, 지금 변수의 값이 false 임으로 reject 함수가 실행될 것이다.

결과는 `value -> something wrong!`

변수 complete가 true 라면 resolve 함수가 실행되고,

결과는 `value -> result!` 가 나올 것이다.

그리고 변수 complete가 무엇이든 간에

결과값으로 `finally` 는 무조건 출력된다.

---

<br>

## **Promise Chaining**

<br>

**Promise** 는 여러 개의 **Promise** 를 연결하여 사용할 수 있다.

<br>

> ### **For Example** 1

<br>

```jsx
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(5), 1000);
});

fetchNumber
  .then((num) => num * 2) // -> 10
  .then((num) => num * 3) // -> 30
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 10), 1000);
    }); // -> 20
  })
  .then((num) => console.log(num)); // 20
```

결과값을 받아 바로 다음 .then으로 넘겨주는 형식으로 진행된다.

<br>

> ### **For Example** 2

<br>

```jsx
const delay = (ms, result) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms));

function delays() {
  return delay(800, "Hello, I'm in a")
    .then((a) => {
      console.log(a);
      return delay(400, "Promise!");
    })
    .then((b) => {
      console.log(b);
    });
}

delays();

/*
    -- 실행 결과 --

    Hello, I'm in a  (0.8초)
    Promise!         (1.2초)

  */
```

<br>

> ### 자, 그럼 콜백함수에서 콜백지옥이 발생하던 코드를 Promise로 변경해보자.

<br>

```jsx
new Promise((resolve) => {
  setTimeout(() => {
    let name = "Toffee Nut Latte";
    console.log(name);
    resolve(name);
  }, 500);
})
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ", Jeju Organic Green Tea";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ", Mango Banana Blended";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ", Cool lime Fizzio";
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

- 좀 더 간단하게 코드를 바꾸면,

```jsx
const favoriteDrink = (name) => {
  return (prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newName = prevName ? `${prevName}, ${name}` : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};

favoriteDrink("Toffee Nut Latte")()
  .then(favoriteDrink("Jeju Organic Green Tea"))
  .then(favoriteDrink("Mango Banana Blended"))
  .then(favoriteDrink("Cool lime Fizzio"));
```

<br>

---

<br>

## **Error handling**

<br>

**Promise** 에서는 2가지 방법으로 에러처리가 가능하다.

첫번째는 then 메소드의 두번째 콜백함수를 사용하는 방법이고, 두번째 방식은 catch 메소드를 사용하는 방법이다.

그러나, 첫번째 방법의 에러처리는 가독성이 좋지 않을 뿐더러, then 메소드의 첫번째 콜백 함수에서 에러가 나면 잡아내질 못한다.

때문에 **Promise** 에러처리는 두번째 방식인 catch 메소드를 사용하는 것이 권장된다.

<br>

> ### **For Example**

<br>

- then 메소드의 두번째 콜백 함수 사용하는 에러처리

```jsx
const errorHandling = new Promise((resolve, reject) => {
  setTimeout(() => reject("failed!"), 1000);
});

errorHandling.then(
  () => {},
  (err) => {
    console.log(err);
  }
); // failed!
```

<br>

- catch 메소드를 통한 에러처리

```jsx
const errorHandling = new Promise((resolve, reject) => {
  setTimeout(() => reject("failed!"), 1000);
});

errorHandling
  .then(() => {})
  .catch((err) => {
    console.log(err);
  }); // failed!
```

2가지 경우 다 결과는 동일하다.

<br>

> ### 그럼, 다음의 경우를 살펴보자.

<br>

- then 메소드의 두번째 콜백 함수 사용하는 에러처리 2

```jsx
const errorHandling = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Checked!"), 1000);
});

errorHandling.then(
  (result) => {
    console.log(result);
    throw new Error("Error then method!");
  },
  (err) => {
    console.log(err);
  }
);

/*

  -- 실행 결과 --

Checked!
Uncaught (in promise) Error: Error then method!
  
*/
```

then 메소드의 첫번째 콜백함수 내부에서 일어나는 에러를 잡아내지 못한다.

<br>

- catch 메소드를 통한 에러처리 2

```jsx
const errorHandling = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Checked!"), 1000);
});

errorHandling
  .then((result) => {
    console.log(result);
    throw new Error("Error then method!");
  })
  .catch((err) => {
    console.log(err);
  });

/*

  -- 실행 결과 --

Checked!
Error: Error then method!
  
*/
```

catch 메소드를 사용하는 경우 에러처리가 가능하다.

<br>

---

## 참고자료

- [프로미스](https://poiemaweb.com/es6-promise)

- [드림코딩 엘리\_ Javascript promise](https://www.youtube.com/watch?v=JB_yU6Oe2eE)

- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
