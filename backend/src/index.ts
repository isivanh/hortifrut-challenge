import "reflect-metadata";
import express from "express";
import "./container";
import routes from "./routes";
import { errorHandler } from "./error/error-middleware";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use(errorHandler);

if (require.main === module) {
  // Only start the server if this file is run directly (development mode)
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
