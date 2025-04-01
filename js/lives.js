let lives = localStorage.getItem('lives') ? parseInt(localStorage.getItem('lives')) : 3;
const heartContainer = document.getElementById('heart-container');
const grayHeartImage = 'img/DH.png';
const pinkHeartImage = 'img/RH.png';
const gameOverPage = 'game-over.html';

function saveLives() {
    localStorage.setItem('lives', lives);
}

function initializeHearts() {
    if (!heartContainer) return;

    heartContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const img = document.createElement('img');
        img.id = `heart${i + 1}`;
        img.src = i < 3 - lives ? grayHeartImage : pinkHeartImage;
        img.alt = `목숨${i + 1}`;
        img.classList.add('heart-img'); 
        heartContainer.appendChild(img);
    }
}

function decreaseLife() {
    lives--;
    saveLives();
    updateHearts();
    if (lives <= 0) {
        localStorage.removeItem('lives'); // 게임 오버 시 저장 초기화
        window.location.href = gameOverPage;
    }
    return lives > 0;
}

function updateHearts() {
    for (let i = 0; i < 3; i++) {
        const heart = document.getElementById(`heart${i + 1}`);
        if (heart) {
            const wasPink = heart.src.includes(pinkHeartImage);
            const shouldBeGray = i < 3 - lives;

            if (wasPink && shouldBeGray) {
                heart.src = grayHeartImage;

                heart.classList.add('heart-shake', 'heart-blink');

                setTimeout(() => {
                    heart.classList.remove('heart-shake', 'heart-blink');
                }, 600);
            } else if (!shouldBeGray) {
                heart.src = pinkHeartImage;
            }
        }
    }
}

// 페이지 로딩 시 초기화
window.addEventListener('DOMContentLoaded', initializeHearts);
