// START PAGE FUNCTION
function startQuiz(level) {

    let name = document.getElementById("username").value;

    if (name === "") {
        alert("Enter your name");
        return;
    }

    localStorage.setItem("username", name);
    localStorage.setItem("level", level);

    window.location.href = "quiz.html";
}


// RUN ONLY ON QUIZ PAGE
if (window.location.pathname.includes("quiz.html")) {

    let username = localStorage.getItem("username");
    let level = localStorage.getItem("level");

    document.getElementById("welcome").innerText = "Hello, " + username;

    let questions = {
        easy: [
            {q:"HTML ka full form?",o:["Hyper Text Markup Language","High Text","None","Tool"],a:"Hyper Text Markup Language"},
            {q:"CSS ka use?",o:["Styling","Logic","DB","Server"],a:"Styling"},
            {q:"JS kya hai?",o:["Language","DB","OS","Tool"],a:"Language"},
            {q:"Image tag?",o:["<img>","<pic>","<image>","<src>"],a:"<img>"},
            {q:"Link tag?",o:["<a>","<link>","<url>","<href>"],a:"<a>"},
            {q:"Background property?",o:["background-color","color","bg","style"],a:"background-color"},
            {q:"Variable keyword?",o:["let","int","varies","define"],a:"let"},
            {q:"JS comment?",o:["//","#","<!--","**"],a:"//"},
            {q:"HTML extension?",o:[".html",".js",".css",".txt"],a:".html"},
            {q:"CSS stands for?",o:["Cascading Style Sheets","Creative","Color","None"],a:"Cascading Style Sheets"}
        ],

        medium: [
            {q:"console output?",o:["console.log()","print()","echo()","write()"],a:"console.log()"},
            {q:"DOM means?",o:["Document Object Model","Data","Design","None"],a:"Document Object Model"},
            {q:"Event example?",o:["onclick","onrun","onstart","none"],a:"onclick"},
            {q:"Array syntax?",o:["[]","{}","()","<>"],a:"[]"},
            {q:"Loop?",o:["for","loop","repeat","cycle"],a:"for"},
            {q:"Padding?",o:["Inside space","Outside","Border","None"],a:"Inside space"},
            {q:"Flexbox use?",o:["Layout","DB","Logic","API"],a:"Layout"},
            {q:"Display block?",o:["Full width","Inline","None","Hide"],a:"Full width"},
            {q:"Function keyword?",o:["function","func","define","method"],a:"function"},
            {q:"ID selector?",o:["#","#id",".class","*"],a:"#"}
        ],

        hard: [
            {q:"== vs === ?",o:["Value vs Type","Same","Error","None"],a:"Value vs Type"},
            {q:"NaN?",o:["Not a Number","New","Null","None"],a:"Not a Number"},
            {q:"setTimeout?",o:["Async","Sync","Loop","None"],a:"Async"},
            {q:"Primitive?",o:["String","Array","Object","Function"],a:"String"},
            {q:"push()?",o:["Add element","Remove","Sort","None"],a:"Add element"},
            {q:"LocalStorage?",o:["Key-value","Array","Object","None"],a:"Key-value"},
            {q:"JS runs?",o:["Browser","DB","OS","None"],a:"Browser"},
            {q:"Flex default?",o:["row","column","grid","none"],a:"row"},
            {q:"Absolute position?",o:["Parent","Screen","Body","None"],a:"Parent"},
            {q:"Framework?",o:["React","Laravel","None","Both"],a:"React"}
        ]
    };

    let qList = questions[level];

    // Shuffle questions
    qList.sort(() => Math.random() - 0.5);

    let index = 0;
    let score = 0;
    let timer;
    let time = 10;
    let answered = false;

    function loadQuestion() {

        answered = false;

        let q = qList[index];
        document.getElementById("question").innerText = q.q;

        let optionsHTML = "";

        q.o.forEach(opt => {
            optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
        });

        document.getElementById("options").innerHTML = optionsHTML;

        startTimer();
    }

    function startTimer() {

        time = 10;
        document.getElementById("timer").innerText = "Time: " + time;

        timer = setInterval(() => {
            time--;
            document.getElementById("timer").innerText = "Time: " + time;

            if (time === 0) {
                clearInterval(timer);
                answered = true;
            }
        }, 1000);
    }

    window.checkAnswer = function(answer) {

        if (answered) return;

        answered = true;
        clearInterval(timer);

        let correct = qList[index].a;

        let buttons = document.querySelectorAll("#options button");

        buttons.forEach(btn => {
            if (btn.innerText === correct) {
                btn.classList.add("correct");
            } else {
                btn.classList.add("wrong");
            }
        });

        if (answer === correct) {
            score++;
        }
    };

    document.getElementById("nextBtn").onclick = function () {

        index++;

        if (index < qList.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };

    function showResult() {

        saveScore();

        document.querySelector(".quiz-box").innerHTML =
            `<h2>Final Score: ${score}</h2>
             <button onclick="location.reload()">Restart</button>`;
    }

    function saveScore() {

        let data = JSON.parse(localStorage.getItem("scores")) || [];

        data.push({ name: username, score: score });

        localStorage.setItem("scores", JSON.stringify(data));

        showLeaderboard();
    }

    function showLeaderboard() {

        let data = JSON.parse(localStorage.getItem("scores")) || [];

        data.sort((a, b) => b.score - a.score);

        let list = document.getElementById("leaderboardList");
        list.innerHTML = "";

        data.forEach(item => {
            let li = document.createElement("li");
            li.innerText = item.name + " - " + item.score;
            list.appendChild(li);
        });
    }

    loadQuestion();
    showLeaderboard();
}
