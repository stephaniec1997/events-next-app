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

export const addAdmin = (email) => {
  // TODO: verify admin
  admin
    .auth()
    .getUserByEmail(email)
    .then(res => res.toJSON())
    .then((user) => {
      admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
};

export const removeAdmin = (email) => {
  // TODO: verify admin
  admin
    .auth()
    .getUserByEmail(email)
    .then(res => res.toJSON())
    .then((user) => {
      admin.auth().setCustomUserClaims(user.uid, { admin: false });
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
};

export const addEvent = (data) => {
  // TODO: verify admin
  console.log("adding an event");
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  return eventsRef.add({
    ...data,
    createdAt: timestamp,
  });
};

export const updateEvent = (id, updatedData) => {
  // TODO: verify admin
  console.log('updating an event');
  return eventsRef.doc(id).update(updatedData);
};

export const deleteEvent = (id) => {
  // TODO: verify admin
  console.log('deleting an event');
  return eventsRef.doc(id).delete();
};
