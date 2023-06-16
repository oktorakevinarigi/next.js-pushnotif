/* eslint-disable no-undef */
importScripts(
    "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js"
  );
  
  self.onnotificationclick = (event) => {
    console.log("event.notification", event.notification)
    event.notification.close();
  
    if (event.notification?.data?.FCM_MSG?.data) {
      const url = `/test`;
      event.waitUntil(
        self.clients.matchAll({ type: "window" }).then((windowClients) => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            // If so, just focus it.
            if (client.url === url && "focus" in client) {
              return client.focus();
            }
          }
          // If not, then open the target URL in a new window/tab.
          if (self.clients.openWindow) {
            return self.clients.openWindow(url);
          }
        })
      );
    }
  };
  
  const firebaseConfig = {
    apiKey: "AIzaSyBBJ6AUuGfIawmlVw7bSdfONw0JHSmNBZo",
    authDomain: "explore-b5f5e.firebaseapp.com",
    databaseURL: 'https://explore-b5f5e-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: "explore-b5f5e",
    storageBucket: "explore-b5f5e.appspot.com",
    messagingSenderId: "226667732266",
    appId: "1:226667732266:web:11d618f97dc1084ce5d253",
    measurementId: "G-PRCHLFSJX5"
  };
  
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(messaging, (payload) => {
    if (!payload && !payload.data) {
      return;
    }
  
    const notificationTitle = payload.data.title || "Notif";
    const notificationOptions = {
      body: payload.data.body || "Body Notification",
      icon: payload.data.icon || "/favicon.ico",
      badge: payload.data.badge || "/favicon.ico",
      tag: payload.data.tag || "main",
      sound: payload.data.sound || "default",
      data: payload.data,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  