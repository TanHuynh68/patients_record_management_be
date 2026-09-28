import "dotenv/config";
import app from "./src/app.js";
import { connectDatabase } from "./src/config/db.js";
const PORT = process.env.PORT || 9000;

await connectDatabase();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
