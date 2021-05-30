import { parseCookies } from "nookies";
import { verifyAdmin, getUserByEmail, removeAdmin } from "utils/firebase/admin";

export default async function userHandler(req, res) {
  const {
    body: { email },
    method,
  } = req;

  try {
    const parsedCookies = parseCookies({ req });
    const isAdmin = await verifyAdmin(parsedCookies.token);
    if (!isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  switch (method) {
    case "PUT":
      try {
        const user = await getUserByEmail(email);
        await removeAdmin(user.toJSON());
        res
          .status(200)
          .json({ message: `${user.email} has been removed as an admin.` });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
