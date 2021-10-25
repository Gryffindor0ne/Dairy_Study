# Part 4.

### `코어 자바스크립트` 공부한 내용 정리 (정재남 저)

---

<br>

# 04 Callback function

<br>

콜백함수는 다른 코드의 인자로 넘겨지는 함수이다. 콜백함수를 넘겨받은 함수는 콜백함수에 대한 제어권을 가지게 되며, 적절한 시기에 콜백함수를 실행시켜 사용하게 된다.

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
