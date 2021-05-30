// admin setup src: https://colinhacks.com/essays/nextjs-firebase-authentication
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    // TODO: get these in public next env variables :)
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: "https://events-next-app-default-rtdb.firebaseio.com/",
  });
}


export const verifyAdmin = (token) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      if (claims.admin === true) {
        return true;
      }
      return false;
    });
};


// ------------- ADMIN FUNCTIONS  --------------- //

export const getUserByEmail = email => admin.auth().getUserByEmail(email);

export const addAdmin = user =>
  admin.auth().setCustomUserClaims(user.uid, { admin: true });

export const removeAdmin = user =>
  admin.auth().setCustomUserClaims(user.uid, { admin: false });


// ------------- EVENTS FUNCTIONS  --------------- //

var db = admin.firestore();
var eventsRef = db.collection("events");

// main functions
export const getEvents = async () => {
  const snapshot = await eventsRef
    .where("startDate", ">=", new Date())
    .orderBy("startDate")
    .get();
  let events = [];

  snapshot.forEach((doc) => {
    const serializedData = serializeData(doc);
    events.push(serializedData);
  });

  return { events };
};

export const getPastEvents = async () => {
  const snapshot = await eventsRef
    .where("startDate", "<=", new Date())
    .orderBy("startDate", "desc")
    .get();
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

export const addEvent = (data) => {
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  return eventsRef.add({
    ...data,
    startDate: dateToTimestamp(data.startDate),
    endDate: dateToTimestamp(data.endDate),
    createdAt: timestamp,
  });
};

export const updateEvent = (id, updatedData) => {
  return eventsRef.doc(id).update({
    ...updatedData,
    startDate: dateToTimestamp(updatedData.startDate),
    endDate: dateToTimestamp(updatedData.endDate),
  });
};

export const deleteEvent = (id) => {
  return eventsRef.doc(id).delete();
};

// helper functions
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

const dateToTimestamp = date =>
  admin.firestore.Timestamp.fromDate(new Date(date));
