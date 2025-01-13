const inputField = document.querySelector('input');
const btns = document.querySelectorAll('.btns');
const clearAll = document.querySelector('.clear-btn');
const resultBtn = document.querySelector('.equalTo-btn');


btns.forEach((curr) => curr.addEventListener('click', () => inputField.value += curr.textContent));

resultBtn.addEventListener('click', () => inputField.value = eval(inputField.value));

clearAll.addEventListener('click', () => inputField.value = '');