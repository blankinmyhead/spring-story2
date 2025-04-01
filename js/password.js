const correctPassword = "1234";
const nextPageURL = "game-start.html";
const images = document.querySelectorAll('#imageContainer img');
const container = document.getElementById('imageContainer');
const passwordContainer = document.querySelector('.password-container');

const minSize = 200; // 최소 이미지 크기
const maxSize = 300; // 최대 이미지 크기
const minDistance = 20; // 이미지 간 최소 여유 공간
const maxAttempts = 300; // 배치 시도 최대 횟수

let placedImages = []; // 배치된 이미지들의 정보 {left, top, right, bottom}

/**
 * 두 사각형이 겹치는지 검사
 * rect1, rect2: {left, top, right, bottom}
 */
function isOverlap(rect1, rect2) {
    return !(rect1.right <= rect2.left ||
             rect1.left >= rect2.right ||
             rect1.bottom <= rect2.top ||
             rect1.top >= rect2.bottom);
}

/**
 * 새로운 이미지의 사각형을 계산 (여유공간 포함)
 */
function getImageRect(x, y, size, margin = 0) {
    return {
        left: x - margin,
        top: y - margin,
        right: x + size + margin,
        bottom: y + size + margin,
    };
}

/**
 * 기존 배치된 이미지들과의 겹침 여부 검사 (minDistance 포함)
 */
function checkOverlap(newX, newY, newSize) {
    const newRect = getImageRect(newX, newY, newSize, minDistance);
    for (const placed of placedImages) {
        if (isOverlap(newRect, placed)) {
            return true;
        }
    }
    return false;
}

/**
 * 비밀번호 입력창과 겹치는지 검사
 */
function checkPasswordContainerOverlap(newX, newY, newSize) {
    // 새로운 이미지의 사각형 (여유 없음)
    const newRect = getImageRect(newX, newY, newSize);
    
    // container 내에서의 비밀번호 영역 (계산)
    const containerRect = container.getBoundingClientRect();
    const pwRect = passwordContainer.getBoundingClientRect();
    
    const pwRelative = {
        left: pwRect.left - containerRect.left,
        top: pwRect.top - containerRect.top,
        right: pwRect.right - containerRect.left,
        bottom: pwRect.bottom - containerRect.top,
    };
    
    return isOverlap(newRect, pwRelative);
}

function checkPassword() {
    const inputPassword = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    if (inputPassword === correctPassword) {
        window.location.href = nextPageURL;
    } else {
        messageDiv.textContent = "비밀번호가 틀렸습니다.";
        messageDiv.style.color = "red";
    }
}

function placeImages() {
    placedImages = []; // 초기화
    
    images.forEach(img => {
        let placed = false;
        let attempts = 0;
        let randomSize, randomX, randomY;
        
        while (!placed && attempts < maxAttempts) {
            randomSize = Math.random() * (maxSize - minSize) + minSize;
            randomX = Math.random() * (container.offsetWidth - randomSize);
            randomY = Math.random() * (container.offsetHeight - randomSize);
            
            if (!checkOverlap(randomX, randomY, randomSize) &&
                !checkPasswordContainerOverlap(randomX, randomY, randomSize)) {
                // 배치 성공 시, 해당 이미지의 사각형 정보를 저장
                const placedRect = getImageRect(randomX, randomY, randomSize);
                placedImages.push(placedRect);
                
                img.style.left = `${randomX}px`;
                img.style.top = `${randomY}px`;
                img.style.width = `${randomSize}px`;
                img.style.height = `${randomSize}px`;
                // 배치가 성공하면 이미지를 보이도록 변경
                img.style.display = 'block';
                placed = true;
            }
            attempts++;
        }
        if (!placed) {
            // 배치에 실패한 경우 이미지 숨김
            img.style.display = 'none';
            console.warn(`이미지 배치 실패 (겹침 방지): ${img.id}`);
        }
    });
}

// 페이지 로드 시 이미지 배치 실행
window.onload = placeImages;
