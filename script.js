let timerDisplay = document.getElementById('timer');
let controlButton = document.getElementById('start'); 
let resetButton = document.getElementById('reset'); 
let customTimeInput = document.getElementById('custom-time');

let countdown;
let timeLeft;
let isRunning = false; 


function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function startTimer() {
    if (!isRunning) {
        
        if (timeLeft === undefined) {
            let customTime = parseInt(customTimeInput.value) || 25; 
            timeLeft = customTime * 60;
        }

        controlButton.textContent = "Pausar"; 
        controlButton.classList.add('pausar'); 
        isRunning = true;

        countdown = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(countdown);
                isRunning = false;
                controlButton.textContent = "Iniciar"; 
                controlButton.classList.remove('pausar'); 
                alert('Pomodoro terminado! Hora de descansar.');
            } else {
                timeLeft--;
                updateTimerDisplay();
            }
        }, 1000);
    } else {
        pauseTimer(); 
    }
}


function pauseTimer() {
    clearInterval(countdown); 
    controlButton.textContent = "Iniciar"; 
    controlButton.classList.remove('pausar'); 
    isRunning = false; 
}


function resetTimer() {
    clearInterval(countdown); 
    timeLeft = undefined; 
    isRunning = false; 
    controlButton.textContent = "Iniciar"; 
    controlButton.classList.remove('pausar'); 
    customTimeInput.disabled = false; 
    updateTimerDisplay(); 
    timerDisplay.textContent = `${String(customTimeInput.value).padStart(2, '0')}:00`; 
}


controlButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        customTimeInput.disabled = true; 
        startTimer();
    }
});


resetButton.addEventListener('click', resetTimer);




