import { parseCookies } from "nookies";
import {
  verifyAdmin,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from "utils/firebase/admin";

export default async function userHandler(req, res) {
  const {
    query: { id },
    method,
    body: { data },
  } = req;

  // VERIFY USER IS ADMIN
  try {
    const parsedCookies = parseCookies({ req });
    const isAdmin = await verifyAdmin(parsedCookies.token);
    if (!isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  // IF given an ID veify that doc exists
  if (id) {
    const eventDoc = await getEvent(id);
    if (!eventDoc) {
      return res.status(500).json({
        error: "You can't perform an action on an that event no longer exists",
      });
    }
  }

  // CONTINUE WITH METHODS
  let event;
  switch (method) {
    case "POST":
      try {
        event = await addEvent(data);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ event, message: "Event Added!" });
      break;
    case "PUT":
      try {
        event = await updateEvent(id, data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      res.status(200).json({ event, message: "Event Updated!" });
      break;
    case "DELETE":
      try {
        await deleteEvent(id);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: `Event Deleted!` });
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
