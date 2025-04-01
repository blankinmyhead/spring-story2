const correctButtonNumber = 3;
const nextScenePage = 'scene5.html';

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

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  let left = e.clientX + 20;
  let top = e.clientY + 20;

  if (left + tooltipWidth > window.innerWidth) {
    left = e.clientX - tooltipWidth - 20;
  }
  if (top + tooltipHeight > window.innerHeight) {
    top = e.clientY - tooltipHeight - 20;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.classList.remove('hidden');
}

function hideTooltip() {
  document.getElementById('tooltip').classList.add('hidden');
}
