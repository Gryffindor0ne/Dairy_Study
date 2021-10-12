# Part 2-1.

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

참조 : [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

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

참조 : [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

<br>

> 그럼, 실행 컨텍스트에는 어떤 정보가 담기는 걸까?

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

<br>

```js
Lexical Environment = {
  environmentRecord: {},
  outerEnvironmentReference: {}
}
```

<br>

- environmentRecord : 현재 Context에서 선언된 함수 혹은 변수들이 저장되는 공간.

- outerEnvironmentReference : 현재 Context를 기준으로 외부 Context를 참조하는 공간

참조 : [Lexical Environment](https://medium.com/@kkak10/lexical-environment-4e0cffcad98d)
