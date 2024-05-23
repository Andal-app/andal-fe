export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Akses notifikasi ditolak. Anda tidak akan mendapatkan notifikasi terbaru mengenai keberadaan anak');
    }
  }
};
