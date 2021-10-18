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
