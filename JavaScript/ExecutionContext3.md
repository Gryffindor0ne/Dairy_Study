# Part 2-3.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 02 실행 컨텍스트 (Execution Context)

<br>

## 스코프 (Scope)

<br>

> **스코프 (Scope)** 는 앞서 EC의 LexicalEnvironment의 Outer(Reference to the Outer Environment)를 설명하면서 얘기한 스코프 체인의 그 스코프이다.
>
> > 여기서 추가적으로 설명한다.

<br>

**스코프 (Scope)** 란 식별자에 대한 유효한 범위를 말한다. 다시 말해 우리가 변수 혹은 함수를 선언하게 될 때 해당 변수 또는 함수가 유효한 범위를 뜻한다.

어떤 A라는 범위가 있을때 A 범위 밖에서 선언한 변수는 A의 외부 뿐 아니라 내부에서도 접근이 가능하지만 A 범위 내부에서 선언한 변수는 그 내부에서만 접근이 가능하다.

<br>

**스코프 (Scope)** 의 종류

1. Function (함수) Scope: 함수 안에서만 사용이 가능합니다.
2. Block (블록) Scope: if, for, switch 등 특정 블록 내부에서만 사용이 가능합니다.

<br>

### **Scope의 예시**

```js
const value = "Global!";

function scopeA() {
  const value = "A!";
  const otherValue = "C!";
  console.log(value); // A!

  function scopeB() {
    const value = "B!";
    console.log(value); // B!
    console.log(otherValue); // C!
  }
  scopeB();
}

scopeA();

console.log(value); // Global!
console.log(otherValue); // Uncaught ReferenceError: otherValue is not defined
```

<br>

scopeA 함수가 실행되면 value 변수에는 `A!`가 할당되고 otherValue 변수에는 `C!`가 할당된다. value 변수의 값을 출력되면 `A!`가 나올 것이다.

scopeB 함수가 실행되면 새로운 value 변수를 선언하면 `B!`가 할당되고 value 변수의 값을 출력하면 `B!`가 나온다.

그 다음 otherValue 변수를 출력하면 현재의 **스코프 (Scope)** 에서 otherValue 변수가 있지 않기 때문에 상위 스코프 즉, scopeA 함수 내부에서 선언된 otherValue 변수의 값을 참조하게 되고 `C!`가 출력된다.

다음 코드인 value 변수를 출력하면 현재 스코프인 전역의 value 값이 출력되어
`Global!`이 출력되고, otherValue 변수를 출력하고자 했을 때 otherValue 변수는 현재 스코프 내에 있지 않은 scopeA 함수 내부의 있는 변수이기 때문에 참조할 수 없다. 그래서 `ReferenceError` 가 나온다.

<br>

![1](https://user-images.githubusercontent.com/79234473/140868557-39273d04-671a-49ba-89a7-3c12dd183aef.png)

<br>

![2](https://user-images.githubusercontent.com/79234473/140868561-d13bf829-d092-4b56-ad76-466d4f7adfcc.png)

<br>

### **Block (블록) Scope**

```js
const value = "Global!";

function funcScope() {
  const value = "funcScope!";
  if (true) {
    const value = "blockScope!";
    console.log(value); // blockScope!
  }
  console.log(value); // funcScope!
}

funcScope();
console.log(value); // Global!
```

<br>

- `const` 로 선언한 변수는 **`Block Scope`** 를 가진다. (`let` 도 동일)

  if문 안에서 const로 선언된 value 변수의 값은 if문의 블록 ({}) 안에서만 유효하기 때문에 if문 밖의 value 변수는 funcScope Scope를 따른다. funcScope 함수 내부에서 선언된 value 값이 두번째 console.log(value)에서 출력되는 이유이다.

<br>

![3](https://user-images.githubusercontent.com/79234473/140868565-96d3a376-bd31-43f3-9c51-db8c1ed2db94.png)

<br>

![4](https://user-images.githubusercontent.com/79234473/140868568-05be8a33-42f7-4fb5-b9d2-72c146ac5f25.png)

<br>

### **Function (함수) Scope**

```js
var value = "Global!";

function funcScope() {
  var value = "defaultValue!";
  if (true) {
    var value = "changeValue!";
    console.log(value); // changeValue!
  }
  console.log(value); // changeValue!
}

funcScope();
console.log(value); // Global!
```

<br>

- `var` 로 선언된 변수는 **`Function Scope`** 를 가진다.

  if문 안에서 선언된 value 변수의 값은 var 로 선언되어 if문의 블록 ({}) 밖에서도 적용된다. if문 밖의 value 변수의 값은 두번째 console.log(value)에서 동일하게 출력된다.

  <br>

![5](https://user-images.githubusercontent.com/79234473/140868571-a90a1163-b65f-470a-9ae3-0a02112459aa.png)

  <br>

![6](https://user-images.githubusercontent.com/79234473/140868573-1e092bb8-1dce-481c-94ed-1e353ab515aa.png)

  <br>

---

## 참고자료

- [자바스크립트의 Scope 에 대한 이해](https://learnjs.vlpt.us/useful/08-scope.html)

- [let, const와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)
