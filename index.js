let words = '';
let currentWordIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let startTime;
let timer;
let startcount = 5;
let besttime = 'oops. you dont play this game!?!?';
let playtimecount = 0;
let playmode = '';
let timeoutDuration = 10000; // 10 seconds

function startbuttontimer() {
  document.getElementById('start-button').style.display = 'none';
  if (startcount > 0) {
    document.getElementById('startbuttoncount').innerText = startcount;
    setTimeout(startcountminus, 1000);
  }
  if (startcount === 0) {
    document.getElementById('startbuttoncount').innerText = startcount;
    startcount = 5;
    startGame();
  }
}

function startcountminus() {
  startcount--;
  startbuttontimer();
}

function startGame() {
  getAllSettings();
  currentWordIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  startTime = new Date();
  totalTime = 0; // ゲームが始まるときにtotalTimeを初期化
  renderWord();
  document.getElementById('input-word').value = '';
  document.getElementById('input-word').disabled = false;
  document.getElementById('input-word').focus();
  document.getElementById('result').innerText = '';
  document.getElementById('timeout-message').innerText = '';
  document.getElementById('stats').innerText = '';
  document.getElementById('startbuttoncount').innerText = '';
  document.getElementById('besttime').innerText = 'oops. you dont play this game!?!?';
  document.getElementById('besttimeupdate').style.display = 'none'
  startTimer();
  startlefttimecount();
}

function getAllSettings() {
  getMode();
  changeMode();
}

function getMode() {
  const getModeconst = parseInt(localStorage.getItem('modeOption'));
  if (getModeconst === 10) {
    playmode = 10;
  }
  if (getModeconst === 50) {
    playmode = 50;
  }
  if (getModeconst === 100) {
    playmode = 100;
  }
  if (isNaN(getModeconst) || getModeconst === '') {
    playmode = 10;
  }
}

function changeMode() {
  if (playmode === 10) {
    words = ["japan", "unitedstates", "unitedkingdom", "china", "france", "canada", "germany", "russia", "spain", "greece"];
  }
  if (playmode === 50) {
    words = [
      "japan", "unitedstates", "unitedkingdom", "china", "france", "canada", "germany", "russia", "spain", "greece",
      "australia", "brazil", "india", "italy", "mexico", "southafrica", "southkorea", "turkey", "egypt", "argentina",
      "netherlands", "belgium", "sweden", "portugal", "switzerland", "indonesia", "thailand", "vietnam", "philippines", "malaysia",
      "singapore", "newzealand", "pakistan", "afghanistan", "iran", "iraq", "syria", "lebanon", "jordan", "israel",
      "australia", "nigeria", "thailand", "kenya", "cuba", "indonesia", "singapore", "maldives", "uruguay", "fiji"
    ];
  }
  if (playmode === 100) {
    words = [
      // 既存の国名
      "japan", "unitedstates", "unitedkingdom", "china", "france", "canada", "germany", "russia", "spain", "greece",
      "australia", "brazil", "india", "italy", "mexico", "southafrica", "southkorea", "turkey", "egypt", "argentina",
      "netherlands", "belgium", "sweden", "portugal", "switzerland", "indonesia", "thailand", "vietnam", "philippines", "malaysia",
      "singapore", "newzealand", "pakistan", "afghanistan", "iran", "iraq", "syria", "lebanon", "jordan", "israel",
      "palestine", "morocco", "algeria", "tunisia", "libya", "nigeria", "ethiopia", "kenya", "uganda", "congo",
      "denmark", "norway", "finland", "ireland", "poland", "czechrepublic", "hungary", "austria", "sweden", "norway",
      "finland", "ireland", "poland", "czechrepublic", "hungary", "austria", "switzerland", "portugal", "greece", "bulgaria",
      "romania", "serbia", "croatia", "slovenia", "bosnia", "montenegro", "macedonia", "kosovo", "albania", "cyprus",
      "estonia", "latvia", "lithuania", "belarus", "ukraine", "moldova", "georgia", "armenia", "azerbaijan", "kazakhstan",
      // 追加したランダムな国名
      "australia", "nigeria", "thailand", "kenya", "cuba", "indonesia", "singapore", "maldives", "uruguay", "fiji"
    ];
  }
}

function renderWord() {
  const wordContainer = document.getElementById('word-container');
  if (currentWordIndex < words.length) {
    wordContainer.innerText = words[currentWordIndex];
  } else {
    wordContainer.innerText = "Game Clear!";
    document.getElementById('input-word').disabled = true;
    stopTimer();
    showStats();
  }
}

function checkInput() {
  const inputElement = document.getElementById('input-word');
  const inputText = inputElement.value.trim();

  if (inputText === words[currentWordIndex]) {
    correctCount++;
  } else {
    wrongCount++;
  }

  currentWordIndex++;

  if (currentWordIndex < words.length) {
    renderWord();
    inputElement.value = '';
  }
}

function startTimer() {
  timer = setTimeout(function () {
    document.getElementById('timeout-message').innerText = "Press Enter To Confirm Text.";
  }, timeoutDuration);
}

function stopTimer() {
  clearTimeout(timer);
  document.getElementById('timeout-message').innerText = '';
}

function showStats() {
  const endTime = new Date();
  const totalTime = (endTime - startTime) / 1000;
  playtimecount++;
  document.getElementById('result').innerText = `Game Finish! Your time: ${totalTime.toFixed(2)} seconds`;
  document.getElementById('stats').innerText = `Correct: ${correctCount} | Wrong: ${wrongCount}`;
  document.getElementById('start-button').style.display = '';
  checkfirstplay(totalTime);
}

function checkfirstplay(totalTime) {
  if (playtimecount === 1) {
    besttime = totalTime.toFixed(2);
    document.getElementById('besttime').innerText = `Your Best Time is ${besttime} seconds`;
  } else {
    besttimeResult(totalTime);
  }
}

function besttimeResult(totalTime) {
  if (totalTime < besttime) {
    besttime = totalTime.toFixed(2);
    document.getElementById('besttime').innerText = `Your Best Time is ${besttime} seconds`;
    document.getElementById('besttimeupdate').style.display = ''
    document.getElementById('besttimeupdate').innerText = 'You have updated your personal best!'
  } else {
    besttimeempty();
  }
}

function besttimeempty() {
  document.getElementById('besttime').innerText = `Your Best Time is ${besttime} seconds`;
}

document.getElementById('input-word').addEventListener('input', function () {
  stopTimer();
  startTimer();
});

document.getElementById('input-word').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    checkInput();
  }
});

document.getElementById('start-button').addEventListener('click', function () {
  startbuttontimer();
});

document.getElementById('changelog-button').addEventListener('click', function () {
  window.location.href = 'changelog.html';
});

document.getElementById('setting-button').addEventListener('click', function () {
  window.location.href = 'settings.html';
});
