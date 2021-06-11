// admin setup src: https://colinhacks.com/essays/nextjs-firebase-authentication
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

var db = admin.firestore();

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

// ------------- USER FUNCTIONS  --------------- //

var usersRef = db.collection("users");

export const getUser = (token) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      const uid = claims.user_id;
      return admin
        .auth()
        .getUser(uid)
        .then((userRecord) => {
          return userRecord;
        });
    });
};

export const getUserSubscriptions = async (token) => {
  const { user_id } = await admin.auth().verifyIdToken(token);

  return usersRef
    .doc(user_id)
    .collection("subscriptions")
    .get()
    .then((querySnapshot) => {
      const subscribedEvents = querySnapshot.docs.map(async (doc) => {
        const event = await getEvent(doc.id);
        const subscription = doc.data();
        return { ...event, subscription };
      });
      return subscribedEvents;
    });
};

export const getUserSubscription = async (token, eid) => {
  const { user_id } = await admin.auth().verifyIdToken(token);

  return usersRef
    .doc(user_id)
    .collection("subscriptions")
    .doc(eid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      return null;
    });
};

// ------------- ADMIN FUNCTIONS  --------------- //

export const getUserByEmail = email => admin.auth().getUserByEmail(email);

export const addAdmin = user =>
  admin.auth().setCustomUserClaims(user.uid, { admin: true });

export const removeAdmin = user =>
  admin.auth().setCustomUserClaims(user.uid, { admin: false });

// ------------- EVENTS FUNCTIONS  --------------- //

var eventsRef = db.collection("events");

// main functions
// TODO: improve getEvents and getPastEvents query to filter by end date instead
//       for events spanning several days/weeks (note: allDay events don't have
//       endDate and no || queries available for firebase yet -- view
//       https://issuetracker.google.com/issues/129070817#comment42)
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
