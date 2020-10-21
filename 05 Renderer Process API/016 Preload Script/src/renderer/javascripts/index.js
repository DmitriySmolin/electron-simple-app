require('application.css');

window.onload = () => {
  const button = document.getElementById('action');
  button.addEventListener('click', () => {
    window.openURL('https://github.com');
  });
};
