# Part 2.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 02 실행 컨텍스트 (Execution Context)

<br>

## 📚 실행 컨텍스트 📚

### 실행할 코드에 제공할 환경 정보들을 모아놓은 객체 or 실행 가능한 코드가 실행되기 위해 필요한 환경

### 📍 실행 가능한 코드

- 전역 코드 : 전역 공간에 존재하는 코드
- eval 코드 : eval 함수에 존재하는 코드
- 함수 코드 : 함수 내 존재하는 코드

> 우리가 흔히 실행 컨텍스트를 구성하는 방법은 **_함수 코드_**

### 📍 실행에 필요한 정보

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

> 자바스크립트 엔진은 실행에 필요한 정보를 형상화하고 구분하기 위해 **_실행 컨텍스트_** 를 물리적 객체 형태로 관리한다.

### 👉🏼 **For Example**

```js
var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined
    var a = 3;
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

![실행컨텍스트](https://user-images.githubusercontent.com/79234473/136782395-0b846c29-dfdb-46c5-b2b4-0737c7362175.png)

<br>

1. 자바스크립트가 실행되면 코드가 실행되는 순간 **전역 컨텍스트** 가 콜 스택에 담긴다. (자동적으로 생성)

2. 코드를 순차적으로 읽다가 outer()를 만나 outer 함수가 실행되면 자바스크립트 엔진은 outer 함수 실행에 필요한 환경 정보를 모아 **_outer 실행 컨텍스트_** 를 생성하고 콜 스택에 담는다.

3. 늦게 들어온 것 먼저 실행하는 스택의 구조상 실행중이던 **_전역 컨텍스트_** 중단되고 **_outer 실행 컨텍스트_** 가 실행된다. outer 함수 실행 중 내부의 inner()를 만나 inner 함수가 실행되게 되면 outer 함수 실행때와 마찬가지로 inner 함수 실행에 필요한 환경 정보를 모아 **_inner 실행 컨텍스트_** 가 생성되고 콜 스택에 담긴다.

4. **_inner 실행 컨텍스트_** 가 실행되면 기존 실행중이던 **_outer 실행 컨텍스트_** 는 중단되고 inner 함수가 순차적으로 실행된다.

5. inner 함수의 **var a=3** 까지 실행되면 inner 함수는 실행이 완료되고 **_inner 실행 컨텍스트_** 는 콜 스택에서 사라진다. (임무 완수했으니까)

6. **_inner 실행 컨텍스트_** 가 사라진 후 이제 **_outer 실행 컨텍스트_** 가 최상단에 위치하니 중단된 시점의 부분부터 다시 실행된다.

7. outer 함수 내부의 **console.log(a)** 실행 후 outer 함수 실행 완료되고 **_outer 실행 컨텍스트_** 도 콜 스택에서 제거된다.

8. 마지막 줄의 **console.log(a)** 가 완료되면 전역 공간에 모든 코드가 완료되고 **_전역 컨텍스트_** 도 콜 스택에서 제거되면서 모든 실행이 완료된다.

<br>

---

## 🔖 <span style="color:#b0bec5"> Additional </span>

### **스택 (stack)**

LIFO(Last In First Out) 원칙을 따르는 선형 데이터 구조. 늦게 들어간 것이 제일 먼저 나온다.

![1212](https://user-images.githubusercontent.com/79234473/137492809-6badd51a-81a0-430d-aa7e-aae94d615255.png)

<br>

---

### 👉🏼 **For Example 2**

```js
let a = "Hello World!";

function first() {
  console.log("Inside first function");
  second();
  console.log("Again inside first function");
}

function second() {
  console.log("Inside second function");
}

first();

console.log("Inside Global Execution Context");

/*

-- 실행 결과 --

Inside first function
Inside second function
Again inside first function
Inside Global Execution Context

*/
```

![실행컨텍스트2](https://user-images.githubusercontent.com/79234473/136782449-9ee21758-b40f-4805-b7fc-a65549b50d65.png)

---

### 그럼, 실행 컨텍스트에는 어떤 정보가 담기는 걸까?

해당 내용은 책에서 설명한 ES5 기준으로 일단 설명.

```js
ExecutionContext = {
  LexicalEnvironment: [Lexical Environment],
  VariableEnvironment: [Lexical Environment],
  ThisBinding: [object]
}   // [] 안의 내용은 type을 뜻한다.
```

```
VariableEnvironment : 현재 실행 환경에 대한 변수나 참조에 대한 정보. 변경 사항 반영되지 않음.

LexicalEnvironment : 처음은 VariableEnvironment와 동일, 실시간 변경 사항 반영.

ThisBinding : 현재 Context에서의 This 대상 객체
```

### **Lexical Environment 타입의 구성**

```js
Lexical Environment = {
  environmentRecord: {},
  outerEnvironmentReference: {}
}
```

```
environmentRecord : 현재 Context에서 선언된 함수 혹은 변수들이 저장되는 공간.

outerEnvironmentReference : 현재 Context를 기준으로 외부 Context를 참조하는 공간
```

---

### `코어 자바스크립트` 책에서는 실행 컨텍스트의 개념을 ES5 기준으로 설명하였는데, 여기서부터는 내가 추가로 공부한 ES6 기준으로 좀 더 상세하게 설명하고자 한다.

<br>

## 📚 실행 컨텍스트의 구조

![EC2](https://user-images.githubusercontent.com/79234473/137242638-c42373f2-64ec-4475-bccc-819ff5da1896.png)

---

## 📚 실행 컨텍스트는 어떻게 만들어지는가?

### **실행 컨텍스트는 2개의 단계를 거쳐 생성된다.**

1. 생성단계 (Creation Phase)
2. 실행단계 (Execution Phase)

<br>

---

## 🤵🏽‍♂️ **생성단계 (Creation Phase)**

실행 컨텍스트(Execution Context, 줄여서 EC)는 생성단계에서 다음 2개의 컴포넌트를 생성한다.

1. **LexicalEnvironment**
2. **VariableEnvironment**

<br>

코드로 보면,

```js
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```

> 어라, 어디서 본 듯한 코드인데...

### 그렇다. 위에서 나왔다. EC에 어떤 정보가 들어가는지 얘기하다가...

🪶 ES6에서는 `ThisBinding` 이 EC에 포함되지 않고 이후 나오는 Lexical Environment 부분에 포함되었다.

<br>

## 자 그럼 먼저, EC 의 Lexical Environment에 대해 알아보자.

## 🪃 Lexical Environment

```
Lexical Environment는 자바스크립트 코드에서 변수나 함수 등의 식별자를 정의하는데 사용하는 객체로 생각하면 쉽다.
(또는, 식별자들에 대한 정보를 매핑한 모음)

Lexical Environment는 식별자-변수 매핑을 보유하는 구조이다.
(여기서 식별자는 변수의 이름을 나타낸다.)
```

> 간단한 예시를 보자.

```js
let name = "Harry";
let job = "Magician";

function magic() {
  console.log(`${name} is ${job}!!!`);
}
```

> 위의 예시코드를 Lexical Environment로 표현한다면,

```js
LexicalEnvironment = {
  name : "Harry",
  job: "Magician",
  magic: <ref. to magic function>
}
```

Lexical Environment은 위와 같이 식별자들에 대한 정보를 매핑한다.

---

### 그럼, Lexical Environment에는 어떤 것이 있을까?

### 🪄 Lexical Environment의 종류

Lexical Environment는 다음의 3가지 컴포넌트를 가진다.

1. **Environment Record**
2. **Reference to the outer environment**
3. **ThisBinding**

## 🪡 Environment Record

```
Environment Record는 식별자들의 바인딩을 기록하는 객체를 말한다.
간단히 말해 변수, 함수 등이 기록되는 곳이다.

실질적으로 Declarative Environment Record와 Object Environment Record 2가지 종류를 일켣는다.

자세히는 Global Environment Record, Function Environment Record, Module Environment Record도 있다.

이들은 다음과 같은 상속 관계를 갖는다.
```

<br>

![ER](https://user-images.githubusercontent.com/79234473/137255483-6143822b-94b0-4cb1-b25b-f37e6de3bb58.png)

<br>

**Declarative Environment Record**

> 변수 및 함수 선언을 저장.

<br>

**Object Environment Record**

> 변수 및 함수 선언 외에 전역 바인딩 개체(window object in browsers)도 저장.

```
 `The lexical environment for global code contains a objective environment record`
```

<br>

---

## 🔖 <span style="color:#b0bec5"> Additional </span>

함수 코드가 실행되면 Environment Record에 **arguments** object가 포함된다.

이 객체에는 함수에 전달된 인덱스와 인수, 그리고 인수의 길이를 포함된다.

<br>

> 예시를 보면,

```js
let name = 'Harry';
let spell = 'Aquamenti';

function magic(name, spell) {
  console.log(`${name} called : ${spell}!!!`);
}

magic(name, spell)

// arguments object
arguments : {0: 'Harry', 1: 'Aquamenti', length: 2}  // 함수 EC가 실행되면 생성된다.
```

---

## 🪡 Reference to the Outer Environment

<br>

```
Reference to the Outer Environment(줄여서 Outer)는 외부의 lexical environment에 액세스할 수 있음을 의미한다.

다시 말해, 변수를 탐색하는 과정에서 현재 실행 컨텍스트 내의 참조할 변수가 없다면

상위 lexical environment에 접근하여 변수를 찾는 매커니즘이다.


ES3에서 말하던 Scope Chain과 동일한 개념으로 ES5부터는 `Lexical nesting structure`로 불린다.
```

<br>

### 👉🏼 **For Example**

```js
const global = "I'm global";
function first() {
  const firstConst = "I'm firstConst";
  function second() {
    const secondConst = "I'm secondConst";
    function third() {
      console.log(secondConst);
      console.log(firstConst);
      console.log(global);
      console.log(thirdConst);
    }
    third();
  }
  second();
}
first();

/*

-- 실행 결과 --

"I'm secondConst"
"I'm firstConst"
"I'm global"
Reference Error : thirdConst is not defined

*/
```

<br>

위 코드를 단순하게 표현하자면 아래와 같다. (일부 상세한 코드는 생략)

```js
GlobalEnvironment = {
  environmentRecord: {
    global: "I'm global",
  },
  outer: null,
};

firstEnvironment = {
  environmentRecord: {
    firstConst: "I'm firstConst",
  },
  outer: globalEnvironment, // first는 Global에서 생성됐다.
};

secondEnvironment = {
  environmentRecord: {
    secondConst: "I'm secondConst",
  },
  outer: firstConstEnvironment, // second는 first 안에서 생성됐다.
};
```

<br>

![LE](https://user-images.githubusercontent.com/79234473/137315961-9c4a4b95-909e-4c7b-a4c6-af3d3ca9aa4f.png)

🖍 위 그림에서처럼 각 lexical environment에서 `Outer`는 부모의 lexical environment를 가리킨다.

<br>

![LE2](https://user-images.githubusercontent.com/79234473/137315966-a4a48a5c-45f0-4ff4-8f49-0e11395386dc.png)

🖌 예시 코드에서 third 함수가 실행되었을 때
secondConst, firstConst, global, thirdConst 변수를 찾게 될 것이다.

위의 그림에서는 secondConst, thirdConst를 예로 들었는데 보다시피 현재 LexicalEnvironment에 값이 있는지 확인하고 변수가 없으면 부모의 값으로 이동한다.

secondConst의 경우 second LexicalEnvironment에 값이 존재하므로 그 값을 참조할 것이다.

그러나 thirdConst는 그 값을 발견할 때까지 상위 LexicalEnvironment에 접근하다가 결국 존재하지 않는 값이므로 null을 만나 `Reference Error`가 난다.

<br>

### 🪢 POINT 🪢

이것이 일반적으로 듣던 스코프 체인이다.

그러나 중요한 점은 부모의 환경에 연결되는 Outer(외부 환경)는 함수가 호출될 때가 아니라 **`선언될 때 결정`** 된다.

### 🪄 다음 코드를 보자.

```js
let i = 1;

function foo() {
  let i = 2;
  bar();
}

function bar() {
  console.log(i);
}

foo(); // 1
```

```
위의 결과값이 2가 아닌 `1`이 나오는 이유는?

bar 함수의 `Outer`는 둘러싼 함수(foo 함수)가 아니라 부모의 LexicalEnvironment(global)이기 때문이다.
```

---

## 🪡 ThisBinding

<br>

```
Global execution context에서 this는 global obejct를 나타낸다.
(예를 들어 브라우저라면 Window Object)

Function execution context에서 this 값은 함수가 호출되는 방식에 따라 다르다.

객체 참조에 의해 호출되면 this 값이 해당 객체로 설정되고,
그렇지 않으면 this 값이 전역 객체로 설정되거나 정의되지 않는다. _ undefined
```

### 👉🏼 **For Example**

```js
const magician = {
  name: "Harry",
  birthYear: 1980,
  calAge: function () {
    console.log(2021 - this.birthYear);
  },
};
magician.calAge(); // 41

const calculateAge = magician.calAge;
calculateAge(); // NaN
```

<br>

`magician.calAge()`을 실행하였을 때 **this**는 magician 객체가 된다. 객체를 참조하면서 호출되었기 때문이다.

```js
this = object

{
  name: "Harry",
  birthYear: 1980,
  calAge: function () {
    console.log(2021 - this.birthYear);
  },
}
```

<br>

`calculateAge()`이 실행되면 **this**는 객체 참조가 없기 때문에 전역 객체를 참조한다. 그리하여 결과적으로 값이 NaN이 된다.

```js
this = window;

{...}
```

<br>

[**This** 에 관한 내용은 뒤에서 따로 다룰 예정]

<br>

---

<br>

## **EC - Variable Environment**

<br>

## 🪃 Variable Environment

<br>

**Variable Environment**는 EC 내에서 VariableStatements에 의해 생성된 바인딩을 EnvironmentRecord에 보관하는 Lexical Environment로서, 기본적으로 Lexical Environment가 가지는 모든 속성과 구성 요소를 동일하게 가지고 있다.

<br>

## ☝🏼 Difference ☝🏼

🪄 ES6에서는 **LexicalEnvironment**와 **VariableEnvironment** 차이점으로 다음 1가지 포인트를 얘기한다.

LexicalEnvironment는 함수 선언과 변수(**let 및 const**) 바인딩을 저장하는 데 사용되는 반면,

VariableEnvironment는 변수(**var**) 바인딩만 저장하는 데 사용된다.

> 다시 말해, LexicalEnvironment은 함수와 **let, const** 키워드로 선언한 변수에 사용되고, VariableEnvironment는 **var** 키워드로 선언한 변수에 사용된다고 볼 수 있다.

<br>

---

## 🤵🏽‍♂️ **실행단계 (Execution Phase)**

<br>

앞서 생성단계에서 코드 실행을 위한 환경 정보 값이 결정되고 나면, 실행단계에서 모든 변수에 대한 할당이 완료되고 코드가 최종적으로 실행된다.

<br>

### 👉🏼 **For Example**

```js
let name = "Harry";
const spell = "Aquamenti";
var say;

function times(count) {
  var add = 10;
  return `${name} called : ${spell}!!! - ${count + add} times`;
}

say = times(10);
```

위의 코드가 실행되면 자바스크립트 엔진은 전역코드를 실행하기 위해 전역 컨텍스트를 생성한다.

<br>

### 🪅 그림을 보면서 이해해보자!

<br>

```
EC 생성단계에서는 코드 실행에 필요한 LexicalEnvironment와 VariableEnvironment를 정의한다.

이 과정에서 outer와 thisBinding이 결정되고 EnvironmentRecord에 식별자를 바인딩한다.
```

---

<br>

![EC_1](https://user-images.githubusercontent.com/79234473/137443229-364c2313-b39b-472e-9a67-3344edbd0c4e.png)

<br>

1.전역 EC 생성단계

```
전역 EC 생성단계에서는 다음과 같은 것들이 일어난다.

times 함수와 let으로 선언된 name 변수, const로 선언된 spell 변수가 LexicalEnvironment의 EnvironmentRecord로 생성된다.
(값은 할당되지 않는다.)

VariableEnvironment의 EnvironmentRecord엔 var로 선언된 say 변수가 선언됨과 동시에 undefined의 값이 할당된다.

또한 outer와 thisBinding도 이 과정에서 생성되는데 outer는 null, this는 전역이기에 global 객체로 생성된다.
```

---

<br>

![EC_fix_img1](https://user-images.githubusercontent.com/79234473/140608031-e6a16ca4-b3da-4b58-a51b-0b253c057472.png)

<br>

2.전역 EC 실행단계

```
전역 EC가 실행되면

let, const로 선언된 변수들의 값이 할당된다.

 :: 콜스택에 전역 EC가 전달된다.
```

<br>

---

<br>

![EC_3](https://user-images.githubusercontent.com/79234473/137443312-50b32755-df04-4c58-9bb8-e59214dae81b.png)

<br>

3.함수 EC 생성단계

```
times 함수가 실행되면 함수 EC가 생성된다.
arguments 객체와 var로 선언된 add 변수가 각각 LexicalEnvironment, VariableEnvironment에 생성된다.

함수 EC 역시 생성시 outer와 thisBinding이 생성되는데 outer는 GlobalLexicalEnvironment, this는 역시 global 객체이다.
```

<br>

---

<br>

![EC_4](https://user-images.githubusercontent.com/79234473/137443355-59706772-060d-4234-9b00-44f1d27db83c.png)

<br>

4.함수 EC 실행단계 1-1.

```
var로 선언된 변수 add의 값이 할당된다.

 :: 콜스택에 함수 EC가 전달된다.
```

<br>

---

<br>

![EC_5](https://user-images.githubusercontent.com/79234473/137443346-bd08919d-34e0-4fc3-a4a3-cf4c0e9d2449.png)

<br>

5.함수 EC 실행단계 1-2.

```
함수가 실행되어 값을 리턴하고 함수가 종료된다.

 :: 함수 EC가 종료됨과 동시에 콜스택에서 제거된다.
```

<br>

---

<br>

![EC_fix_img2](https://user-images.githubusercontent.com/79234473/140608032-f06f3fbb-a8de-4904-81ae-89995351ccfb.png)

<br>

6.전역 EC 실행 종료

```
함수의 리턴값이 전달되어 say 변수에 값이 할당되고 모든 과정이 종료되어 전역 EC도 종료된다.

:: 콜스택에서 전역 EC도 제거된다.

모든 프로그램이 종료된다.
```

<br>

---

### 💡 **NOTICE**

### **호이스팅(Hoisting)**

> 자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.

### var 선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성을 말한다.

<br>

```
위의 예시에서 보면,

EC의 생성 단계에서 var로 선언한 변수는 `undefined` 라는 값을 가지고,
let, const로 선언된 변수는 값을 가지지 않는다. (uninitialized)

이것은 EC의 생성 단계에서 코드에서 변수 및 함수 선언을 검색하고, 함수 선언이 환경에 완전히 저장되는 동안
변수는 초기에 정의되지 않은 상태(undefined)(var의 경우)로 설정되거나
초기화되지 않은 상태(uninitialized)(let과 const의 경우)로 설정되는데,

var로 선언된 변수는 `undefined` 라는 값이 존재함으로 참조가 가능하지만,
let, const로 선언된 변수는 비어 있는 상태이기 때문에 참조가 불가하여 Reference Error 가 난다.

var로 선언된 변수는 실제 값이 할당되기 전, 변수가 선언되는 것과 동시에 초기화가 이루어진다.
초기값으로 `undefined`를 가지는 것도 이 때문이다. (메모리 공간이 확보된다.)_(`변수 호이스팅`)

let, const로 선언된 변수는 자바스크립트 엔진이 실행시 변수 선언문을 만나기 전까지 초기화되지 않기 때문에
`일시적 사각지대(TDZ)` 라는 곳에 빠진다.
즉, 변수가 초기화되지 않았다는 것은 메모리 공간이 확보되지 않았다는 뜻으로, 이로 인해 변수를 참조할 수 없다.
```

<br>

```
해당 스코프의 시작부터 초기화 단계까지의 구간을 `TDZ(Temporal Dead Zone)`라고 한다.
```

<br>

---

## 참고자료

- [sec-lexical-environments](https://262.ecma-international.org/6.0/#sec-lexical-environments)

- [자바스크립트 함수 - Lexical Environment](https://meetup.toast.com/posts/129)

- [Lexical Environment](https://medium.com/@kkak10/lexical-environment-4e0cffcad98d)

- [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

- [let, const와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)
