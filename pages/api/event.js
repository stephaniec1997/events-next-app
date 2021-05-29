import {
  verifyAdmin,
  addEvent,
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
    const isAdmin = await verifyAdmin(req.headers.cookie.replace("token=", ""));
    if (!isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  // CONTINUE WITH METHODS
  let event;
  switch (method) {
    case "POST":
      try {
        event = await addEvent(data);
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
      res.status(200).json({ event });
      break;
    case "PUT":
      try {
        event = await updateEvent(id, data);
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
      res.status(200).json({ event });
      break;
    case "DELETE":
      try {
        await deleteEvent(id);
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
      res.status(200).json({ id });
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
