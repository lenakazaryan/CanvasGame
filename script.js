const button = document.querySelector("#start-game");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let score = document.getElementById("score");
let timer = document.getElementById("time");
let count = 0;
let time = 0;
let life = 3;
let heart1 = document.querySelector("#heart1");
let heart2 = document.querySelector("#heart2");

const food1 = document.createElement("img");
food1.src =
  "https://www.pngkey.com/png/full/702-7024199_doughnut-clipart-food-snack-fast-food-cartoon.png";
const food2 = document.createElement("img");
food2.src =
  "https://i.pinimg.com/originals/1a/99/79/1a99794fd8a5a808e1ba10ff2ac13ac8.png";
const harm = document.createElement("img");
harm.src =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dialog-stop-hand.svg/1200px-Dialog-stop-hand.svg.png";
const hero = document.createElement("img");
hero.src =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/689bf962-a015-4709-9d60-9572c611a7fb/d4l528z-2724f3ae-a5bc-4800-a327-fb6160f2b08f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNjg5YmY5NjItYTAxNS00NzA5LTlkNjAtOTU3MmM2MTFhN2ZiXC9kNGw1Mjh6LTI3MjRmM2FlLWE1YmMtNDgwMC1hMzI3LWZiNjE2MGYyYjA4Zi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.GOG5ZphnBp1lW_puA0FFsxHK2EFRdK4S-g_ZhtV1FQw";
const magic = document.createElement("img");
magic.src = "https://pngimg.com/uploads/poison/poison_PNG59.png";
const backgroundImg = document.createElement("img");
backgroundImg.src =
  "https://i.pinimg.com/originals/76/60/18/7660185a8fc8a936bf8cf9cf275e31c8.jpg";

let animal = {
  x: 130,
  y: 150,
  width: 65,
  height: 55,
  maxX() {
    return this.x + (this.width - 10);
  },
};

let badThing = {
  x: getRundomX(canvas.width),
  y: 0,
  width: 30,
  height: 30,
  maxX() {
    return this.x + (this.width - 10);
  },
  maxY() {
    return animal.y - this.height + 15;
  },
};

let publik = {
  x: 100,
  y: 90,
  width: 40,
  height: 20,
  maxX() {
    return this.x + (this.width - 10);
  },
  maxY() {
    return animal.y - this.height + 15;
  },
};

let hamburger = {
  x: 150,
  y: 90,
  width: 40,
  height: 20,
  maxX() {
    return this.x + (this.width - 10);
  },
  maxY() {
    return animal.y - this.height + 15;
  },
};

let magicDrink = {
  x: 150,
  y: 90,
  width: 50,
  height: 30,
  maxX() {
    return this.x + (this.width - 10);
  },
  maxY() {
    return animal.y - this.height + 15;
  },
};

let xDelta = 2;
let yDelta = 2;

function getRundomX(max) {
  return Math.floor(Math.random() * max);
}

function update() {
  if (publik.y > canvas.width) {
    publik.y = 1;
  }

  if (hamburger.y > canvas.width) {
    hamburger.y = 1;
  }

  if (magicDrink.y > canvas.width) {
    magicDrink.y = 1;
  }

  if (badThing.y > canvas.width) {
    badThing.x = getRundomX(canvas.width);
    badThing.y = 1;
  }

  if (
    publik.y >= publik.maxY() &&
    publik.maxX() > animal.x &&
    publik.x < animal.maxX()
  ) {
    publik.x = getRundomX(canvas.width);
    publik.y = 1;
    count++;
  }

  if (
    hamburger.y >= hamburger.maxY() &&
    hamburger.maxX() > animal.x &&
    hamburger.x < animal.maxX()
  ) {
    hamburger.x = getRundomX(canvas.width);
    hamburger.y = 1;
    count++;
  }

  if (
    badThing.y >= badThing.maxY() &&
    badThing.maxX() > animal.x &&
    badThing.x < animal.maxX()
  ) {
    badThing.y = 1;
    life--;
    if (life === 2) {
      heart1.style.display = "none";
    }
    if (life === 1) {
      heart2.style.display = "none";
    }
    if (life === 0) {
      alert("Game Over! Let's start again!");
      location.reload();
    }
  }

  if (
    magicDrink.y >= magicDrink.maxY() &&
    magicDrink.maxX() > animal.x &&
    magicDrink.x < animal.maxX()
  ) {
    magicDrink.x = getRundomX(canvas.width);
    magicDrink.y = 1;
    xDelta = 6;
    resetSpeed();
  }

  if (animal.x < 0) {
    animal.x = 1;
  } else if (animal.width + animal.x >= canvas.width) {
    animal.x = canvas.width - animal.width;
  }

  time++;
  score.innerText = "Score " + count;
  publik.y += xDelta;
  hamburger.y += xDelta;
  badThing.y += xDelta;
  magicDrink.y += xDelta;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  context.drawImage(food1, publik.x, publik.y, publik.width, publik.height);
  context.drawImage(hero, animal.x, animal.y, animal.width, animal.height);
  context.drawImage(
    food2,
    hamburger.x,
    hamburger.y,
    hamburger.width,
    hamburger.height
  );
  context.drawImage(
    harm,
    badThing.x,
    badThing.y,
    badThing.width,
    badThing.height
  );

  context.drawImage(
    magic,
    magicDrink.x,
    magicDrink.y,
    magicDrink.width,
    magicDrink.height
  );
}

function loop() {
  requestAnimationFrame(loop);

  update();
  draw();
  timer.innerText = "Time " + time;
}

document.addEventListener("keydown", function (evt) {
  if (evt.code === "ArrowRight") {
    animal.x += 15;
  } else if (evt.code === "ArrowLeft") {
    animal.x -= 15;
  }
});

button.addEventListener(
  "click",
  function () {
    loop();
  },
  {
    once: true,
  }
);

let resetSpeed = function () {
  setTimeout(function () {
    xDelta = 2;
  }, 5000);
};
