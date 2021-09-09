var timerCounter = document.getElementById('timer');
var questionsBox = document.querySelector('#questions-box');
var startBtn = document.getElementById('startQuiz');
var endForm = document.getElementById('end-form');
var userScores = [];
var playAgain = document.getElementById('playAgain');

//array of objects with questions and answers
var questions = [
    {
        question: "Which of the following is the correct syntax to redirect a url using JavaScript?",
        answers: ["window.location='http://www.newlocation.com';", 
                    "document.location='http://www.newlocation.com';",
                    "browser.location='http://www.newlocation.com';",
                    "navigator.location='http://www.newlocation.com';"],
        correctAnswer: "window.location='http://www.newlocation.com';",
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers: ["last()", "push()", "put()", "None of the above."],
        correctAnswer: "push()",
    },
    {
        question: "Which built-in method reverses the order of the elements of an array?",
        answers: ["changeOrder(order)", "sort(order)", "reverse()", "None of the above."],
        correctAnswer: "reverse()",
    },
    {
        question: "Which of the following function of Array object joins all elements of an array into a string?",
        answers: ["concat()", "pop()", "map()", "join()"],
        correctAnswer: "join()",
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
    console.log(userScore);

    postScore();

});



function postScore() {
    var topScoresList = JSON.parse(localStorage.getItem("userScores"));
    console.log(topScoresList);

    for (var i = 0; i < topScoresList.length; i++){
        
     //extract information: both user & user score properties and place both in list item
        const extractArray = topScoresList;
        const [first] = extractArray;
        console.log(first);

        const extractObjects = first;
        const {user, userScore} = extractObjects;
        console.log(user, userScore);

        var newScore = document.createElement('li');
        newScore.textContent = user + " : " + userScore;
        document.getElementById("top-scores").appendChild(newScore);
        
    }
}

function replay(event){
    event.preventDefault();
    location.reload();
    postScore();
}

startBtn.addEventListener('click', timer);
startBtn.addEventListener('click', startQuiz);
playAgain.addEventListener('click', replay);

postScore();