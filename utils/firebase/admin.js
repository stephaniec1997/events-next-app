// admin setup src: https://colinhacks.com/essays/nextjs-firebase-authentication
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: "https://events-next-app-default-rtdb.firebaseio.com/",
  });
}

var db = admin.firestore();
var eventsRef = db.collection("events");
export const verifyAdmin = (token) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      if (claims.admin === true) {
        return true;
      }
    });
};

export const getEvents = async () => {
  const snapshot = await eventsRef.get();
  let events = [];

  snapshot.forEach((doc) => {
    const serializedData = serializeData(doc);
    events.push(serializedData);
  });

  return { events };
};

export const getEvent = async (id) => {
  const doc = await eventsRef.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return serializeData(doc);
};

const serializeData = (doc) => {
  const data = doc.data();
  return {
    ...data,
    startDate: data.startDate.seconds,
    endDate: data.endDate.seconds,
    createdAt: data.createdAt.seconds,
    id: doc.id,
  };
};
