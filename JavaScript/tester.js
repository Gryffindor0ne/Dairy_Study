const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const changeName = function (player, newName) {
  const newPlayer = player;
  newPlayer.name = newName;
  return newPlayer;
};

const player2 = changeName(player, "Ron");

console.log(player.name, player2.name);
console.log(player === player2);

/////

const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const changeName = function (player, newName) {
  return {
    name: newName,
    number: player.number,
    playSports: player.playSports,
    position: player.position,
  };
};

const player2 = changeName(player, "Ron");

console.log(player.name, player2.name);
console.log(player === player2);

//////

const copyObject = function (item) {
  const result = {};
  for (const key in item) {
    result[key] = item[key];
  }
  return result;
};

const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const player2 = copyObject(player);
player2.name = "Ron";

console.log(player.name, player2.name);
console.log(player === player2);

////

const player = {
  name: "Harry",
  number: 1,
  playSports: "Quidditch",
  position: "Seeker",
};

const player2 = Object.assign({}, player);
player2.name = "Ron";

console.log(player.name, player2.name);
console.log(player === player2);

////
const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: "guseul chigi",
    fourth: "dalgona",
  },
};

const shallowCopy = function (item) {
  const result = {};
  for (const key in item) {
    result[key] = item[key];
  }
  return result;
};

const player2 = shallowCopy(player);

player2.name = "Hermione";
console.log(player.name === player2.name);
console.log(player.name, player2.name);

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first);
console.log(player.playSports.first, player2.playSports.first);

player2.playSports.fourth = "";
console.log(player.playSports.fourth === player2.playSports.fourth);

///

const deepCopy = function (item) {
  let result = {};
  if (typeof item === "object" && item !== null) {
    // null이 object로 인식되는 것 때문에
    for (const key in item) {
      result[key] = deepCopy(item[key]);
    }
  } else {
    result = item;
  }
  return result;
};

const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: ["guseul chigi", "dalgona"],
  },
};

const player2 = deepCopy(player);

player2.name = "Hermione";
console.log(player.name === player2.name);
console.log(player.name, player2.name);

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first);
console.log(player.playSports.first, player2.playSports.first);

player2.playSports.third[1] = "";
console.log(player.playSports.third === player2.playSports.third);
console.log(player.playSports.third, player2.playSports.third);

//

const player = {
  name: "Harry",
  playSports: {
    first: "Quidditch",
    second: "Chess",
    third: ["guseul chigi", "dalgona"],
  },
};

const player2 = JSON.parse(JSON.stringify(player));

player2.name = "Hermione";
console.log(player.name === player2.name);
console.log(player.name, player2.name);

player.playSports.first = "Squid Game";
console.log(player.playSports.first === player2.playSports.first);
console.log(player.playSports.first, player2.playSports.first);

player2.playSports.third[1] = "";
console.log(player.playSports.third === player2.playSports.third);
console.log(player.playSports.third, player2.playSports.third);

///

const example = [function () {}, () => {}];
const copied = JSON.parse(JSON.stringify(example));

console.log(copied);

///
