let number = document.querySelector(".number");
const decrementBtn = document.querySelector(".decrease");
const incrementBtn = document.querySelector(".increase");
const input = document.querySelector("input");
const resetBtn = document.querySelector(".reset-btn");

function decreaseNum() {
  let value = parseInt(number.innerText);
  number.innerText = value - input.value;
}

function increaseNum() {
  let value = parseInt(number.innerText);
  number.innerText = parseInt(input.value) + value;
}

function reset() {
  number.innerText = 0;
  input.value = 1;
}
