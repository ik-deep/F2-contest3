const runningTimers = document.getElementById('runningTimers');
const timerDisplayElement = document.getElementsByClassName("noTimers");
// Display the initial "You have no timers currently!" text
noTimersText();

const startTimerButton = document.getElementsByClassName('setTimerButton');
// Initialize a flag to track whether a timer is currently active
let isTimerActive = false;

// Add a click event listener to the 'Start New Timer' button
startTimerButton[0].addEventListener('click', () => {
    // Parse the input values for hours, minutes, and seconds
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Calculate the total time in seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        // Create a new timer with the specified total seconds
        createTimer(totalSeconds);
        // Set the flag to indicate an active timer
        isTimerActive = true;
        // Remove the "You have no timers currently!" text if it exists
        deleteNoTimersText();
    } else {
        alert("Please enter a valid time.");
    }
});

// Function to format time in HH:MM:SS format
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
     return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
}
// Function to create a new timer with the specified total seconds
function createTimer(totalSeconds) {
    // Create a container for the timer
    const timerContainer = document.createElement("div");
    timerContainer.className="setTimer";

    // // Create an element to display "Time Left"
    const timeLeftElement = document.createElement('label');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left:';

    // // Create an element to display the timer value
    const timerDisplayElement = document.createElement('div');
    timerDisplayElement.classList.add('inputTimer');

    // // Create a container for timer control buttons
    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');

    // Create the 'Stop Timer' button
    const stopButton = document.createElement('button');
    stopButton.className='setTimerButton';
    stopButton.textContent = 'Stop';

    // Create the 'Delete' button
    const deleteButton = document.createElement('button');
    deleteButton.className='set-delete-Button';
    deleteButton.textContent = 'Delete';
    deleteButton.style.display = 'none'; // Initially, hide the delete button

    let timerInterval;
    // Function to update the timer display
    function updateTimerDisplay() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerDisplayElement.classList.add('timer-ended');
            timerDisplayElement.textContent = "Time is up!";
            timerContainer.style.backgroundColor= "#F0F757";
            stopButton.style.display = 'none';
            deleteButton.style.display = 'block';
            timeLeftElement.style.opacity= 0;
            // Play an audio alert when Time is up!
            playAudioAlert();
        } else {
            timerDisplayElement.innerText=formatTime(totalSeconds);
        }
    }

    // Add a click event listener to the 'Stop Timer' button
    stopButton.addEventListener('click', () => {
        // Stop the timer and remove the timer container
        clearInterval(timerInterval);
        timerContainer.remove();
        isTimerActive = false; // Reset the active timer flag
        // Check if there are no timers, then display "You have no timers currently!" text
        if (runningTimers.children.length === 0) {
            noTimersText();
        }
    });

    // Add a click event listener to the 'Delete' button
    deleteButton.addEventListener('click', () => {
        // Remove the timer container
        timerContainer.remove();
        // Check if there are no timers, then display "You have no timers currently!" text
        if (runningTimers.children.length === 0) {
            noTimersText();
        }
    });

    // Start the timer interval
    timerInterval = setInterval(updateTimerDisplay, 1000);

    // Append timer control elements to the timer container
    timerControls.appendChild(stopButton);
    timerControls.appendChild(deleteButton);

    // Append timer elements to the timer container
    timerContainer.appendChild(timeLeftElement);
    timerContainer.appendChild(timerDisplayElement);
    timerContainer.appendChild(timerControls);

    runningTimers.appendChild(timerContainer);
}


// Function to play an audio alert
function playAudioAlert() {
    const audio = new Audio('./temple-bell-2426.mp3');
    audio.play();
}

// Function to display "You have no timers currently!" text
function noTimersText() {
    timerDisplayElement[0].style.display='inline'
}
function deleteNoTimersText() {
    timerDisplayElement[0].style.display='none';
}
