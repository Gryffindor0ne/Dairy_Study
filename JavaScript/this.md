# Part 3.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

## 03 this

<br>

자바스크립트에서 **this** 는 함수를 어떤 방식으로 호출하느냐에 따라 달라진다. 상황에 따라 달라지는 **this**에 관해 알아보자.

<br>

### 전역에서의 **this**

<br>

일단 기본적으로 **this** 가 뭘 나타내는지 볼까요?

```js
console.log(this);
// Window {0: global, window: Window, self: Window, document: document, name: '', location: Location, …}

console.log(window);
// Window {0: global, window: Window, self: Window, document: document, name: '', location: Location, …}
```

console.log(this)를 출력하니 window 객체가 나온다. 밑에 있는 console.log(window)의 출력 결과와 같은 것을 볼 수 있다.

그렇다. 기본적으로 자바스크립트에서의 this는 전역객체 즉, window 객체를 뜻한다. (node.js 환경에서는 global 객체)

<br>

> ### 그럼 어떤 상황에서 this의 값이 변화하는 것일까?

<br>

### 첫번째 상황 : 메서드로서의 호출

<br>

```js
var name = "Harry Potter";

function magic() {
  console.log(this.name);
}

magic(); // Harry Potter

var magician = {
  method: magic,
  name: "Hermione",
};

magician.method(); // Hermione
```

위의 예시를 보면, `magic()`의 구문은 함수 자체로 함수를 호출한 예시이고, `magician.method()`은 메서드로서 함수를 호출한 예시이다.

var로 선언한 변수 name은 전역객체의 프로퍼티가 된다. `magic()`을 실행하면 함수 내부의 **this** 는 전역객체를 가리키고, 앞서 선언한 변수 name의 값인 `Harry Potter`를 출력한다.

그러나 `magician.method()`로 실행한 함수에서의 **this** 는 magician 객체가 된다. 객체 내부의 프로퍼티 명 name을 찾아 그 값을 출력한다.

즉, 메서드로서의 함수를 호출할 때는 그 메서드 앞에 명시되어 있는 그 객체가 **this** 의 값이 된다.

<br>

> ### **메서드로서의 호출이란?**

<br>

함수명(프로퍼티명) 앞에 .(dot)이 있으면 메서드로서의 호출이다.

위의 예시를 다시 보면,

`magician` 이라는 객체 안의 프로퍼티명으로 선언된 method에는 함수 magic이 할당되어 있다. method라는 프로퍼티명은 즉 함수명을 의미한다.

<br>

```js
var magician = {
  method: function () {
    console.log(this.name);
  },
  name: "Hermione",
};

magician.method(); // Hermione
```

<br>

함수를 프로퍼티로 가진 객체에 .(dot)을 붙여 함수명 (method)을 적어 호출하면 메서드로서 함수를 호출하는 방법이 된다.

즉, 함수명(프로퍼티명) 앞에 있는 객체가 호출한 대상이 되고 그렇기에 메서드로서 함수를 호출할 시 **this** 는 `.(dot)` 바로 앞에 있는 그 대상, 그 객체가 **this** 가 되는 것이다.

<br>

```js
var magic = {
  magicA: function () {
    console.log(this);
  },
  theOther: {
    magicB: function () {
      console.log(this);
    },
  },
};

magic.magicA(); // {theOther: {…}, magicA: ƒ}  (=== magic)

magic.theOther.magicB(); // {magicB: ƒ}   (=== theOther)
```

<br>

magic.magicA() 을 실행하면, **this** 는 바로 앞에 있는 magic 객체를 나타낸다.
magic.theOther.magicB()를 실행하면 **this** 는 역시 바로 앞, theOther 객체를 나타낸다.

<br>

> 메서드 호출의 방식은 사실...

<br>

2가지 방법이 있다.

위에서는 `.(dot)`만을 얘기했는데 `[](bracket)` 방법도 있다. 역시나 결과는 같다. 그러나 보통은 `.(dot)`을 사용한다.

```js
var magician = {
  method: function () {
    console.log(this.name);
  },
  name: "Hermione",
};

magician.method(); // Hermione

magician["method"](); // Hermione
```

<br>

---

> ### Additional

<br>

```js
const name = "Harry Potter";

function magic() {
  console.log(this.name);
}

magic();
console.log(this); // Window {0: global, window: Window, self: Window, document: document, name: '', location: Location, …}
```

부연 설명으로

위의 예시처럼 name 변수를 const로 선언하면 this.name의 값은 나오지 않는다.
const, let으로 선언된 변수는 전역 객체의 프로퍼티가 되지 않기 때문이다.
**this** 를 출력하면 name 변수의 값이 비어있음을 볼 수 있다.

전역 변수는 되도록 사용하지 않는 것이 좋다. 함수를 만들 땐 외부 변수나 전역 변수를 사용하는 것보다 함수 내부에서 변수를 받고 이를 이용해 결과를 만들어내게 해야 테스트도 쉽고, 에러도 덜 만들어낸다.
