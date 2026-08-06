import connectDB from "./config/db.js";
import { config } from "./config/index.js";
import app from "./app.js";

const start = async () => {
  await connectDB();
  app.listen(config.port, () =>
    console.log(`Server running on http://localhost:${config.port}`)
  );
};

start();
