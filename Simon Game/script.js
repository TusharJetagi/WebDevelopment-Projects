let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "purple", "green"];

let level = 0;
let gameStarted = false;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (gameStarted == false) {
    gameStarted = true;

    levelUp();
  }
});

function checkIdx(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over!! Your score is ${level} <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

// This function is for apply flash effect on random butons.
function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// This function is for increasing levels of game.
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  // Below lines of code generating random colors.
  let randomidx = Math.floor(Math.random() * 3);
  let randomColor = btns[randomidx];
  gameSeq.push(randomColor);
  console.log(gameSeq);

  let randomBtn = document.querySelector(`.${randomColor}`);
  btnflash(randomBtn);
}

// This function comes in action when buttons are get pressed.
function btnPress() {
  let btn = this;
  btnflash(btn);

  let userCol = btn.getAttribute("id");
  userSeq.push(userCol);
  checkIdx(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  gameStarted = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
