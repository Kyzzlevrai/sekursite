let timer
let remainingTime = 0;
let isPaused = false;
const alarmSound = document.getElementById("alarmSound");


document.addEventListener("DOMContentLoaded", ( )=>{
    console.log("You found an easter Egg ! Well done");
})

function resetbuttons() {
    document.getElementById("stopButton").disabled = true;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("launchButton").disabled = false;
    document.getElementById("minsmoreButton").disabled = true;
    document.getElementById("minslessButton").disabled = true;
}

function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (!isPaused) {
        remainingTime = (hours * 3600 + minutes * 60 + seconds);
    }

    if (remainingTime <= 0) return;

    clearInterval(timer);
    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            document.getElementById("display").textContent = "00:00:00";
            alarmSound.play();
            resetbuttons();
            return;
        }

        remainingTime--;

        const h = Math.floor(remainingTime / 3600);
        const m = Math.floor((remainingTime % 3600) / 60);
        const s = remainingTime % 60;

        document.getElementById("display").textContent =
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
    isPaused = false
    document.getElementById("pauseButton").disabled = false;
    document.getElementById("stopButton").disabled = false;
    document.getElementById("launchButton").disabled = true;
    document.getElementById("minsmoreButton").disabled = false;
    document.getElementById("minslessButton").disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    isPaused = true;
    document.getElementById("pauseButton").disabled = true;
    document.getElementById("launchButton").disabled = false;
    document.getElementById("minslessButton").disabled = true;
    document.getElementById("minsmoreButton").disabled = true;
}

function addTimer() {
    remainingTime = remainingTime + 600;
}

function removeTimer() {
    remainingTime = remainingTime - 600;
}



function resetTimer() {
    clearInterval(timer);
    remainingTime = 0;
    isPaused = false;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("stopButton").disabled = true;
    document.getElementById("launchButton").disabled = false;
    document.getElementById("minsmoreButton").disabled = true;
    document.getElementById("minslessButton").disabled = true;
}
