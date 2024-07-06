const goHomeBtn = document.getElementById('start-over');

const goHome = (e) => {
  e.preventDefault();
  window.location.href = '/';
};

goBackBtn.addEventListener('click', goHome);
