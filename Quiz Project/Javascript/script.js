const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const updateQuestion = document.querySelector(".quiz-question");
const questionOptions = document.querySelector(".answer-options-container");
const nextbtn = document.querySelector(".nxt-question-btn");
const questionsCompleted = document.querySelector(".question-completed");
const timerDisplay = document.querySelector(".time-duration");
const resultContainer = document.querySelector(".result-container");

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let category = "programming";
let numberofQuestions = 5;
let currentQuestion = null;
const questionIndexHistory = [];
let correctAnsCount = 0;

//Display the quiz result and hide the quiz container
const showQuizResult = () => {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  const resultText = `You answered <b>${correctAnsCount}</b> out of <b>${numberofQuestions}</b> questions correctly. Great effort!`;
  document.querySelector(".result-message").innerHTML = resultText;
};

// Clear and reset the timer
const resetTimer = () => {
  clearInterval(timer);
  currentTime = QUIZ_TIME_LIMIT;
  timerDisplay.textContent = `${currentTime}s`;
};

//Intilize and start the timer for the current question
const startTimer = () => {
  timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = `${currentTime}s`;

    if (currentTime <= 0) {
      clearInterval(timer);
      highlightCorrectAnswer();
      nextbtn.style.visibility = "visible";
      quizContainer.querySelector(".quiz-timer").style.background = "#c31402";

      //Disable all answer option after one option is selected.
      questionOptions
        .querySelectorAll(".answer-option")
        .forEach((option) => (option.style.pointerEvents = "none"));
    }
  }, 1000);
};

// Fetch a random question based on selected category.
const getRandomQuestions = () => {
  const questionsCategory =
    questions.find(
      (cat) => cat.category.toLowerCase() === category.toLowerCase()
    ).questions || [];

  // Show the results if all questions have been used
  if (
    questionIndexHistory.length >=
    Math.min(questionsCategory.length, numberofQuestions)
  ) {
    return showQuizResult();
  }

  //Filter out already asked questions and choose random one
  const availableQuestions = questionsCategory.filter(
    (_, index) => !questionIndexHistory.includes(index)
  );

  const randomQuestions =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

  questionIndexHistory.push(questionsCategory.indexOf(randomQuestions));

  return randomQuestions;
};

//Highlight the correct answer option and add icon
const highlightCorrectAnswer = () => {
  const correctOption =
    questionOptions.querySelectorAll(".answer-option")[
      currentQuestion.correctAnswer
    ];
  correctOption.classList.add("correct");

  const iconHTML = `<span class = 'material-symbols-rounded'>check_circle<span>`;
  correctOption.insertAdjacentHTML("beforeend", iconHTML);
};

// Handle the users selected answer
const handleAnswer = (option, answerIndex) => {
  clearInterval(timer);
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");
  !isCorrect ? highlightCorrectAnswer() : correctAnsCount++;

  //Insert icons based on correctness
  const iconHTML = `<span class = 'material-symbols-rounded'>${
    isCorrect ? "check_circle" : "cancel"
  }</span>`;
  option.insertAdjacentHTML("beforeend", iconHTML);

  //Disable all answer option after one option is selected.
  questionOptions
    .querySelectorAll(".answer-option")
    .forEach((option) => (option.style.pointerEvents = "none"));

  nextbtn.style.visibility = "visible";
};

// Rendering quetions and its options in the quiz.
const renderQuestion = () => {
  currentQuestion = getRandomQuestions();
  if (!currentQuestion) return;

  resetTimer();
  startTimer();

  // updating UI
  questionOptions.innerHTML = "";
  nextbtn.style.visibility = "hidden";
  quizContainer.querySelector(".quiz-timer").style.background = "#32313c";
  updateQuestion.textContent = currentQuestion.question;
  questionsCompleted.innerHTML = `<b>${questionIndexHistory.length}</b> of <b>${numberofQuestions}</b> Questions`;

  // create options and append them.
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = option;
    questionOptions.appendChild(li);

    // Handling option selection
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

// Start the quiz and rendor the random questions
const startQuiz = () => {
  configContainer.style.display = "none";
  quizContainer.style.display = "block";

  //Update the quiz category and no.of Questions
  category = configContainer.querySelector(
    ".category-option.active"
  ).textContent;
  numberofQuestions = parseInt(
    configContainer.querySelector(".question-option.active").textContent
  );

  renderQuestion();
};

//Highlight the selected option on click
document
  .querySelectorAll(".category-option, .question-option")
  .forEach((option) => {
    option.addEventListener("click", () => {
      option.parentNode.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });

//Reset the quiz and return to the start quiz section
const resetQuiz = () => {
  resetTimer();
  correctAnsCount = 0;
  questionIndexHistory.length = 0;
  configContainer.style.display = "block";
  resultContainer.style.display = "none";
};

nextbtn.addEventListener("click", renderQuestion);
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);
document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);
