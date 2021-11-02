# Part 5.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 05 Closure

<br>

## **Closure**

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

그리고, MDN에는 이런 추가 설명이 있다.

```
In other words, a closure gives you access to an outer function’s scope from an inner function.
```

### **다시 말해서, **Closure** 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.**

<br>

---

<br>

### 예시를 통해 알아보자.

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

**Closure** 의 정의 중 **Closure 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.** 고 하였는데 위의 예시는 클로저의 조건에 맞는 상황이긴 하지만 **Closure**가 있다고 볼 수 없다.

<br>

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

예시코드 1의 코드를 일부 수정하였다.

goodGuy 함수에서 내부 함수 callMeByName 함수의 실행값을 리턴하고 있다.

역시 내부함수는 외부함수의 변수를 참조하고 있지만, 여기도 역시 **Closure** 는 존재하지 않는다.

이 코드도 마찬가지로 goodGuy 함수가 실행 종료되면,(함수 실행컨텍스트 종료) lexical environment의 변수들(name, times, callMeByName)에 대한 참조가 사라진다.

<br>

### 또 다른 예시를 살펴보자.

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

> 그런데, callMeByName2 변수에 goodGuy 함수의 결과값이 담길 때, 이미 goodGuy 함수는 결과값을 변수에 할당함과 동시에 실행이 완료되었다. 실행컨텍스트가 종료되었다는 것인데, 어떻게 계속 함수를 호출할 수 있는 것인가? (어떻게 실행 종료된 외부함수의 변수를 참조하는가?)

<br>

이는 가비지 컬렉터의 동작 방식 때문이다.
가비지 컬렉터는 어떤 값을 참조하는 변수가 있다면 그 값을 수집 대상으로 포함하지 않는다.
goodGuy 함수가 종료되면서 반환된 callMeByName 함수는 callMeByName2가 언제라도 호출되면 참조해야 하는 값이다.
그렇기 때문에 참조카운트가 존재하는 이상 가비지 컬렉터의 대상이 되지 않는 callMeByName 함수는 지속적으로 사용 가능해진다.

<br>

---

## 참고자료
