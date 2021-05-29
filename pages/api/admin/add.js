import { verifyAdmin, getUserByEmail, addAdmin } from "utils/firebase/admin";

export default async function userHandler(req, res) {
  const {
    body: { email },
    method,
  } = req;

  try {
    const isAdmin = await verifyAdmin(req.headers.cookie.replace("token=", ""));
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
        await addAdmin(user.toJSON());
        res.status(200).json({ email });
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
