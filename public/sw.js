self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Default body',
    icon: 'icon.png',
    badge: 'badge.png',
    requireInteraction: true, // Notifikasi tetap terlihat sampai ditutup manual
    vibrate: [200, 100, 200] // Pola getaran
  };

  event.waitUntil(self.registration.showNotification(data.title || 'Default title', options));
});
