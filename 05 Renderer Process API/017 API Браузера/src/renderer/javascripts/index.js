require('application.css');

window.onload = () => {
  window.addEventListener('online', () => {
    document.getElementById('online').textContent = 'You are online';
    document.getElementById('offline').textContent = null;
    const alert = new Notification('My App', {
      body: 'You are online',
      silent: true,
    });
  });

  window.addEventListener('offline', () => {
    document.getElementById('offline').textContent = 'You are offline';
    document.getElementById('online').textContent = null;
    const alert = new Notification('My App', {
      body: 'You are offline',
      silent: true,
    });
  });
};
