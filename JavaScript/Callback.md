# Part 4.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 04 Callback function

<br>

콜백함수는 다른 코드의 인자로 넘겨지는 함수이다.

콜백함수를 넘겨받은 함수는 콜백함수에 대한 제어권을 가지게 되며, 적절한 시기에 콜백함수를 실행시켜 사용하게 된다.

<br>

> ### 콜백함수의 예시를 살펴보자.

<br>

- `forEach` 메서드에서 콜백함수

```jsx
const friends = ["Harry", "Hermione", "Ron"];
friends.forEach(function (eachName, index) {
  console.log(index + 1 + ". " + eachName);
});

// 1. Harry
// 2. Hermione
// 3. Ron
```

위의 코드에서 forEach 메서드 안에서 사용된 익명의 함수가 콜백함수이다.

배열 메서드 내에서 사용되는 함수는 모두 콜백함수의 형식으로 사용된다.

<br>

- `setInterval` 함수에서 콜백함수

```jsx
let count = 0;
let func = function () {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};
let timer = setInterval(func, 500);

/*
-- 결과 --
0  (0.5초)
1  (1.0초)
2  (1.5초)
3  (2.0초)
4  (2.5초)
*/
```

setInterval 함수 내에 사용된 func 함수를 통해 0.5초마다 자동으로 결과가 반환된다.

여기서의 func 함수가 콜백함수이다.

<br>

- `Jquery`에서의 콜백함수

```jsx
$("#btn").click(function () {
  alert("Btn Clicked");
});
```

click 함수의 인자로 사용되는 콜백함수는 click 함수가 실행되어야만 작동한다.

<br>

> ## **Check Point**
>
> > ### 콜백 함수 내부의 this

<br>

```
콜백함수 내부에서 사용된 this의 대상은 의도와 다르게 설정될 수 있다.
```

this 파트 ( `세번째 상황 : 콜백 함수로서의 호출` ) 에서 간단히 설명한 적이 있지만, 여기서는 좀 다른 예시를 들어 추가로 설명해 보고자 한다.

<br>

- 예시코드

```jsx
const nbaSuperStar = {
  nickName: "AirJordan",
  fullName: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback(firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Not Set
console.log(window.fullName); //  Micheal Jordan
```

- setFullName 함수는 this의 fullName을 설정하는 함수로 만들어졌다.

  getStarName 함수를 실행할 때 설정하고자 하는 인수를 넣고, 마지막 인수로 nbaSuperStar 내 setFullName 함수를 실행시키면 의도와는 다르게 fullName이 설정되지 않는다.

  오히려 전역객체의 fullName이 설정되는 것을 볼 수 있다.

<br>

> ## **왜 그럴까?**

<br>

콜백 함수는 역시 함수다.

함수에서 this의 대상은 무엇이었던가?

바로 `window 객체(전역객체)`이다. (`nodejs는 global`)

<br>

- 위의 코드를 토대로 다음을 추가로 실행해보자.

```jsx
nbaSuperStar.setFullName("Ryan", "Lee");
console.log(nbaSuperStar.fullName); // Ryan Lee
```

- nbaSuperStar 객체의 메소드 setFullName를 인자를 넣어 실행하면 nbaSuperStar 객체의 fullName이 설정된다.

  메소드로 실행한 함수는 해당 객체를 this로 지정하기 때문에 원하는 결과가 반환된다.

<br>

> ### 다시 코드를 보면,

```jsx
const nbaSuperStar = {
  nickName: "AirJordan",
  fullName: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback(firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Not Set
console.log(window.fullName); //  Micheal Jordan
```

<br>

- getStarName 함수는 마지막 인자로 `nbaSuperStar.setFullName` 를 받는다.

  nbaSuperStar 객체의 메소드 setFullName를 콜백 함수로 전달함으로써 같은 결과를 얻고자 했지만,

  여기서 `nbaSuperStar.setFullName`는 메서드로 전달된 것이 아니라 함수 그 자체로 전달된 것이다.

 <br>

- 다시 말해, 함수 자체가 콜백함수로 전달되었다고 볼 수 있다.

```jsx
getStarName("Micheal", "Jordan", function (firstName, lastName) {
  this.fullName = `${firstName} ${lastName}`;
});
```

<br>

- 따라서 위의 함수을 실행하였을 때 this의 대상은 전역객체가 되며, getStarName 함수가 전역객체의 fullName을 설정하는 함수로서 작동하게 된다.

```jsx
console.log(window.fullName); //  Micheal Jordan
```

<br>

> ## 그럼, 원하는대로 고쳐보자!

<br>

```jsx
const nbaSuperStar = {
  nickname: "AirJordan",
  fullname: "Not Set",

  setFullName: function (firstName, lastName) {
    this.fullName = `${firstName} ${lastName}`;
  },
};

function getStarName(firstName, lastName, callback) {
  callback.call(nbaSuperStar, firstName, lastName);
}

getStarName("Micheal", "Jordan", nbaSuperStar.setFullName);
console.log(nbaSuperStar.fullName); // Micheal Jordan
```

- 위의 코드에서처럼 call 메서드를 사용하여 this의 대상을 바인딩하면 원하는 결과를 만들어 낼 수 있다.

  > 물론 apply 메서드도 마찬가지로 가능하다!

  <br>

---
