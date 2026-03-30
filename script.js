// QUESTIONS

let easy = [
    { q: "HTML ka full form?", o: ["Hyper Text", "Markup Language", "Hyper Text Markup Language", "None"], a: "Hyper Text Markup Language" },
    { q: "CSS ka use?", o: ["Styling", "Logic", "DB", "Server"], a: "Styling" }
];

let medium = [
    { q: "JS output?", o: ["console.log()", "print()", "echo()", "write()"], a: "console.log()" },
    { q: "DOM means?", o: ["Document Object Model", "Data Model", "None", "Object Data"], a: "Document Object Model" }
];

let hard = [
    { q: "== vs === ?", o: ["Same", "Value vs Type", "Error", "None"], a: "Value vs Type" },
    { q: "NaN means?", o: ["Not a Number", "New", "Null", "None"], a: "Not a Number" }
];


// VARIABLES

let questions = [];
let index = 0;
let score = 0;


// START QUIZ

function startQuiz(level) {

    document.getElementById("level-box").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";

    if (level === "easy") {
        questions = easy;
    } else if (level === "medium") {
        questions = medium;
    } else {
        questions = hard;
    }

    loadQuestion();
}


// LOAD QUESTION

function loadQuestion() {

    let q = questions[index];

    document.getElementById("question").innerText = q.q;

    let optionsHTML = "";

    for (let i = 0; i < q.o.length; i++) {

        optionsHTML += `
            <button onclick="checkAnswer('${q.o[i]}')">
                ${q.o[i]}
            </button>
        `;
    }

    document.getElementById("options").innerHTML = optionsHTML;
}


// CHECK ANSWER

function checkAnswer(ans) {

    if (ans === questions[index].a) {
        score++;
    }
}


// NEXT QUESTION

function nextQuestion() {

    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {

        document.getElementById("quiz-box").innerHTML = `
            <h2>Quiz Finished</h2>
            <h3>Your Score: ${score}</h3>
        `;
    }
}