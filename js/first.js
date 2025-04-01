function checkPassword() {
  const password = document.getElementById('password').value;
  if (password === 'qmffkTja') {
    window.location.href = 'game-start.html'; // 다음 페이지로 이동
  } else {
    alert('암호가 틀렸습니다.');
  }
}