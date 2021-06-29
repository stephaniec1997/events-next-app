import { parseCookies } from "nookies";
import {
  turnOnNotifications,
  getEvent,
  turnOffNotifications,
  getUser,
} from "utils/firebase/admin";

export default async function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const parsedCookies = parseCookies({ req });
  const { message_token, token } = parsedCookies;
  const user = getUser(token);
  const uid = user.uid;

  // IF given an ID veify that doc exists
  if (id) {
    const eventDoc = await getEvent(id);
    if (!eventDoc) {
      return res.status(500).json({
        error: "You can't subscribe to an event that no longer exists",
      });
    }
  }

  // CONTINUE WITH METHODS
  switch (method) {
    case "POST":
      try {
        await turnOnNotifications(message_token, id, uid);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: "Subscribed to Topic" });
      break;
    case "DELETE":
      try {
        await turnOffNotifications(message_token, id, uid);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: `Unsubscribed to Topic` });
      break;
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
