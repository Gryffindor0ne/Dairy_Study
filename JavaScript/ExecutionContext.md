# Part 2.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 02 실행 컨텍스트 (Execution Context)

<br>

> 실행 컨텍스트 : **실행할 코드에 제공할 환경 정보들을 모아놓은 객체** 또는 **실행 가능한 코드가 실행되기 위해 필요한 환경**

<br>

1. 실행 가능한 코드

- 전역 코드 : 전역 공간에 존재하는 코드
- eval 코드 : eval 함수에 존재하는 코드
- 함수 코드 : 함수 내 존재하는 코드

> 우리가 흔히 실행 컨텍스트를 구성하는 방법은 _함수 코드_

<br>

2. 실행에 필요한 정보

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

<br>

> 자바스크립트 엔진는 실행에 필요한 정보를 형상화하고 구분하기 위해 _실행 컨텍스트_ 를 물리적 객체 형태로 관리한다.

<br>

<br>

- 예시

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

- 스택 (stack)

  LIFO(Last In First Out) 원칙을 따르는 선형 데이터 구조. 늦게 들어간 것이 제일 먼저 나온다.

![stack (1)](https://user-images.githubusercontent.com/79234473/136873371-0d909cac-d248-4927-963d-bf4243283689.png)

2. 코드를 순차적으로 읽다가 outer()를 만나 outer 함수가 실행되면 자바스크립트 엔진은 outer 함수 실행에 필요한 환경 정보를 모아 **_outer 실행 컨텍스트_** 를 생성하고 콜 스택에 담는다.

3. 늦게 들어온 것 먼저 실행하는 스택의 구조상 실행중이던 **_전역 컨텍스트_** 중단되고 **_outer 실행 컨텍스트_** 가 실행된다. outer 함수 실행 중 내부의 inner()를 만나 inner 함수가 실행되게 되면 outer 함수 실행때와 마찬가지로 inner 함수 실행에 필요한 환경 정보를 모아 **_inner 실행 컨텍스트_** 가 생성되고 콜 스택에 담긴다.

4. **_inner 실행 컨텍스트_** 가 실행되면 기존 실행중이던 **_outer 실행 컨텍스트_** 는 중단되고 inner 함수가 순차적으로 실행된다.

5. inner 함수의 **var a=3** 까지 실행되면 inner 함수는 실행이 완료되고 **_inner 실행 컨텍스트_** 는 콜 스택에서 사라진다. (임무 완수했으니까)

6. **_inner 실행 컨텍스트_** 가 사라진 후 이제 **_outer 실행 컨텍스트_** 가 최상단에 위치하니 중단된 시점의 부분부터 다시 실행된다.

7. outer 함수 내부의 **console.log(a)** 실행 후 outer 함수 실행 완료되고 **_outer 실행 컨텍스트_** 도 콜 스택에서 제거된다.

8. 마지막 줄의 **console.log(a)** 가 완료되면 전역 공간에 모든 코드가 완료되고 **_전역 컨텍스트_** 도 콜 스택에서 제거되면서 모든 실행이 완료된다.

<br>

- 추가 예시

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
```

```js
Inside first function
Inside second function
Again inside first function
Inside Global Execution Context
```

![실행컨텍스트2](https://user-images.githubusercontent.com/79234473/136782449-9ee21758-b40f-4805-b7fc-a65549b50d65.png)

<br>

> 그럼, 실행 컨텍스트에는 어떤 정보가 담기는 걸까?

- 해당 내용은 책에서 설명한 부분으로 ES5 기준

<br>

```js
ExecutionContext = {
    LexicalEnvironment: [Lexical Environment],
  VariableEnvironment: [Lexical Environment],
  ThisBinding: [object]
}  // [] 안의 내용은 type을 뜻한다.
```

<br>

- VariableEnvironment : 현재 실행 환경에 대한 변수나 참조에 대한 정보. 변경 사항 반영되지 않음.

- LexicalEnvironment : 처음은 VariableEnvironment와 동일, 실시간 변경 사항 반영.

- ThisBinding : 현재 Context에서의 This 대상 객체

<br>

> Lexical Environment 타입의 구성

```js
Lexical Environment = {
    environmentRecord: {},
  outerEnvironmentReference: {}
}
```

<br>

- environmentRecord : 현재 Context에서 선언된 함수 혹은 변수들이 저장되는 공간.

- outerEnvironmentReference : 현재 Context를 기준으로 외부 Context를 참조하는 공간

<br>

---

<br>

> 여기서 부터는 **코어 자바스크립트**에서 설명한 실행 컨텍스트의 개념을 좀 더 공부하다가 ES6 기준은 조금 다른 부분이 있어서 그 기준으로 좀 더 깊게 설명하고자 함.

<br>

## 실행 컨텍스트는 어떻게 만들어지는가?

<br>

실행 컨텍스트는 2개의 단계를 거쳐 생성된다.

1. 생성단계 (Creation Phase)
2. 실행단계 (Execution Phase)

<br>

### **생성단계 (Creation Phase)**

<br>

실행 컨텍스트(Execution Context, 줄여서 EC)는 생성단계에서 다음 2개의 컴포넌트를 생성한다.

1. LexicalEnvironment
2. VariableEnvironment

<br>

- 코드로 보자면,

```js
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```

> 어라, 어디서 본 듯한 코드인데...

<br>

### 그렇다. 위에서 나왔다. EC에 어떤 정보가 들어가는지 얘기하다가...

<br>

```js
ES6에서는 `ThisBinding` 이 EC에 포함되지 않고 이후 나오는 Lexical Environment 부분에 포함되었다.
```

<br>

> ## 자 그럼, **EC 의 Lexical Environment**에 대해 알아보자.

<br>

## Lexical Environment

```js
Lexical Environment는 자바스크립트 코드에서 변수나 함수 등의 식별자를 정의하는데 사용하는 객체로 생각하면 쉽다. (또는, 식별자들에 대한 정보를 매핑한 모음)

Lexical Environment는 식별자-변수 매핑을 보유하는 구조이다. (여기서 식별자는 변수의 이름을 나타냅니다.
```

<br>

- 간단한 예시를 보자.

```js
let name = "Harry";
let job = "Magician";

function magic() {
  console.log(`${name} is ${job}!!!`);
}
```

<br>

- 위의 예시코드를 Lexical Environment로 표현한다면,

```js
lexicalEnvironment = {
  name : "Harry",
  job: "Magician",
  magic: <ref. to magic function>
}
```

## <br>

## 참고자료

- [자바스크립트 함수(3) - Lexical Environment](https://meetup.toast.com/posts/129)

- [Lexical Environment](https://medium.com/@kkak10/lexical-environment-4e0cffcad98d)

- [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
