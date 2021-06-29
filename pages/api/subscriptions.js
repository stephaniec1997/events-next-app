import { parseCookies } from "nookies";
import {
  subscribeToTopic,
  getEvent,
  getUserMessagingTokens,
  unsubscribeToTopic,
  getUser,
} from "utils/firebase/admin";

export default async function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const parsedCookies = parseCookies({ req });
  const user = getUser(parsedCookies.token);
  const uid = user.uid;
  console.log(user);
  const userMessagingTokens = getUserMessagingTokens(uid);

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
        await subscribeToTopic(userMessagingTokens, id, uid);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: "Subscribed to Topic" });
      break;
    case "DELETE":
      try {
        await unsubscribeToTopic(userMessagingTokens, id, uid);
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
