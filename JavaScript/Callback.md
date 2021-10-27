# Part 4.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 04 Callback function

<br>

콜백함수는 다른 코드의 인자로 넘겨지는 함수이다.

콜백함수를 넘겨받은 함수는 콜백함수에 대한 제어권을 가지게 되며, 적절한 시기에 콜백함수를 실행시켜 사용하게 된다.

<br>

> ### 콜백함수의 예시를 살펴보자.

<br>

- `forEach` 메서드에서 콜백함수 ( `Synchronous(동기식) callback` )

```jsx
const friends = ["Harry", "Hermione", "Ron"];
friends.forEach(function (eachName, index) {
  console.log(index + 1 + ". " + eachName);
});

// 1. Harry
// 2. Hermione
// 3. Ron
```

위의 코드에서 forEach 메서드 안에서 사용된 익명의 함수가 콜백함수이다.

배열 메서드 내에서 사용되는 함수는 모두 콜백함수의 형식으로 사용된다.

<br>

- `setInterval` 함수에서 콜백함수 ( `Asynchronous(비동기식) callback` )

```jsx
let count = 0;
let func = function () {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};
let timer = setInterval(func, 500);

/*
-- 결과 --
0  (0.5초)
1  (1.0초)
2  (1.5초)
3  (2.0초)
4  (2.5초)
*/
```

setInterval 함수 내에 사용된 func 함수를 통해 0.5초마다 자동으로 결과가 반환된다.

여기서의 func 함수가 콜백함수이다.

<br>

- `Jquery`에서의 콜백함수 ( `Asynchronous(비동기식) callback` )

```jsx
$("#btn").click(function () {
  alert("Btn Clicked");
});
```

click 함수의 인자로 사용되는 콜백함수는 click 함수가 실행되어야만 작동한다.

<br>

> ## **Check Point**
>
> > ### 콜백 함수 내부의 this

<br>

```
콜백함수 내부에서 사용된 this의 대상은 의도와 다르게 설정될 수 있다.
```

this 파트 ( `세번째 상황 : 콜백 함수로서의 호출` ) 에서 간단히 설명한 적이 있지만, 여기서는 좀 다른 예시를 들어 추가로 설명해 보고자 한다.

<br>

- 예시코드

```jsx
const nbaSuperStar = {
  nickName: "AirJordan",
  fullName: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback(firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Not Set
console.log(window.fullName); //  Micheal Jordan
```

- setFullName 함수는 this의 fullName을 설정하는 함수로 만들어졌다.

  getStarName 함수를 실행할 때 설정하고자 하는 인수를 넣고, 마지막 인수로 nbaSuperStar 내 setFullName 함수를 실행시키면 의도와는 다르게 fullName이 설정되지 않는다.

  오히려 전역객체의 fullName이 설정되는 것을 볼 수 있다.

<br>

> ### **왜 그럴까?**

<br>

콜백 함수는 역시 함수다.

함수에서 this의 대상은 무엇이었던가?

바로 `window 객체(전역객체)`이다. (`nodejs는 global`)

<br>

- 위의 코드를 토대로 다음을 추가로 실행해보자.

```jsx
nbaSuperStar.setFullName("Ryan", "Lee");
console.log(nbaSuperStar.fullName); // Ryan Lee
```

- nbaSuperStar 객체의 메소드 setFullName를 인자를 넣어 실행하면 nbaSuperStar 객체의 fullName이 설정된다.

  메소드로 실행한 함수는 해당 객체를 this로 지정하기 때문에 원하는 결과가 반환된다.

<br>

> ### 다시 코드를 보면,

<br>

```jsx
const nbaSuperStar = {
  nickName: "AirJordan",
  fullName: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback(firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Not Set
console.log(window.fullName); //  Micheal Jordan
```

<br>

- getStarName 함수는 마지막 인자로 `nbaSuperStar.setFullName` 를 받는다.

  nbaSuperStar 객체의 메소드 setFullName를 콜백 함수로 전달함으로써 같은 결과를 얻고자 했지만,

  여기서 `nbaSuperStar.setFullName`는 메서드로 전달된 것이 아니라 함수 그 자체로 전달된 것이다.

 <br>

- 다시 말해, 함수 자체가 콜백함수로 전달되었다고 볼 수 있다.

```jsx
getStarName("Micheal", "Jordan", function (firstName, lastName) {
  this.fullName = `${firstName} ${lastName}`;
});
```

<br>

- 따라서 위의 함수을 실행하였을 때 this의 대상은 전역객체가 되며, getStarName 함수가 전역객체의 fullName을 설정하는 함수로서 작동하게 된다.

```jsx
console.log(window.fullName); //  Micheal Jordan
```

<br>

> ### 그럼, 원하는대로 고쳐보자!

<br>

```jsx
const nbaSuperStar = {
  nickname: "AirJordan",
  fullname: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback.call(nbaSuperStar, firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Micheal Jordan
```

- 위의 코드에서처럼 call 메서드를 사용하여 this의 대상을 바인딩하면 원하는 결과를 만들어 낼 수 있다.

  > 물론 apply 메서드도 마찬가지로 가능하다!

  <br>

---

<br>

> ## 콜백함수는 언제 사용되는가?

<br>

```jsx
콜백함수는 주로 `비동기적인 작업` 을 하기 위해 사용된다.
```

> Notice >  
> 물론 그렇다고 모든 콜백함수가 비동기적인 작업만 하는건 아니다. (예시를 보면 알 수 있다.)

<br>

자바스크립트는 Single Thread 언어이기 때문에 하나의 스레드에서 작업들이 순차적으로 수행된다. 그런데 동기적으로만 프로그램 언어가 실행된다면 프로그램이 멈추는 경우가 굉장히 많을 수 있다. 만약 시간이 오래 걸리는 작업(API 통신, setTimeout 등)을 만났을 때, 이 작업을 끝까지 기다리게 되면 그동안 다른 일을 못하게 된다. 매우 비효율적이라고 할 수 있다. 그렇기에 비동기적 처리 방식이 필요하다. 비동기적 처리 방식은 기다리지 않는다. 실행코드가 완료되지 않았더라도 다음 코드를 실행한다. 자바스크립트는 비동기적 처리가 가능하도록 설계가 되어있는 언어이다. 그리고, 이런 비동기 처리의 대표적인 방법이 바로 콜백함수을 이용하는 것이다.

<br>

> ### 비동기 처리 방식이란?

<br>

```jsx
`비동기적 처리 방식` 이란 현재 실행중인 코드의 완료 여부와는 관계없이 다음 코드를 실행하는 방식이다.

이는 `동기적 처리 방식` 과 반대되는 개념으로 `동기적 처리 방식`에서는 현재 실행중인 코드가 완료되지 않으면 다음 코드를 실행하지 않는다.

일을 순차적으로 처리하는 방식이기에 어떤 코드 상의 흐름을 따라가면서 실행한다.
```

<br>

**먼저, 동기적, 비동기적 방식의 차이에 대해 알아보자.**

<br>

- 예시 코드 1 ( `Synchronous(동기식)`)

```jsx
function func1() {
  console.log("func1");
  func2();
}

function func2() {
  console.log("func2");
  func3();
}

function func3() {
  console.log("func3");
}

func1();

/*
func1
func2
func3
*/
```

위의 예시 코드1 은 동기식 코드이다. 코드가 순차적으로 실행된다.

<br>

- 예시 코드 2 ( `Asynchronous(비동기식)` )

```jsx
function func1() {
  console.log("func1");
  func2();
}

function func2() {
  setTimeout(function () {
    console.log("func2");
  }, 0);

  func3();
}

function func3() {
  console.log("func3");
}
/*
func1
func3

func2
*/
```

위 예제를 실행하면 setTimeout 함수에 두번째 인수를 0초로 설정하여도 순서대로 출력되지 않는다. 이는 setTimeout 함수가 비동기 함수이기 때문이다. 코드가 실행되는 과정에서 함수의 실행을 보류시키고 다음 코드를 진행한다.

`console.log('func2')`를 보류시키고 func3 함수의 동기적 작업인 `console.log('func3')`을 실행한 후 마지막에 해당 함수를 실행하는 것이다. 특정 시간이 경과한 후까지 보류하는 것이지만 0초를 보류하는 설정이더라도 비동기적 작업이기에 다음 코드가 먼저 실행된다.

<br>

- 예시 코드 3

```jsx
console.log(`1`);
setTimeout(() => console.log(`2`), 1000);
console.log(`3`);

// Synchronous(동기식) callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log(`hello`));

// Asynchronous(비동기식) callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

printWithDelay(() => console.log(`async callback`), 2000);
```

- 자바스크립트는 위의 코드를 실행하면 다음과 같이 인식하고 실행한다.

  함수 선언식이 호이스팅되서 모두 상위로 끌어올려진 상태에서 순차적으로 실행된다.

<br>

```jsx
// Synchronous(동기식) callback
function printImmediately(print) {
  print();
}

// Asynchronous(비동기식) callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

console.log(`1`); // 동기적
setTimeout(() => console.log(`2`), 1000); // 비동기적
console.log(`3`); // 동기적
printImmediately(() => console.log(`hello`)); // 동기적
printWithDelay(() => console.log(`async callback`), 2000); // 비동기적

/*
-- 실행 결과 --
1
3
hello

2  (1초 후)
async callback (2초 후)

*/
```

순서대로 실행하면 동기적인 작업은 바로 실행되지만, 비동기적인 작업은 바로 실행되지 않는다. setTimeout 함수가 지정한 시간이 지난 후에 결과값을 반환한다.

<br>

```jsx
console.log(`1`)는 바로 출력되지만, setTimeout 함수 안의 인자로 받은 콜백 함수 `() => console.log(`2`)` 는 비동기적으로 실행된다.

console.log(`3`) 역시 바로 출력되고, printImmediately 함수는 콜백함수 `() => console.log(`hello`)` 를 인자로 받고 있지만,
printImmediately 함수 자체가 동기적인 실행을 하는 함수임으로 바로 실행되어 결과를 출력한다.
printWithDelay 함수는 인자로 받은 `() => console.log(`async callback`) `를
함수 내부의 비동기함수 setTimeout의 인자로 넘겨주기에 비동기적 방식으로 실행된다.
```

<br>

---

<br>

> ## Callback Hell

<br>

자바스크립트에서 이벤트 처리나 서버 통신과 같은 비동기 처리를 위해 사용되는 콜백함수는 한 가지 문제점을 가지고 있다. 바로 콜백 지옥 (Callback Hell)이 발생할 수 있다는 점이다.

<br>

```
콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제이다.
```

<br>

- 콜백 지옥의 예시 코드

```jsx
setTimeout(
  (name) => {
    let favoriteDrink = name;
    console.log(favoriteDrink);

    setTimeout(
      (name) => {
        favoriteDrink += ", " + name;
        console.log(favoriteDrink);

        setTimeout(
          (name) => {
            favoriteDrink += ", " + name;
            console.log(favoriteDrink);

            setTimeout(
              (name) => {
                favoriteDrink += ", " + name;
                console.log(favoriteDrink);
              },
              500,
              "Cool lime Fizzio"
            );
          },
          500,
          "Mango Banana Blended"
        );
      },
      500,
      "Jeju Organic Green Tea"
    );
  },
  500,
  "Toffee Nut Latte"
);

/*
-- 실행 결과 --
Toffee Nut Latte  (0.5초)
Toffee Nut Latte, Jeju Organic Green Tea  (1.0초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended  (1.5초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended, Cool lime Fizzio  (2.0초)
*/
```

위의 코드는 0.5초 마다 음료의 리스트를 출력하는데, 각 콜백 함수는 음료의 이름을 전달하고 목록에는 그 이름을 추가하는 형태로 쓰여졌다. 콜백함수의 값을 그 다음 콜백함수에 전달하여 결과값이 누적되는 이런 꼬리에 꼬리를 무는 형식의 코딩 구조를 `콜백 지옥` 이라고 한다.

보다시피, 값의 전달이 아래부터 시작하는 형식이라 가독성도 좋지 않고, 코드의 수정도 복잡하다.

<br>

- 콜백 지옥의 예시 코드 2

```jsx
const restaurantOrder = () => {
  takeOrder((order) => {
    passOrderToChef(order, (passedOrder) => {
      cookOrder(passedOrder, (cookedOrder) => {
        deliverOrder(cookedOrder, (deliveredOrder) => {
          payOrder(deliveredOrder);
        });
      });
    });
  });
};
```

<br>

이런 콜백 지옥을 해결하는 가장 간단한 방법은 익명의 콜백함수를 기명함수로 전환하는 것이다.

<br>

- 예시코드 1 : 기명함수로 전환

```jsx
let favoriteDrink = "";

const addLatte = (name) => {
  favoriteDrink = name;
  console.log(favoriteDrink);
  setTimeout(addTea, 500, "Jeju Organic Green Tea");
};

const addTea = (name) => {
  favoriteDrink += ", " + name;
  console.log(favoriteDrink);
  setTimeout(addBlended, 500, "Mango Banana Blended");
};

const addBlended = (name) => {
  favoriteDrink += ", " + name;
  console.log(favoriteDrink);
  setTimeout(addFizzio, 500, "Cool lime Fizzio");
};

const addFizzio = (name) => {
  favoriteDrink += ", " + name;
  console.log(favoriteDrink);
};

setTimeout(addLatte, 500, "Toffee Nut Latte");

/*
-- 실행 결과 --
Toffee Nut Latte  (0.5초)
Toffee Nut Latte, Jeju Organic Green Tea  (1.0초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended  (1.5초)
Toffee Nut Latte, Jeju Organic Green Tea, Mango Banana Blended, Cool lime Fizzio  (2.0초)
*/
```

이와 같이 각각의 콜백함수를 변수에 할당하여 사용한다면 콜백 지옥에서 벗어날 수 있다.  
그러나, 이 방법은 일회성 함수를 각각 변수에 일일이 할당하는 것이 꽤나 번거로운 작업이 될 수 있다.

ES6에서는 이러한 콜백 지옥을 해결할 수 있는 훌륭한 방법이 도입되었는데, 그건 바로 `Promise` 라는 녀석이다.

<br>

---

## 참고자료

- [드림코딩 엘리](https://www.youtube.com/watch?v=s1vpVCrT8f4)

- [동기식 처리 모델 vs 비동기식 처리 모델](https://poiemaweb.com/js-async)
