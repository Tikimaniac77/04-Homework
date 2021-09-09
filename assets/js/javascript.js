var timerCounter = document.getElementById('timer');
var questionsBox = document.querySelector('#questions-box');
var startBtn = document.querySelector('button');
var endForm = document.getElementById('end-form');
var userScores = [];


//array of objects with questions and answers
var questions = [
    {
        question: "Question One",
        answers: ["one", "two", "three", "four"],
        correctAnswer: "one",
    },
    {
        question: "Question Two",
        answers: ["one", "two", "three", "four"],
        correctAnswer: "two",
    },
    {
        question: "Question Three",
        answers: ["one", "two", "three", "four"],
        correctAnswer: "three",
    },
    {
        question: "Question Four",
        answers: ["one", "two", "three", "four"],
        correctAnswer: "four",
    },
];

//Starting with first question, Start quiz button will cycle through questions

var questionIndex = 0;
var scoreCounter = 0;

function startQuiz () {
    questionsBox.innerHTML = "";
    var questionDisplay = questions[questionIndex];
    var questionTitle = document.createElement("h1");
    questionTitle.textContent = questionDisplay.question;
    questionsBox.appendChild(questionTitle);
    //removes start quiz button
    startBtn.style.display = 'block';
    startBtn.style.display = 'none'
    //loops through questions and checks clicks for answers
    for (var i = 0; i < questionDisplay.answers.length; i++) {
        var questionAnswers = document.createElement("button");
        // uses event.target.text content to listen for specific button clicks.
        questionAnswers.addEventListener('click', function(event){
            console.log(event.target.textContent);
            //if statements compares correct answer with event target answer.
            if(questionDisplay.correctAnswer === event.target.textContent){
                scoreCounter++;
                //console.log(scoreCounter);
                localStorage.setItem('Score', scoreCounter);
            } else {
                timeRemaining-=10;
            }

            if(questionIndex < questions.length){
                startQuiz();
            }else{
                endQuiz();
            }
            console.log(questionDisplay.correctAnswer);
        } )

        questionAnswers.textContent = questionDisplay.answers[i];
        questionsBox.appendChild(questionAnswers);
        
    }
    
questionIndex++;
    if(timeRemaining <= 0 || questionIndex > questions.length){
        timeRemaining = 100;
        endQuiz();
    }

    
    
}

var gameScore = document.getElementById('gameScore');




function endQuiz(){
    endForm.style.display = "block";
    questionsBox.style.display = "none";
    timerCounter="0";
    gameScore.innerHTML = "Score: " + scoreCounter;

    
}

//timer function runs upon user pressing start quiz button
var timeRemaining = 100;
function timer() {
    
    var timeAmount = setInterval(function() {
        timerCounter.textContent = 'Time Left: ' + timeRemaining + ' seconds';
        timeRemaining--;            
        if (timeRemaining < 0) {
            clearInterval(timeAmount);
        }
               
    }, 1000);
}

var saveScoreBtn = document.getElementById('save-score');
var userName = document.getElementById('firstName');

saveScoreBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    var userScore = {
        user: userName.value,
        userScore: scoreCounter,
    };
    scoreCounter = 0;
    userScores.push(userScore);
    localStorage.setItem("userScores", JSON.stringify(userScores));
    console.log(scoreCounter);

    postScore();

});



function postScore() {
    var topScoresList = JSON.parse(localStorage.getItem("userScores"));
    console.log(topScoresList);
    for (var i = 0; i < topScoresList.length; i++){
        
     //extract information: both user & user score properties and place both in list item
        var newScore = document.createElement('li');
        newScore.textContent = //storedString;  THIS IS NOT a thing anymore need to replace.
        
        document.getElementById("top-scores").appendChild(newScore);
    }
}


startBtn.addEventListener('click', timer);
startBtn.addEventListener('click', startQuiz);
