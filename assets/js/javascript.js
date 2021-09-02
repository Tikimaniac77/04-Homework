var timerCounter = document.getElementById('timer');
var startBtn = document.getElementById('startButton');

//timer function runs upon user pressing start quiz button

function timer() {
    var timeRemaining = 100;
    var timeAmount = setInterval(function() {
        timerCounter.textContent = 'Time Left: ' + timeRemaining + ' seconds';
        timeRemaining--;            
        if (timeRemaining < 0) {
            clearInterval(timeAmount);
        }
               
    }, 1000);
}

startBtn.addEventListener('click', timer)