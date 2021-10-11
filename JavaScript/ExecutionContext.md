# Part 2-1.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 02 실행 컨텍스트 (Execution Context)

<br>

> 실행 컨텍스트 : `실행할 코드에 제공할 환경 정보들을 모아놓은 객체` 또는 `실행 가능한 코드가 실행되기 위해 필요한 환경`

<br>

1. 실행 가능한 코드

- 전역 코드 : 전역 공간에 존재하는 코드
- eval 코드 : eval 함수에 존재하는 코드
- 함수 코드 : 함수 내 존재하는 코드

> 우리가 실행 컨텍스트를 구성하는 것은 `함수 코드`

<br>

2. 실행에 필요한 정보

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

<br>

> 자바스크립트 엔진 -> 실행에 필요한 정보를 형상화하고 구분하기 위해 `실행 컨텍스트`를 물리적 객체 형태로 관리한다.

<br>

참조 : [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

<br>

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

![실행컨텍스트2](https://user-images.githubusercontent.com/79234473/136782449-9ee21758-b40f-4805-b7fc-a65549b50d65.png)
