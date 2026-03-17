document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next-btn");
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultsContainer = document.getElementById("results-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      choices: [
        "William Shakespeare",
        "Charles Dickens",
        "Leo Tolstoy",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
    {
      question: "Which programming language runs in a web browser?",
      choices: ["Python", "Java", "C++", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What is the largest ocean on Earth?",
      choices: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
    {
      question: "Which country is famous for the Great Wall?",
      choices: ["Japan", "China", "India", "Thailand"],
      answer: "China",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;

  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });

  function showQuestion() {
    answered = false;
    const question = questions[currentQuestionIndex];
    // console.log(question);
    questionText.innerHTML = "";
    questionText.textContent = question.question;

    choicesList.innerHTML = "";
    nextBtn.classList.add("hidden");
    question.choices.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option;

      li.addEventListener("click", () => {
        if (answered) return;
        answered = true; // lock after first click
        if (option === question.answer) {
          score++;
        }
        // console.log(score);
        nextBtn.classList.remove("hidden");
      });
      choicesList.appendChild(li);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });

  function showScore() {
    questionContainer.classList.add("hidden");
    nextBtn.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
  }

  restartBtn.addEventListener("click", () => {
    resultsContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });
});
