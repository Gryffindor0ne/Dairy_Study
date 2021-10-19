# Part 2-2.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 02 실행 컨텍스트 (Execution Context)

<br>

## 호이스팅 (Hoisting)

<br>

실행컨텍스트의 원리를 공부하다보면 당연하게 마주치는 그것.

바로 **호이스팅(Hoisting)**.

앞선 글에서도 잠깐 언급했지만 여기에선 좀 더 호이스팅을 정리하고 넘어가고자 한다.

<br>

> ### 호이스팅(Hoisting)이란?

<br>

```
호이스팅(Hoisting)이란, 변수나 함수의 선언이 유효 범위 최상단으로 끌어올려진 것처럼 동작하는 자바스크립트의 특성이다.
```

<br>

> ### 호이스팅은 왜 일어나는가?

<br>

자바스크립트 엔진은 코드를 실행할 때 앞서 본 것과 같이 (바로 전 Part 2.) EC를 생성한다.

**(EC의 실행과정은 크게 생성단계와 실행단계로 나뉜다.)**

EC를 생성하는 단계에서 코드실행에 필요한 자료를 수집하게 되는데
(EnvironmentRecord를 구성)

이 과정에서 자바스크립트 엔진은 코드를 실행하기 전에 해당 코드를 한 번 미리 리딩한다.

이 리딩을 통해 코드 실행에 필요한 변수 / 함수 선언에 대한 정보를 기억한다.

이후 실제 코드가 실행될 때 이미 정보를 가진 상태에서 실행되기 때문에 마치 모든 변수 / 함수 선언이 유효범위의 최상단에 끌어올려진 것처럼 실행된다.

그리하여 끌어올린다는 단어인 Hoist를 이용한 **Hoisting** 이라는 개념이 생겨났다.

<br>

- 예시를 통해 어떻게 일어나는지 살펴보자.

```js
console.log(name); // ReferenceError: name is not defined
```

- 위 예시처럼 `name`이란 변수를 선언하지도 않고 사용하면 당연히 "name 변수는 정의되지 않았다." 라고 ReferenceError를 낸다.

<br>

```js
console.log(name); // undefined
var name = "Harry Potter";
```

- 두번째 예시를 보면 뭔가 다르다. 자바스크립트는 위에서 아래로 코드를 해석한다고 했는데 그렇다면 위와 같은 ReferenceError가 나와야 하는 것 같은데 (name 변수 선언을 아직 안했으니) name 변수를 일단 사용하고 나중에 선언했는데 undefined 라는 값이 나왔다.

<br>

```js
var name;
console.log(name); // undefined
name = "Harry Potter";
```

- 사실 위의 예시처럼 두번째 예시가 바뀐 것이다. 마치 name 변수가 유효범위의 최상단에 선언이 된 것처럼 자바스크립트가 인식하는 것이다. 이것이 여기서 얘기하는 **호이스팅(Hoisting)** 이다.

<br>

```js
var name;
console.log(name); // undefined
name = "Harry Potter";
console.log(name); // Harry Potter
```

- name 변수를 선언하기 전에 사용하더라도 유효범위 내 그 어디서건 선언을 한다면 호이스팅이 일어나 사용할 수는 있다. 물론 값이 할당되지 않은 상태라면 undefined의 값을 가진다. 할당을 한 후 사용한다면 그 할당한 값이 사용된다.

<br>
<br>

> ### 자, 그럼 let, const를 사용하면 뭐가 다른가?

<br>

- 사실 자바스크립트의 **호이스팅(Hoisting)** 을 공부하면서 초반에 정말 많이 헷갈리는 부분이 아닐까 싶다.

  어디서는 "let, const은 **호이스팅(Hoisting)** 이 일어나지 않는다." 라고 말하고, 어디서는 "let, const도 **호이스팅(Hoisting)** 이 일어난다." 라고 설명하고 있기 때문이다.

  **호이스팅(Hoisting)** 에 대해 정확하게 이해한다면 위의 말이 의미하는 것을 이해할 수 있다.

  공부 초반 혼동되었던 이 차이점을 얘기하고자 한다.

<br>

- 자, 예시를 보자.

```js
console.log(name); // ReferenceError: Cannot access 'name' before initialization
let name = "Harry Potter";
```

- 예시를 보면 name 변수를 선언하지 않고 사용하니 ReferenceError가 나왔다. 그 이후 let으로 변수를 선언하더라도 초기값이 없는 것이다. 에러 메세지를 보니 "초기화하지 않은 name 변수는 참조할 수 없다" 고 얘기한다.

<br>

- 다시 맨 처음 예시를 보자.

```js
console.log(name); // ReferenceError: name is not defined
```

- 이 예시에서는 ReferenceError의 메세지가 "name 변수는 정의되지 않았다. " 였다. 위의 예시의 ReferenceError의 메세지는 "초기화하지 않은 name 변수는 참조할 수 없다" 이다.

 <br>

> > ### 변수는 선언, 초기화, 할당의 단계로 만들어진다.

  <br>

```js
var 키워드로 만들어진 변수는 유효범위의 최상단에서 (`호이스팅(Hoisting)`이 된 상태) 선언과 동시에 초기화가 이루어진다.

즉 var name 으로 변수를 선언하면 동시에 undefined 라는 초기값이 주어지면서 유효범위의 최상단에 `호이스팅(Hoisting)`이 된 상태로 선언 및 초기화가 된다.

반면에 let, const 키워드로 만들어진 변수는 변수 선언문을 만나기 전까지 초기화가 되지 않는다. 그래서 `호이스팅(Hoisting)` 이 안되는 것처럼 보인다.
그러나 `호이스팅(Hoisting)` 은 마찬가지로 일어난다. 비록 선언만 되는 것이다.
```

<br>

```js
// let, const도 최상단으로 호이스팅된다. 그러나 선언만 된다.
// 따라서 변수를 참조할 수 없다. (초기화가 되지 않아 초기값이 없다.)
console.log(name); // ReferenceError: Cannot access 'name' before initialization

let name; // 변수선언문을 만나면 초기화가 된다.
console.log(name); // undefined

name = "Harry Potter";
console.log(name); // Harry Potter
```

<br>

**호이스팅(Hoisting)** 은 자바스크립트의 한 특징이다. 코드를 실행하기 전에 코드를 미리 리딩하면서 실행 준비를 하는 과정 중 일어나는 현상이다.

var, let, const 의 변수 선언문을 자바스크립트 엔진이 먼저 리딩할 때 보게 되면 (실행전 선리딩) 그 정보를 기억하게 되는데 이때 모든 변수 선언은 **호이스팅(Hoisting)** 이 되어 유효범위 최상단에 끌어올려지는 상태가 된다.

즉, 모든 변수는 선언이 되었다면 최상단으로 **호이스팅(Hoisting)** 되는 것이다. 다만 차이는 초기화가 되었는지 아닌지의 차이이다.

var로 선언된 변수는 초기화도 같이 이루어진 상태로 **호이스팅(Hoisting)** 이 되는 것이고,
let, const로 선언된 변수는 변수의 선언만 **호이스팅(Hoisting)** 되어 자바스크립트 엔진이 코드를 실행하는 과정에서 실제 변수 선언문을 만나는 그 순간에 비로소 초기화가 이루어진다.

만약 변수 선언문이 let name = "Harry Potter" 와 같이 변수 할당도 같이 이루어진 코드라면 할당도 이때 같이 되는 것이다.

 <br>

```js
위에서 얘기한 "let, const은 호이스팅이 일어나지 않는다." 라고 설명하는 것은 자바스크립트의 EC를 이해하지 않고서는 선뜻 이해하기 힘든 부분이기도 하고 그냥 눈으로 보기엔 호이스팅이 실제로 이루어지는 것처럼 보이지 않기 때문에 그렇게 설명하는 것이 좀 더 편한 설명이긴 하나, 사실 명확하게 말한다면 "let, const도 호이스팅이 일어난다."는 것이 맞는 말이다.
```

  <br>

> ### 자, 그럼 함수에서는 어떨까?

<br>

#### **함수 선언식 VS 함수 표현식**

<br>

```js
function declaration() {
  // 함수 선언식
  console.log("I,m declaration function");
}
declaration(); // I,m declaration function

const expression = function () {
  // 함수 표현식 _ 함수 이름이 없어 `익명 함수 표현식` 이라고도 함.
  console.log("I,m expression function");
};
expression(); // I,m expression function
```

<br>

함수를 정의하는 방법은 크게 2가지 방식이 있다. (사실 3가지 방식이 있으나 나머지 1가지는 거의 사용되지 않는다.\_ 기명 함수 표현식)

위의 첫번째 예시에서 function 으로 시작하는 함수 정의가 **함수 선언식**의 방식이고, 두번째 예시처럼 변수에 함수를 할당하는 방식이 **함수 표현식**의 방식이다.

**함수 선언식**의 방식은 반드시 함수의 이름이 명명되야 하지만, **함수 표현식**은 함수의 이름을 딱히 지정할 필요가 없다. 함수를 할당한 변수가 그 함수의 이름이 된다.

두 방식의 큰 차이점은 바로 **호이스팅(Hoisting)** 의 여부이다.

<br>

1. 함수 선언식

```js
magic(); // Abracadabra!!!

function magic() {
  console.log(" Abracadabra!!!");
}
```

- 함수 선언식으로 정의한 함수 magic을 선언하기 전에 실행하였는데 실행이 이루어졌다. 위 코드는 아래과 같이 인식된다.

 <br>

```js
function magic() {
  console.log(" Abracadabra!!!");
}

magic(); // Abracadabra!!!
```

- 함수 선언식으로 정의한 함수는 함수 자체가 통째로 **호이스팅(Hoisting)** 된다.

 <br>

 <br>

2.  함수 표현식
    <br>

```js
magic(); // Uncaught TypeError: magic is not a function

const magic = function () {
  console.log(" Abracadabra!!!");
};
```

- 함수 표현식으로 정의한 함수 magic을 정의하기 전 실행하니 Error가 발생한다. magic은 함수가 아니라는 메세지가 나온다.

  함수 표현식으로 정의한 함수는 **호이스팅(Hoisting)** 이 이루어지지 않아 실행되지 않는다.

<br>

> ### **호이스팅(Hoisting)** 에서 중요한 것은 선언만 끌어올려진다는 점

<br>

변수에서는 변수의 선언부, 함수에서는 함수 선언식만이 자바스크립트의 특징으로 유효범위 최상단에 끌어올려진 것처럼 작동한다.

<br>
<br>

### **여기서 KEY POINT**

<br>

> ### **호이스팅(Hoisting)** 을 피하라!

<br>

자바스크립트의 특징인 **호이스팅(Hoisting)** 은 많은 오류를 발생시킬 여지가 많다. 함수 선언식으로 함수를 어느 곳에서든 선언만 하면 사용할 수 있지만 바로 그런 코드의 유연성이 오류를 발생시킬 수 있다.

<br>

```js
console.log(cal(10, 20)); // 200

function cal(a, b) {
  return a * b;
}

let multiply = cal(11, 22);
console.log(multiply); // 242
```

함수 선언식으로 정의된 함수 cal이 중간에 선언되었지만 두 개의 console.log는 잘 작동하는 것을 볼 수 있다.
**호이스팅(Hoisting)** 으로 인해 다음과 같이 자바스크립트 엔진은 인식하기 때문이다.

<br>

```js
function cal(a, b) {
  return a * b;
}

console.log(cal(10, 20)); // 200

let multiply = cal(11, 22);
console.log(multiply); // 242
```

그런데 이 코드를 다른 사람이 수정한다고 해보자. 자바스크립트는 위에서 아래로 작동하니 아래부분에 새로 작성하는 코드부터는 새로운 수식으로 계산하는 함수를 만들어 다른 값을 얻고자 한다.

<br>

```js
console.log(cal(10, 20));  // 예상 값 : 200

function cal(a, b) {  // 첫번째 함수 선언문
  return a * b;
}

let multiply = cal(11, 22);
console.log(multiply);  // 예상 값 : 242
.
.
.
.
.
.
.

function cal(a, b) {  // 두번째 함수 선언문 : 여기부터는 다른 값을 얻고 싶다!
  return a + b;
}

console.log(cal(20, 30)) // 예상 값 : 50
```

그런데 결과는 다르게 나타난다.

두번째 함수 역시 **호이스팅(Hoisting)** 이 일어나 두번째 선언한 함수가 첫번째 함수를 덮어쓴다.
결국 모든 것은 두번째 함수에 의해 결과값을 도출하게 되는 것이다.

 <br>

```js
function cal(a, b) {
  return a * b;
}

function cal(a, b) {
  return a + b;
}

console.log(cal(10, 20)); // 30

let multiply = cal(11, 22); // 33
console.log(multiply);

console.log(cal(20, 30)); // 50
```

원하는 결과를 얻고자 한다면 **호이스팅(Hoisting)**이 일어나지 않는 함수 표현식을 써야 한다.

<br>

```js
console.log(cal(10, 20)); // Uncaught TypeError: cal is not a function

var cal = function (a, b) {
  return a * b;
};

let multiply = cal(11, 22);
console.log(multiply);

var cal = function (a, b) {
  return a + b;
};

console.log(cal(20, 30));
```

- 앗! 함수 표현식은 일단 함수 선언전에 호출하면 에러가 발생한다. 위와 같이 말이다. - 바로 에러 디버깅!

<br>

```js
var cal = function(a, b) { // 첫번째 함수 표현식
    return a * b;
}

let multiply = cal(11, 22);  // 242
console.log(multiply);
.
.
.
.
.

var cal = function(a, b) {  // 두번째 함수 표현식
  return a + b;
}

console.log(cal(20, 30)) //  50
```

- 위과 같이 써야 같은 이름의 함수를 작성해도 다른 결과를 얻을 수 있다.

  그런데 굳이 왜 같은 이름의 함수를 사용하는가?

  물론 코드가 너무 길어져 같은 이름의 함수가 사용됨을 모르고 다시 사용하는 경우가 생길 수 있다.

  그러나 이건 코드의 가독성 및 유지보수 측면에서 비효율적이다.

  <br>

```js
let cal = function (a, b) {
  return a * b;
};

let multiply = cal(11, 22);
console.log(multiply);

let cal = function (a, b) {
  // Uncaught SyntaxError: Identifier 'cal' has already been declared
  return a + b;
};

console.log(cal(20, 30));
```

- 함수 표현식에서 let 혹은 const를 사용하자. 같은 이름이 있다고 바로 알려준다.

<br>

> ## 정리
>
> <br>

- ### 코드의 가독성과 유지보수를 위해 호이스팅이 일어나지 않도록 하자!
- ### let 혹은 const를 사용하자!

<br>

---

## 참고자료

- [[JavaScript] 호이스팅(Hoisting)이란](https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html)

- [let, const와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)

- [[Javascript] Hoisting(호이스팅)](https://medium.com/@_diana_lee/javascript-hoisting-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-2df9955db5c7)
