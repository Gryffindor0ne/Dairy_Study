# Part 3.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 03 this

<br>

자바스크립트에서 **this** 는 함수를 어떤 방식으로 호출하느냐에 따라 달라진다. 상황에 따라 달라지는 **this**에 관해 알아보자.

<br>

### 전역에서의 **this**

<br>

일단 기본적으로 **this** 가 뭘 나타내는지 볼까요?

```js
console.log(this);
// Window {0: global, window: Window, self: Window, document: document,  location: Location, …}

console.log(window);
// Window {0: global, window: Window, self: Window, document: document,  location: Location, …}
```

console.log(this)를 출력하니 window 객체가 나온다. 밑에 있는 console.log(window)의 출력 결과와 같은 것을 볼 수 있다.

그렇다. 기본적으로 자바스크립트에서의 this는 전역객체 즉, window 객체를 뜻한다. (node.js 환경에서는 global 객체)

<br>

> ### 그럼 어떤 상황에서 **this** 의 값이 변화하는 것일까?

<br>

### **첫번째 상황 : 메서드로서의 호출**

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
console.log(this); // Window {0: global, window: Window, self: Window, document: document, location: Location, customElements: CustomElementRegistry, …}
```

부연 설명으로

위의 예시처럼 name 변수를 const로 선언하면 this.name의 값은 나오지 않는다.
const, let으로 선언된 변수는 전역 객체의 프로퍼티가 되지 않기 때문이다.
**this** 를 출력하면 name 프로퍼티는 존재하지 않는다.

전역 변수는 되도록 사용하지 않는 것이 좋다. 함수를 만들 땐 외부 변수나 전역 변수를 사용하는 것보다 함수 내부에서 변수를 받고 이를 이용해 결과를 만들어내게 해야 테스트도 쉽고, 에러도 덜 만들어낸다.

---

<br>

### **두번째 상황 : 함수로서의 호출**

<br>

앞서 함수로서의 호출의 예시를 잠깐 봤었다. 메서드로서의 함수 호출과 비교하면서.

```js
var name = "Harry Potter";

function magic() {
  console.log(this.name);
}

magic(); // Harry Potter
```

함수를 그 자체로 호출하면 모든 **this** 는 전역객체를 나타낸다.

 <br>

> ### **자 그럼, 함수 내부의 함수에서는 어떤 일이 벌어지는지 살펴보자!**

 <br>

```js
var magic = {
  magicA: function () {
    console.log(this);

    var magicB = function () {
      console.log(this);
    };
    magicB();

    var magic2 = {
      magicBB: magicB,
    };
    magic2.magicBB();
  },
};
magic.magicA();
```

위의 결과는 어떨까?

코드를 따라가보자.

magic.magicA()가 실행되면, 먼저 magicA 함수가 실행된다.magicA 함수 내부의 첫번째 **this** 는 메서드로서의 호출로 magic 객체를 나타낸다.

```js

magic.magicA()

---
var magic = {
  magicA: function () {
    console.log(this);  // {magicA: ƒ}  (=== magic)
    ...
    }
}
```

<br>

magicB()가 실행되면, magicB 함수 내부의 두번째 **this** 가 출력되는데,

```js

magicB()

---
var magicB = function () {
      console.log(this);  // Window {…}
    };
```

window 객체, 즉 전역 객체가 출력된다. 함수 호출 방식은 **this** 가 전역 객체를 가리키기 때문이다.

<br>

마지막으로 magic2.magicBB()가 실행되면, magicA 함수 내부에서 선언된 변수 magic2에 할당되어 있는 객체의 프로퍼티로 magicBB는 magicB와 동일한 함수이지만,

```js
magic2.magicBB();

---
var magic2 = {
      magicBB: function () {
      console.log(this);  // {magicBB: ƒ}  (=== magic2)
    };,
    }
```

**this** 는 magic2 객체를 가리킨다. 메서드로서의 호출 방식이기 때문이다.

<br>

**this** 는 결국 어떤 방식으로 함수가 호출되느냐에 따라 그 대상이 정해진다. 함수 내부에서 this를 같은 함수로 호출하더라도 그 대상은 달라진다.

<br>

> ### 그럼, 스코프처럼 함수 내부에서의 **this**를 상위 **this**에서 상속받아 사용할 수는 없을까? 더 편리할 것 같은데...

<br>

### 방법이 있다!

<br>

```js
var magic = {
  magicA: function () {
    console.log(this); // {magicA: ƒ}

    var magicB = function () {
      console.log(this); // Window {…}
    };
    magicB();

    var that = this;

    var magic2 = function () {
      console.log(that); // {magicA: ƒ}
    };
    magic2();
  },
};
magic.magicA();
```

**this** 를 다른 변수에 할당하여 사용하면 가능하다. 위의 예시처럼 **that** 이라는 변수에 **this**를 할당하고 그 변수를 사용하면 상위 **this**를 가리킨다.

<br>

### 더 간단한 방법도 있다!

<br>

```js
var magic = {
  magicA: function () {
    console.log(this); // {magicA: ƒ}

    var magicB = () => {
      console.log(this); // {magicA: ƒ}
    };
    magicB();
  },
};
magic.magicA();
```

ES6의 화살표 함수를 이용하면 상위 **this** 를 그대로 활용한다.

<br>

---

<br>

### **세번째 상황 : 콜백 함수로서의 호출**

<br>

콜백 함수 역시 함수이기 때문에 원칙적으로 **this** 는 전역객체를 가리킨다. 그러나 별도로 함수가 **this** 지정하는 경우가 있다. 그럴 경우는 지정된 대상이 **this** 대상이 된다.

```js

let arr = [1, 2, 3];

arr.forEach(function(a) {
  console.log(this, a);   // Window {…} 1
                          // Window {…} 2
                          // Window {…} 3
})

---

document.body.innerHTML = '<button id="testThis"> Click </button>'
const btn = document.body.querySelector('#testThis')
btn.addEventListener("click", function() {
  console.log(this)  // <button class="testThis"> Click </button>
})
```

- 예시의 forEach 메서드는 콜백 함수를 인자로 받아 실행하는데 **this** 는 window 객체를 가리킨다.

- addEventListener 메서드는 역시 콜백 함수를 인자로 받아 실행되었으나, **this** 는 해당 이벤트가 실행되는 주체인 상위 엘리먼트가 그 대상이 된다.

<br>

---

<br>

### **네번째 상황 : 생성자 함수로서의 호출**

<br>

생성자 함수는 공통된 성질을 가진 객체를 생성하는 함수이다. 객체가 붕어빵이라면 생성자 함수는 붕어빵을 찍어내는 틀이라고 할 수 있다. new 키워드를 사용하여 함수를 호출하면 그 함수는 생성자 함수로 인식된다.

<br>

```js
const Magician = function (name, power) {
  this.name = name;
  this.power = power;
};

const a = new Magician("Harry", 10);
const b = new Magician("Hermione", 8);
const c = new Magician("Ron", 4);

console.log(a, b, c);
/*
magician {name: 'Harry', power: 10},
magician {name: 'Hermione', power: 8},
magician {name: 'Ron', power: 4}
*/
```

생성자 함수에서의 **this** 는 새로 만들 객체 그 자신이 된다.

a 변수로 선언된 새로운 인스턴스 객체 그 자신인 a가 **this** 인 것이다.

<br>

> ### 명시적 **this** 바인딩 (Explicit Binding)

<br>

**this** 는 위에서처럼 상황별로 그 대상이 달라진다. 그러나 별도의 대상을 지정해서 사용할 수도 있다.

이걸 명시적 **this** 바인딩이라고 한다. **this** 의 역할을 직접 지정해준다고 보면 된다.

<br>

> 다음 3가지 방법이 있다.

<br>

```js
  call 메서드

  apply 메서드

  bind 메서드
```

<br>

### **call 메서드**

<br>

```
실행함수.call(this로 지정할 대상, 인자1, 인자2 ...)
```

```js
const methodCall = function (x, y) {
  console.log(this, x, y);
};

methodCall(1, 2); // Window {…} 1 2
methodCall.call({ method: "call" }, 9, 10); // {method: 'call'} 9 10
```

methodCall 함수를 실행하면 **this**는 전역 객체가 그 대상이지만, call 메서드를 붙이면 지정한 객체가 **this** 의 대상이 된다.

<br>

```js
const methodCall = {
  method: "call",
  func: function (x, y) {
    console.log(this.method, x, y);
  },
};

methodCall.func(1, 2); // call 1 2
methodCall.func.call({ method: "call2" }, 12, 24); // call2 12 24
```

func 메서드를 실행하면 **this**는 methodCall 객체가 그 대상이지만, 마찬가지로 call 메서드를 붙이면 지정한 객체가 **this** 의 대상이 된다.

<br>

### **apply 메서드**

<br>

```
실행함수.apply(this로 지정할 대상, [인자1, 인자2, ...])
```

apply 메서드는 call 메서드와 작동 원리는 동일하다. 다른 점은 두번째 인자로 배열을 받는다는 점이다.

<br>

```js
const methodApply = function (x, y) {
  console.log(this, x, y);
};

methodApply(1, 2); // Window {…} 1 2
methodApply.apply({ method: "apply" }, [9, 10]); // {method: 'apply'} 9 10
```

```js
const methodApply = {
  method: "apply",
  func: function (x, y) {
    console.log(this.method, x, y);
  },
};

methodApply.func(1, 2); // apply 1 2
methodApply.func.apply({ method: "apply2" }, [12, 24]); // apply2 12 24
```

<br>

> call / apply 메서드의 활용

<br>

### **유사배열객체에 배열 메서드를 붙이고 싶을 때**

<br>

```js
const arr = ["Harry", "Hermione", "Ron"];

typeof arr; // 'object'
arr[0]; // 'Harry'
arr.length; // 3
```

```js
const obj = {
  0: "Harry",
  1: "Hermione",
  2: "Ron",
  length: 3,
};

typeof obj; // 'object'
obj[0]; // 'Harry'
obj.length; // 3
```

배열은 객체이지만, 인덱스와 length를 가진다. 유사배열객체는 배열처럼 인덱스와 length 프로퍼티를 가진 객체로 배열과 동일한 접근이 가능하다.

그러나, 배열의 메소드를 유사배열객체에서는 사용할 수 없다. 원칙적으로 배열이 아니기 때문이다.

```js
const arr = ["Harry", "Hermione", "Ron"];

arr.push("Voldemort");
console.log(arr); //  ['Harry', 'Hermione', 'Ron', 'Voldemort']
```

```js
const obj = {
  0: "Harry",
  1: "Hermione",
  2: "Ron",
  length: 3,
};

obj.push("Voldemort"); // Uncaught TypeError: obj.push is not a function
```

<br>

call / apply 메소드는 이러한 유사배열객체에 배열과 동일하게 배열메소드를 적용하고 싶을때 사용이 가능하다.

```js
const obj = {
  0: "Harry",
  1: "Hermione",
  2: "Ron",
  length: 3,
};

Array.prototype.push.call(obj, "Voldemort");
console.log(obj); // {0: 'Harry', 1: 'Hermione', 2: 'Ron', 3: 'Voldemort', length: 4}

const arr = Array.prototype.slice.call(obj);
console.log(arr); // ['Harry', 'Hermione', 'Ron', 'Voldemort']
```

call 메소드를 사용하여 유사배열객체에 배열 메소드인 push 메소드를 사용할 수 있다. 유사배열객체에 새로운 인자가 들어간 것을 볼 수 있다.

배열메소드 slice를 사용하면 배열로 만들 수 있다.

<br>

> 자바스크립트에서 사용되는 대표적인 유사배열객체는 함수의 arguments 객체, HTMLCollection, NodeList 등이 있다.

```js
function func() {
  const args = Array.prototype.slice.apply(arguments);
  args.push("추가");
  console.log(args);
}

func(1, 2, 3); // [1, 2, 3, '추가']
```

```js
document.body.innerHTML = "<div>test</div><div>test2</div><div>test3</div>";
const nodes = document.querySelectorAll("div");
const nodeArr = Array.prototype.slice.call(nodes);
nodeArr.forEach(function (node) {
  console.log(node);
});

// <div>test</div>
// <div>test2</div>
// <div>test3</div>
```

<br>

> ES6에서는 유사배열객체를 배열로 바꿔주는 메소드가 생겨났다.

> ### **Array.from()**

<br>

```js
const obj = {
  0: "Harry",
  1: "Hermione",
  2: "Ron",
  length: 3,
};

const arr = Array.from(obj);
console.log(arr); // ['Harry', 'Hermione', 'Ron']
```

<br>

### **생성자 함수 내부에서 사용**

<br>

## <br>

## 참고자료

- https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb

- https://im-developer.tistory.com/96
