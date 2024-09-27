// Selecting all elements for further use.

const checkBoxes = document.querySelectorAll(".checkbox");
const inputField = document.querySelectorAll(".goal-label");
const errorMsg = document.querySelector(".Error-label ");
const ProgressLabel = document.querySelector(".progressbar-label");
const progressBar = document.querySelector(".progressbar ");
const progressLevel = document.querySelector(".progressbar-level");
const footerText = document.querySelector(".quote");

// Below is the array for printing qoutes after every goal click

let HeaderQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Wow!! You just completed all the goals, time for chill..",
];

let FooterQoute = [
  "“Move one step ahead, today!”",
  "“Well done for completing your first goal!”",
  "“Keep Going, You’re making great progress!”",
  "“Good work, all goals are completed!”",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoals = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressLevel.firstElementChild.innerText = `${completedGoals}/3 completed`;
ProgressLabel.innerText = HeaderQuotes[completedGoals];
footerText.innerText = FooterQoute[completedGoals];

progressLevel.style.width = `${(completedGoals / 3) * 100}%`;

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputField].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoals = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressLevel.style.width = `${(completedGoals / 3) * 100}%`;
      progressLevel.firstElementChild.innerText = `${completedGoals}/3 completed`;
      ProgressLabel.innerText = HeaderQuotes[completedGoals];
      footerText.innerText = FooterQoute[completedGoals];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputField.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
