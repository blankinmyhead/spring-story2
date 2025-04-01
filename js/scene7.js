document.onclick=function(){
    window.location.href="index.html"
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