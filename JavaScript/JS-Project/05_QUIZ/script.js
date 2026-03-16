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
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      choices: [
        "William Shakespeare",
        "Charles Dickens",
        "Leo Tolstoy",
        "Mark Twain",
      ],
    },
    {
      question: "Which programming language runs in a web browser?",
      choices: ["Python", "Java", "C++", "JavaScript"],
    },
    {
      question: "What is the largest ocean on Earth?",
      choices: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
    },
    {
      question: "Which country is famous for the Great Wall?",
      choices: ["Japan", "China", "India", "Thailand"],
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", () => {});
});
