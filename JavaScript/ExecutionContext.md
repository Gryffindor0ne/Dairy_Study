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

## 실행 컨텍스트의 구조

![EC2](https://user-images.githubusercontent.com/79234473/137242638-c42373f2-64ec-4475-bccc-819ff5da1896.png)

## 실행 컨텍스트는 어떻게 만들어지는가?

<br>

실행 컨텍스트는 2개의 단계를 거쳐 생성된다.

1. 생성단계 (Creation Phase)
2. 실행단계 (Execution Phase)

<br>

# **생성단계 (Creation Phase)**

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

Lexical Environment는 식별자-변수 매핑을 보유하는 구조이다. (여기서 식별자는 변수의 이름을 나타낸다.)
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

     Lexical Environment은 위와 같이 식별자들에 대한 정보를 매핑한다.

<br>

> 그럼, Lexical Environment에는 어떤 것이 있을까?

<br>

- Lexical Environment는 다음의 3가지 컴포넌트를 가진다.

1. Environment Record
2. Reference to the outer environment
3. ThisBinding

<br>

## Environment Record

<br>

```js
Environment Record는 식별자들의 바인딩을 기록하는 객체를 말한다.
간단히 말해 변수, 함수 등이 기록되는 곳이다.

실질적으로 Declarative Environment Record와 Object Environment Record 2가지 종류를 일켣는다.

자세히는 Global Environment Record, Function Environment Record, Module Environment Record도 있다.

이들은 다음과 같은 상속 관계를 갖는다.
```

<br>

![ER](https://user-images.githubusercontent.com/79234473/137255483-6143822b-94b0-4cb1-b25b-f37e6de3bb58.png)

<br>

- Declarative Environment Record

  > 변수 및 함수 선언을 저장.

<br>

- Object Environment Record

  > 변수 및 함수 선언 외에 전역 바인딩 개체(window object in browsers)도 저장.

  > > `The lexical environment for global code contains a objective environment record`

<br>

**참고로 추가 설명**

함수 코드가 실행되면 Environment Record에 **arguments** object가 포함된다.

이 객체에는 함수에 전달된 인덱스와 인수, 그리고 인수의 길이를 포함된다.

<br>

- 예시를 보면,

```js
let name = 'Harry';
let spell = 'Aquamenti';

function magic(name, spell) {
  console.log(`${name} called : ${spell}!!!`);
}

magic(name, spell)

// arguments object
arguments : {0: 'Harry',1: 'Aquamenti', length: 2}
```

<br>

## Reference to the Outer Environment

<br>

```md
Reference to the Outer Environment(줄여서 Outer)는 외부의 lexical environment에 액세스할 수 있음을 의미한다.

이는 JavaScript 엔진이 현재 lexical environment에서 변수를 찾을 수 없는 경우 외부 환경 내부에서 변수를 찾을 수 있음을 의미한다.

다시 말해, 변수를 탐색하는 과정에서 현재 실행 컨텍스트 내의 참조할 변수가 없다면 상위 lexical environment에 접근하여 변수를 찾는 매커니즘이다.

ES3에서 말하던 Scope Chain과 동일한 개념으로 ES5부터는 `Lexical nesting structure`로 불린다.
```

<br>

- 예시 코드를 보자.

```js
const global = "I'm global";
function first() {
  const firstConst = "I'm firstConst";
  function second() {
    const secondConst = "I'm secondConst";
    function third() {
      console.log(secondConst); // "I'm secondConst"
      console.log(firstConst); // "I'm firstConst"
      console.log(global); // "I'm global"
      console.log(thirdConst); // Reference Error : thirdConst is not defined
    }
    third();
  }
  second();
}
first();
```

- 위 코드를 단순하게 표현하자면 아래와 같다. (일부 상세한 코드는 생략)

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

```js
위 그림에서처럼 각 lexical environment에서 `Outer`는 부모의 lexical environment를 가리킨다.
```

<br>

![LE2](https://user-images.githubusercontent.com/79234473/137315966-a4a48a5c-45f0-4ff4-8f49-0e11395386dc.png)

```js
예시코드에서 third 함수가 실행되었을 때
secondConst, firstConst, global, thirdConst 변수를 찾게 될 것이다.

위의 그림에서는 secondConst, thirdConst를 예로 들었는데 보다시피 현재 LexicalEnvironment에 값이 있는지 확인하고 변수가 없으면 부모의 값으로 이동한다.

secondConst의 경우 second LexicalEnvironment에 값이 존재하므로 그 값을 참조할 것이다.

그러나 thirdConst는 그 값을 발견할 때까지 상위 LexicalEnvironment에 접근하다가 결국 존재하지 않는 값이므로 null을 만나 `Reference Error`가 난다.
```

<br>

```js
이것은 일반적으로 듣던 스코프 체인이다. 그러나 중요한 점은 부모의 환경에 연결되는 Outer(외부 환경)는 함수가 호출될 때가 아니라 `선언될 때 결정` 된다.
```

<br>

- 다음 코드를 보자.

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

```js
위의 결과값이 2가 아닌 `1`이 나오는 이유는?

`Outer`는 부모를 둘러싼 함수가 아니라 부모의 LexicalEnvironment이기 때문이다.
```

<br>

## ThisBinding

<br>

```js
Global execution context에서 this는 global obejct를 나타낸다.
(예를 들어 브라우저라면 Window Object)

Function execution context에서 this 값은 함수가 호출되는 방식에 따라 다릅니다.
객체 참조에 의해 호출되면 this 값이 해당 객체로 설정되고, 그렇지 않으면 this 값이 전역 객체로 설정되거나 정의되지 않는다. _ undefined
```

## <br>

## 참고자료

- https://262.ecma-international.org/6.0/#sec-lexical-environments

- [자바스크립트 함수 - Lexical Environment](https://meetup.toast.com/posts/129)

- [Lexical Environment](https://medium.com/@kkak10/lexical-environment-4e0cffcad98d)

- [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
