import { useEffect, useCallback } from "react";
import { getFCMToken } from "@/libs/firebase-cloud-messaging";

export function FirebaseCloudMessaging() {
  const updateFCMToken = useCallback(async () => {
    const result = await getFCMToken();
    console.log(result)
    if (result?.data) {
      const { getMessaging, onMessage } = await import("firebase/messaging");
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        if (payload.data?.body) {
          console.log({
            id: payload.messageId,
            title: payload.data.title,
            message: payload.data.body,
          })
        }
      });
    }
  }, []);

  useEffect(() => {
    updateFCMToken();
  }, [updateFCMToken]);

  return null;
}
