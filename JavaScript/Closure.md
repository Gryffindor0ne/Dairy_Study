# Part 5.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 05 Closure

<br>

## **Closure의 정의**

<br>

MDN에서 말하기를,

```jsx
A closure is the combination of a function bundled together (enclosed) with references
to its surrounding state (the lexical environment).
```

<br>

### **Closure** 는 **`그것의 주변 상태(the lexical environment)의 references 와 함께 번들로 묶인 함수의 조합`** 이라고 설명한다.

<br>

> 여기서 `the lexical environment`는 실행 컨텍스트에서의 **Outer(Reference to the outer environment)** 를 의미하고, 이 **Outer 에 의해 형성된 Scope의 참조와 같이 묶인 함수** 정도로 이해하면 되지 않을까 싶다.

<br>

그리고, MDN에는 이런 설명이 추가로 있다.

```jsx
In other words, a closure gives you access to an outer function’s scope from an inner function.
```

### **다시 말해서, **Closure** 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.**

<br>

그리고, MDN에는 이런 추가 설명도 하나 더 있다.

```jsx
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
goodGuy 함수에서 name, times 변수를 선언하고, goodGuy 함수의 내부 함수인 callMeByName 는 내부에서 선언된 변수 없이 그냥 `console.log`를 실행한다.

callMeByName 함수의 `console.log`를 실행하려면 lexical environment에 변수 name, times가 있어야 하는데, 해당 환경에는 변수가 존재하지 않는다.

따라서, Outer에서 지정된 상위 환경, 즉 외부함수 goodGuy 함수의 lexical environment에서 해당 변수를 찾게 된다.

해당 변수이 확인되면 내부함수의 `console.log`는 상위 환경의 변수를 참조하여 실행하게 된다.

goodGuy 함수가 실행 종료되면,(함수 실행컨텍스트 종료) lexical environment의 변수들(name, times, callMeByName)에 대한 참조가 사라진다.

훗날 참조카운트가 없는 변수들은 가비지 컬렉터의 수집대상이 된다. [__DataType2의 내용 참고]
```

위의 예시는 외부함수의 내부함수에서 외부함수의 변수를 참조하는 예이다.

**Closure** 의 정의 중 **Closure 를 사용하면 내부 함수에서 외부 함수의 Scope에 액세스할 수 있다.** 고 하였는데,

위의 예시는 **Closure**에 해당하는 상황이 아니다.

<br>

### **Closure** 는 무엇이 다를까?

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

예시코드 1을 일부 수정하였다.

goodGuy 함수에서 내부 함수 callMeByName 함수의 실행값을 리턴하고 있다.

역시 내부함수는 외부함수의 변수를 참조하고 있지만, 여기도 역시 **Closure** 는 존재하지 않는다.

이 코드도 마찬가지로 goodGuy 함수가 실행 종료되면,(함수 실행컨텍스트 종료) lexical environment의 변수들(name, times, callMeByName)에 대한 참조가 사라진다.

<br>

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

goodGuy 함수를 보통 쉽게 **Closure**라고 부른다.

<br>

### **Closure** 추가 예시를 살펴보자.

<br>

> ### **For Example 4**

<br>

```jsx
function celebrityName(firstName) {
  const nameIntro = "This celebrity is";

  return function lastName(theLastName) {
    return `${nameIntro} ${firstName} ${theLastName}`;
  };
}

const mjName = celebrityName("Michael");
mjName("Jordan"); // 'This celebrity is Michael Jordan'
```

외부 함수 celebrityName 의 리턴 값을 가진 mjName 변수가 호출되면 내부 함수 lastName을 실행된다.

이 내부 함수 lastName는 celebrityName 함수의 매개변수 firstName를 포함하여 외부 함수의 변수 nameIntro를 참조할 수 있다.

이 celebrityName 함수는 **Closure** 가 된다.

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
To use a closure, define a function inside another function and expose it.

To expose a function, return it or pass it to another function.
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

### 💡 **NOTICE**

<br>

### **즉시 실행 함수 표현 (IIFE)**

**IIFE** 는 즉시 실행 함수 표현 (Immediately Invoked Function Expression)의 약자이다.
쉽게 말해 함수 선언과 동시에 즉시 실행되는 함수를 의미한다.

"이 안에 들어있는 코드를 바로 실행해라" 라는 뜻으로 이해하면 빠르다.

<br>

```jsx
(function () {
  // ...do something...
})();
```

<br>

전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지할 수 있을 뿐 아니라 IIFE 내부 안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법이다.

📍 **Closure**를 생성하는데 많이 사용된다.

<br>

---

<br>

## **Closure와 메모리**

<br>

앞서 **Closure** 현상이 일어나는 이유는 GC(garbage Collector)의 동작 방식이라고 얘기했었다.

**Closure**를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않기 때문에 과도한 메모리 소모가 일어날 수 있다.

사용하지 않는 **Closure**는 다음과 같은 방법으로 참조를 제거하는 것이 좋다.

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

<br>

> ### **For Example 2**

<br>

```jsx
(function () {
  let a = 0;
  let intervalId = null;
  let inner = () => {
    if (++a >= 5) {
      clearInterval(intervalId);
      inner = null; // inner 함수 참조를 끊는다.
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 500);
})();
```

<br>

> ### **For Example 3**

<br>

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

필요하지 않는 **Closure**의 참조 카운트를 0으로 만들어주면 된다.

방법은 식별자에 null 값을 할당하여 참조를 끊는다.

<br>

---

 <br>

## **Closure의 활용**

<br>

## **상태를 유지한다.**

<br>

### **Closure**의 핵심 포인트는 현재 상태를 기억하고 변경된 최신 상태를 유지하는데 유용하다는 점이다.

<br>

> ### **For Example 1**

<br>

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="toggle">toggle</button>
    <div
      class="box"
      style="width: 100px; height: 100px; background: blue;"
    ></div>

    <script>
      let box = document.querySelector(".box");
      let toggleBtn = document.querySelector(".toggle");

      let toggle = (function () {
        let isShow = false;

        return function () {
          box.style.display = isShow ? "block" : "none";
          isShow = !isShow; // 상위 스코프 변수 isShow 참조
        };
      })();
      toggleBtn.addEventListener("click", toggle);
    </script>
  </body>
</html>
```

<br>

위의 코드에서 보면 즉시실행함수를 통해 반환되는 `toggle`은 **Closure**를 생성한다.

이 **Closure** 내부에서 익명함수 리턴시 변수 isShow는 상위 스코프의 변수를 참조한다.

이벤트리스너의 콜백함수로 전달된 `toggle`은 버튼이 클릭되면 호출되는데, 이때 내부의 변수 isShow이 변경된다.

변경된 변수 isShow의 상태는 **Closure**에 의해 지속적으로 참조되기 때문에 현재 상태가 유지된다.

버튼이 클릭될 때마다 현재 상태를 유지한 변수는 변경된 후 최신 상태를 유지한다.

<br>

> 쉽게 말해서 isShow 변수는 클릭될 때마다 true, false 의 값으로 바뀌는데, 전 상태의 값을 유지하기 때문에 클릭될 때마다 켜졌다 꺼졌다 할 수 있는 것이다.

<br>

---

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
  return callMeByName;
};

const callMeByName2 = goodGuy();
console.log(callMeByName2()); // Ryan 1 called
console.log(callMeByName2()); // Ryan 2 called
console.log(callMeByName2()); // Ryan 3 called
```

위에서 본 예시코드이다.

최신 상태를 유지한다는 말은 callMeByName 함수가 참조하고 있는 변수인 times가 **Closure** 내부에서 지속적으로 참조되고 있기 때문에 현재 값이 계속 유지되는 것을 뜻한다. 그렇기에 callMeByName2가 호출될 때마다 times 변수의 값을 기억하고 있다가 숫자를 증가시키는 것이다. 이는 굳이 전역변수를 사용하지 않고, 최신 상태를 유지할 수 있다.

<br>

---

<br>

## **전역 변수의 Side Effect 위험 방지**

<br>

> 전역 변수 사용시 일어날 수 있는 Side Effect를 방지할 수 있다.

<br>

```
A side effect refers simply to the modification of some kind of state

- Changing the value of a variable;
```

<br>

### **For Example**

<br>

```jsx
const name = "Ryan";
let times = 0;

const goodGuy = () => {
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

위와 같이 name, times 변수를 전역변수로 설정해보자.

결과값은 마찬가지로 동일하다.

<br>

자, 여기서 한 번 변수의 값을 변경해보자.

```jsx
const name = "Ryan";
let times = 0;

const goodGuy = () => {
  const callMeByName = () => {
    return `${name} ${++times} called`;
  };
  return callMeByName;
};

const callMeByName2 = goodGuy();
console.log(callMeByName2()); // Ryan 1 called
console.log(callMeByName2()); // Ryan 2 called
console.log(callMeByName2()); // Ryan 3 called

times = 10;
console.log(callMeByName2()); // Ryan 11 called
```

전역 변수를 사용한 위의 코드에서 times 변수의 값을 10으로 재할당하였다.
callMeByName2를 호출해보니, 재할당된 값 10을 토대로 결과값이 변경됨을 볼 수 있다.

전역 변수를 사용하면 의도와 다르게 값이 변경될 위험의 소지가 있다.

<br>

### 자, 이번엔 **Closure** 에서 변경을 해보자.

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

times = 10;
console.log(callMeByName2()); // Ryan 4 called
```

goodGuy 함수 외부에서 times의 값을 10으로 할당해보았다.
그리고 callMeByName2 를 호출해보니, 영향을 받지 않는다.

**Closure**인 goodGuy 함수 내부의 변수인 times의 값은 변경되지 않는다.
함수 내부의 변수는 외부에서 접근이 불가한 변수이기 때문이다.

위에서 10을 할당한 times 변수는 선언은 되지 않았지만, 값이 할당된 goodGuy 함수 내부의 변수인 times와는 다른 변수이다.

**Closure** 내부의 변수의 값이 외부에서 변경되지 않는 특징 때문에 상태를 안전하게 계속 유지할 수 있다.

<br>

> ### **Closure를 사용하면 전역 변수를 사용하지 않고도 최신의 상태를 유지하면서, 값이 변경될 위험에서도 벗어날 수 있다.**

<br>

---

<br>

## **정보의 은닉**

<br>

### **For Example 1**

<br>

```jsx
function Counter() {
  let count = 0;

  this.increase = function () {
    return ++count;
  };

  this.decrease = function () {
    return --count;
  };
}

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0

console.log(count); // Uncaught ReferenceError: count is not defined
```

생성자 함수 Counter는 increase와 decrease, 2개의 메소드를 가지는 인스턴스를 생성하는 함수다.

이 2개의 메소드는 Counter의 스코프에 속한 변수 counter를 기억하는 **Closure**이다.

생성자 함수 Counter 내부에서 생성된 변수 count는 increase와 decrease가 실행되면, 두 메소드가 상위 스코프의 변수를 참조할 수 있는 **Closure**이기 때문에 접근이 가능하지만, 외부에서 직접 접근하려고 하면 접근이 불가능하다.

이처럼 **Closure**는 변수를 은닉화해서 접근 불가능하게 만드는 기능을 한다. 또는 **캡슐화**라고도 한다.

<br>

### **For Example 2**

<br>

```jsx
const createEmployee = () => {
  let employeeId = 0;
  return class {
    constructor(name, role) {
      this.name = name;
      this.role = role;
      this.id = ++employeeId;
    }
  };
};
const Employee = createEmployee();

const angelina = new Employee("Angelina", "HR");
const julia = new Employee("Julia", "Developer");

console.log(angelina); // {name: 'Angelina', role: 'HR', id: 1}

console.log(julia); // {name: 'Julia', role: 'Developer', id: 2}

console.log(employeeId); // Uncaught ReferenceError: employeeId is not defined
```

직원의 리스트를 만드는 클래스를 리턴하는 함수 createEmployee가 있다.

employeeId 변수는 외부에서는 직접 접근이 불가하지만, createEmployee 함수가 리턴하는 내부 함수에서는 참조가 가능하기에 새롭게 생성한 angelina, julia에는 id가 생성되는 것을 볼 수 있다.

<br>

```jsx
employeeId = "BlahBlah";

const ann = new Employee("Ann", "Sales");

console.log(ann); // {name: 'Ann', role: 'Sales', id: 3}
```

employeeId 변수에 아무거나 할당해보고, 다시 새로운 인스턴스를 생성하면

변수에는 영향이 없기 때문에 현재 상태에서 1이 추가된 id값 3의 ann 인스턴스가 생성된다.

<br>

---

## **혼동하기 쉬운 Closure**

<br>

### **For Example**

<br>

```jsx
function celebrityIDCreator(theCelebrities) {
  var uniqueID = 1;
  for (var i = 0; i < theCelebrities.length; i++) {
    theCelebrities[i]["id"] = function () {
      return uniqueID + i;
    };
  }
  return theCelebrities;
}
let celebs = [
  { name: "George", id: 0 },
  { name: "Brad", id: 0 },
  { name: "Will", id: 0 },
];
let createIdForCelebs = celebrityIDCreator(celebs);
let georgeID = createIdForCelebs[0];
console.log(georgeID.id()); // 4
```

georgeID.id()이 실행될 때 i의 값이 무엇인가가 중요한 점이다. 여기서 i는 전역변수이기 떄문에 값에 영향을 미친다.

<br>

이런 실수를 고치는 방법은 2가지가 있다.

<br>

### 첫번째 방법은 IIFE를 사용하는 방법이다.

```jsx
function celebrityIDCreator(theCelebrities) {
  let uniqueID = 1;
  for (var i = 0; i < theCelebrities.length; i++) {
    theCelebrities[i]["id"] = (function (j) {
      return (function () {
        // IIFE를 사용
        return uniqueID + j;
      })();
    })(i);
  }

  return theCelebrities;
}

let celebs = [
  { name: "George", id: 0 },
  { name: "Brad", id: 0 },
  { name: "Will", id: 0 },
];

let createIdForCelebs = celebrityIDCreator(celebs);

let georgeID = createIdForCelebs[0];
console.log(georgeID.id); // 1

let bradID = createIdForCelebs[1];
console.log(bradID.id); // 2
```

<br>

### 두번째 방법은 let을 사용하는 방법이다.

```jsx
function celebrityIDCreator(theCelebrities) {
  let uniqueID = 1;
  for (let i = 0; i < theCelebrities.length; i++) {
    // let을 사용
    theCelebrities[i]["id"] = (function (j) {
      return function () {
        return uniqueID + j;
      };
    })(i);
  }

  return theCelebrities;
}

let celebs = [
  { name: "George", id: 0 },
  { name: "Brad", id: 0 },
  { name: "Will", id: 0 },
];

let createIdForCelebs = celebrityIDCreator(celebs);

let georgeID = createIdForCelebs[0];
console.log(georgeID.id()); // 1

let bradID = createIdForCelebs[1];
console.log(bradID.id()); // 2
```

var 키워드가 i를 전역 변수로 만드는 것을 막기 위해 let 키워드를 사용하면 된다.

<br>

---

## 참고자료

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

- [Closure](https://poiemaweb.com/js-closure)

- [Understanding JavaScript Closures With Ease](https://betterprogramming.pub/understand-javascript-closures-with-ease-aa1c808a929c)

- [Master the JavaScript Interview: What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36#.ecfskj935)

- [JavaScript Is Sexy](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
