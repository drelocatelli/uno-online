class NotificationDOM {
    static setNotification(text) {
        notificationBar.style.opacity = 1;
        notificationBar.style.pointerEvents = 'all';
        notificationBar.innerHTML = text;
        setTimeout(() => {
            notificationBar.style.pointerEvents = 'none';
            notificationBar.style.opacity = 0;
        }, 5000);
    }
}