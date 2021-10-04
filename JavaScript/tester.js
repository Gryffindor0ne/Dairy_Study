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
