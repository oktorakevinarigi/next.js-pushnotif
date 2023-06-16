export async function getFCMToken() {
  if (!("Notification" in window)) {
    return {
      data: null,
      error: "Browser tidak mendukung Notification." as const,
    };
  } else if (Notification.permission === "granted") {
    return await retrieveFCMToken();
  } else if (Notification.permission === "default") {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        return await retrieveFCMToken();
      }
      return {
        data: null,
        error:
          "Terjadi kesalahan saat mengaktifkan Notification. Notification tidak mendapatkan izin dari browser." as const,
      };
    } catch {
      return {
        data: null,
        error: "Terjadi kesalahan saat mengaktifkan Notification." as const,
      };
    }
  }
}

export async function retrieveFCMToken() {
  let app;
  const { initializeApp, getApps } = await import("firebase/app");
  const { getMessaging, getToken } = await import("firebase/messaging");

  if (getApps().length === 0) {
    const clientCredentials = {
      apiKey: "AIzaSyBBJ6AUuGfIawmlVw7bSdfONw0JHSmNBZo",
      authDomain: "explore-b5f5e.firebaseapp.com",
      databaseURL: 'https://explore-b5f5e-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: "explore-b5f5e",
      storageBucket: "explore-b5f5e.appspot.com",
      messagingSenderId: "226667732266",
      appId: "1:226667732266:web:11d618f97dc1084ce5d253",
      measurementId: "G-PRCHLFSJX5"
    };
    app = initializeApp(clientCredentials);
  }
  const messaging = getMessaging(app);
  try {
    const fcmToken = await getToken(messaging, { vapidKey: "BGtsO0ymr4_euIUdcjcuTE3uGylm2EZfRbz81YECf0ftJDLaGM8ChFfX4cHDC3xd_ejxlUe__duISXf-UTXBIj8" });
    return {
      data: fcmToken,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Terjadi kesalahan saat mengaktifkan Notification." as const,
    };
  }
}
