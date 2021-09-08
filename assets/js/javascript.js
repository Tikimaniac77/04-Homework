var timerCounter = document.getElementById('timer');
var questionsBox = document.querySelector('#questions-box');
var startBtn = document.querySelector('button');
var endForm = document.getElementById('end-form');


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
        var questionAnswer = document.createElement("button");
        questionAnswer.addEventListener('click', function(){ 
            if(questionDisplay.correctAnswer){
                scoreCounter++;
                console.log(scoreCounter);
                localStorage.setItem('Score', scoreCounter);
            } else{
                timeRemaining-=10;
            }

            if(questionIndex < questions.length){
                startQuiz();
            }else{
                endQuiz();
            }
            
        } )

        questionAnswer.textContent = questionDisplay.answers[i];
        questionsBox.appendChild(questionAnswer);
        
    }
    
questionIndex++;
    if(timeRemaining <= 0 || questionIndex > questions.length){
        timeRemaining = 100;
        endQuiz();
    }

    
    
}

var gameScore = document.getElementById('gameScore');
var saveScoreBtn = document.getElementById('save-score');
var userName = document.getElementById('firstName');
var newScores = document.getElementById('#top-scores');


function endQuiz(){
    endForm.style.display = "block";
    questionsBox.style.display = "none";
    timerCounter="0";
    gameScore.innerHTML = "Score: " + scoreCounter;

}

function score(){
    localStorage.setItem('Score', scoreCounter);
    console.log(scoreCounter);
}
score();

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



saveScoreBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    var userScore = {
        user: userName.value,
        userScore: scoreCounter,
    };

    localStorage.setItem("userScore", JSON.stringify(userScore));
    console.log(scoreCounter);
    postScore();

});

var topScores = [];

function postScore() {
    //newScores.innerHTML = "";
    var storedString = JSON.parse(localStorage.getItem("userScore"));
    var newScore = document.createElement('li');
    newScore.textContent = storedString;
    //newScores.appendChild(newScore);

}


startBtn.addEventListener('click', timer);
startBtn.addEventListener('click', startQuiz);
