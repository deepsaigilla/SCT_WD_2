let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let startTime;

function startPause() {
  const startPauseBtn = document.getElementById('startPauseBtn');
  
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); 
    startPauseBtn.textContent = 'Pause';
  }
  
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById('display').textContent = formatTime(elapsedTime);
  document.getElementById('startPauseBtn').textContent = 'Start';
  document.getElementById('lapList').innerHTML = '';
  lapCount = 0;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const hundredths = Math.floor((milliseconds % 1000) / 10); 

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(hundredths)}`;
}

function pad(num, size = 2) {
  return num.toString().padStart(size, '0');
}

function recordLap() {
  if (!isRunning) return;
  
  lapCount++;
  const lapList = document.getElementById('lapList');
  const lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
  lapList.appendChild(lapTime);
}

function clearLaps() {
  document.getElementById('lapList').innerHTML = '';
}
