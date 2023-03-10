class NotificationDOM {
    static setNotification(text) {
        const audio = Effects.newAudioInstance('draw.mp3');
        audio.volume = .4;
        audio.autoplay = true;
        notificationBar.style.opacity = 1;
        notificationBar.style.pointerEvents = 'all';
        notificationBar.innerHTML = text;
        setTimeout(() => {
            notificationBar.style.pointerEvents = 'none';
            notificationBar.style.opacity = 0;
        }, 5000);
    }
}