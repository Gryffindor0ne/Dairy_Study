# Part 5.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 05 Closure

<br>

## **Closure의 정의**

<br>

MDN에서 말하기를,

```
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
```

<br>

### **Closure** 는 **`그것의 주변 상태(the lexical environment)의 references 와 함께 번들로 묶인 함수의 조합`** 이라고 설명한다.

<br>

> 여기서 `the lexical environment`는 실행 컨텍스트에서의 **Outer(Reference to the outer environment)** 를 의미하고, 이 **Outer 에 의해 형성된 Scope의 참조와 같이 묶인 함수** 정도로 이해하면 되지 않을까 싶다.

<br>

그리고, MDN에는 이런 설명이 추가로 있다.

```
In other words, a closure gives you access to an outer function’s scope from an inner function.
```

### **다시 말해서, **Closure** 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.**

<br>

그리고, MDN에는 이런 추가 설명도 하나 더 있다.

```
 In JavaScript, closures are created every time a function is created, at function creation time.
```

### **자바스크립트에서는 함수가 생성될 때마다 **Closure**가 생성된다.**

<br>

**Closure** 가 어떤 상황에서 발생하는지 좀 더 알아보자.

---

<br>

### 예시를 통해 **Closure** 를 찾아보자.

<br>

> ### **For Example 1**

<br>

```jsx
const goodGuy = () => {
  const name = "Ryan";
  let times = 0;
  const callMeByName = () => {
    console.log(`${name} ${++times} called`); // Ryan 1 called
  };
  callMeByName();
};
goodGuy();
```

<br>

```
goodGuy 함수에서 name, times 변수를 선언하고, goodGuy 함수의 내부 함수인 callMeByName 함수에서는 선언된 변수가 없이 그냥 `console.log`를 실행한다.

callMeByName 함수의 `console.log`를 실행하려면 lexical environment에 변수 name, times가 있어야 하는데, 해당 환경에는 변수가 존재하지 않는다.

따라서, Outer에서 지정된 상위 환경, 즉 외부함수 goodGuy 함수의 lexical environment에서 해당 변수를 찾게 된다.

해당 변수이 확인되면 내부함수의 `console.log`는 상위 환경의 변수를 참조하여 실행하게 된다.

goodGuy 함수가 실행 종료되면,(함수 실행컨텍스트 종료) lexical environment의 변수들(name, times, callMeByName)에 대한 참조가 사라진다.

훗날 참조카운트가 없는 변수들은 가비지 컬렉터의 수집대상이 된다. [__DataType2의 내용 참고]
```

위의 예시는 외부함수의 내부함수에서 외부함수의 변수를 참조하는 예이다.

**Closure** 의 정의 중 **Closure 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.** 고 하였는데,

위의 예시는 **Closure**에 해당하는 상황이 아니다.

**Closure** 는 무엇이 다를까?

<br>

---

### 다른 예시를 살펴보자.

<br>

> ### **For Example 2**

<br>

```jsx
const goodGuy = () => {
  const name = "Ryan";
  let times = 0;
  const callMeByName = () => {
    return `${name} ${++times} called`;
  };
  return callMeByName();
};

const callMeByName2 = goodGuy();
console.log(callMeByName2); // Ryan 1 called
```

예시코드 1을 일부 수정하였다.

goodGuy 함수에서 내부 함수 callMeByName 함수의 실행값을 리턴하고 있다.

역시 내부함수는 외부함수의 변수를 참조하고 있지만, 여기도 역시 **Closure** 는 존재하지 않는다.

이 코드도 마찬가지로 goodGuy 함수가 실행 종료되면,(함수 실행컨텍스트 종료) lexical environment의 변수들(name, times, callMeByName)에 대한 참조가 사라진다.

<br>

---

### 이제 실제 **Closure** 예시를 살펴보자.

<br>

> ### **For Example 3**

<br>

```jsx
const goodGuy = () => {
  const name = "Ryan";
  let times = 0;
  const callMeByName = () => {
    return `${name} ${++times} called`;
  };
  return callMeByName;
};

const callMeByName2 = goodGuy();
console.log(callMeByName2()); // Ryan 1 called
console.log(callMeByName2()); // Ryan 2 called
console.log(callMeByName2()); // Ryan 3 called
```

위의 코드는 goodGuy 함수에서 callMeByName 함수 자체를 리턴하고 있다.

이에 따라 callMeByName2 변수에는 함수 자체가 할당되고, callMeByName2가 호출될 때마다 값이 변화하며 출력되는 것을 볼 수 있다.

<br>

> 그런데, callMeByName2 변수에 goodGuy 함수의 결과값이 담길 때, 이미 goodGuy 함수는 결과값을 변수에 할당함과 동시에 실행이 완료되었다.
>
> > 실행컨텍스트가 종료되었다는 것인데, 어떻게 계속 함수를 호출할 수 있는 것인가? (어떻게 실행 종료된 외부함수의 변수를 참조하는가?)

<br>

이는 **GC(garbage Collector)의 동작 방식** 때문이다.

GC는 어떤 값을 참조하는 변수가 있다면 그 값을 수집 대상으로 포함하지 않는다.

goodGuy 함수가 종료되면서 반환된 callMeByName 함수는 callMeByName2가 언제라도 호출되면 참조해야 하는 값이다.

그렇기 때문에 참조카운트가 존재하는 이상 GC의 대상이 되지 않는 callMeByName 함수는 지속적으로 사용 가능해진다.

<br>

바로 이 3번째 예시에서의 상황이 **Closure** 에 해당하는 상황이다.

<br>

### **Closure** 추가 예시를 살펴보자.

<br>

> ### **For Example 4**

<br>

```jsx
function celebrityName(firstName) {
  const nameIntro = "This celebrity is ";

  function lastName(theLastName) {
    return nameIntro + firstName + " " + theLastName;
  }
  return lastName;
}

const mjName = celebrityName("Michael");
mjName("Jackson"); // 'This celebrity is Michael Jackson'
```

외부 함수 celebrityName 의 리턴 값을 가진 mjName 변수는 호출되면 내부 함수 lastName을 실행시킨다. 이 경우 **Closure** 상황이 발생한다.

<br>

---

<br>

```jsx
Closures have access to the outer function’s variable even after the outer function returns
```

<br>

사실 **Closure**의 정의에서 다소 부족한 점을 추가로 설명하자면,

**Closure 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.** 의 부분에서 추가적으로 설명을 덧붙이자면,

 <br>

```jsx
클로저는 외부 함수가 반환된 후에도 외부 함수의 변수에 액세스할 수 있습니다.
```

 <br>

### **내부 함수에서 외부 함수의 Scope에 액서스하는 모든 상황이 아니라, `외부 함수가 반환된 후에도` 외부 함수의 변수에 액세스 할 수 있을 경우, 그 상황 혹은 현상을 Closure 라고 부른다.**

 <br>

## **NOTICE**

> 이 현상을 일으키는 주요 대상인 함수 자체를 통상적으로 `Closure` 라고 많이 얘기하지만, 개념적으로는 이런 현상 그 자체가 `Closure` 라고 보는 것이 맞다.

 <br>

---

 <br>

## **Closure의 방식**

<br>

```jsx
To use a closure, define a function inside another function and expose it. To expose a function, return it or pass it to another function.
```

<br>

### **Closure**를 사용하려면, 외부 함수 안에서 함수를 정의하고, 그 정의된 내부 함수를 외부로 전달한 후 사용한다.

<br>

```
여기서 내부 함수의 외부 전달이 꼭 함수 자체를 리턴하는 것만 해당하는 것은 아니다.

함수를 다른 함수에 전달하는 것도 하나의 방법이다.
```

<br>

### **함수 리턴의 예**

<br>

위의 예시를 다시 살펴보자.

```jsx
const goodGuy = () => {
  const name = "Ryan";
  let times = 0;
  const callMeByName = () => {
    return `${name} ${++times} called`;
  };
  return callMeByName;
};

const callMeByName2 = goodGuy();
console.log(callMeByName2()); // Ryan 1 called
```

내부 함수 callMeByName는 외부 함수 goodGuy의 리턴값으로 외부로 전달되었다.

callMeByName2가 외부에서 호출될 때마다 **Closure**가 발생한다.

<br>

### **함수 전달의 예**

<br>

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  let inner = () => {
    if (++a >= 5) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 500);
})();
```

<br>

```jsx
(function () {
  let count = 0;
  let button = document.createElement("button");
  button.innerText = "Click";

  let clickHandler = () => {
    console.log(++count, "Clicked");
  };
  button.addEventListener("click", clickHandler);
  document.body.appendChild(button);
})();
```

setInterval 함수에 인자로 내부 함수 inner를 전달하거나, addEventListener에 인자로 clickHandler 함수를 전달하는 방식 역시 **Closure** 를 발생시키는 방식이다.

<br>

---

<br>

## **Closure와 메모리**

<br>

앞서 **Closure** 현상이 일어나는 이유는 GC(garbage Collector)의 동작 방식이라고 얘기했었다.

**Closure**를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않기 때문에 과도한 메모리 소모가 일어날 수 있다. 사용하지 않는 **Closure**는 다음과 같은 방법으로 참조를 제거하는 것이 좋다.

<br>

### 메모리 관리의 예

<br>

> ### **For Example 1**

<br>

```jsx
let goodGuy = (() => {
  const name = "Ryan";
  let times = 0;
  const callMeByName = () => {
    return `${name} ${++times} called`;
  };
  return callMeByName;
})();

const callMeByName2 = goodGuy();
console.log(callMeByName2());
console.log(callMeByName2());
console.log(callMeByName2());
goodGuy = null; // goodGuy 함수의 callMeByName 함수 참조를 끊는다.
```

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  let inner = () => {
    if (++a >= 5) {
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 500); // inner 함수 참조를 끊는다.
})();
```

```jsx
(function () {
  let count = 0;
  let button = document.createElement("button");
  button.innerText = "Click";

  let clickHandler = () => {
    console.log(++count, "Clicked");
    if (count >= 5) {
      button.removeEventListener("click", clickHandler);
      clickHandler = null; // clickHandler 함수 참조 끊는다.
    }
  };
  button.addEventListener("click", clickHandler);
  document.body.appendChild(butto);
})();
```

---

## 참고자료

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

- [Closure](https://poiemaweb.com/js-closure)

- [Understanding JavaScript Closures With Ease](https://betterprogramming.pub/understand-javascript-closures-with-ease-aa1c808a929c)

- [Master the JavaScript Interview: What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36#.ecfskj935)
