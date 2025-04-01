const correctButtonNumber = 1;
const nextScenePage = 'scene4.html';

function checkAnswer(selectedButtonNumber) {
  if (selectedButtonNumber === correctButtonNumber) {
    saveLives();
    window.location.href = nextScenePage;
  } else {
    const isAlive = decreaseLife();
    if (isAlive) {
      showPopup();
    }
  }
}

function showPopup() {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const overlay = document.getElementById('popup-overlay');
    let countdown = 3;

    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');
    popupText.textContent = `틀렸습니다! 다시 시도하세요 (${countdown})`;

    const interval = setInterval(() => {
        countdown--;
        popupText.textContent = `틀렸습니다! 다시 시도하세요 (${countdown})`;

        if (countdown === 0) {  
        clearInterval(interval);
        popup.classList.add('hidden');
        overlay.classList.add('hidden');

        updateHearts();
        }
    }, 1000);
}

function showTooltip(e, text) {
  const tooltip = document.getElementById('tooltip');
  tooltip.textContent = text;
  tooltip.style.left = e.clientX + 15 + 'px';
  tooltip.style.top = e.clientY + 15 + 'px';
  tooltip.classList.remove('hidden');
}

function hideTooltip() {
  document.getElementById('tooltip').classList.add('hidden');
}
