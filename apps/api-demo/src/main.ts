/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import {connectToDatabase} from "./database/mongo-db";
import {usersRouter} from "./app/modules/users/route";

const app = express();
const port = process.env.PORT || 3333;

connectToDatabase()
  .then(() => {
    app.use("/users", usersRouter)

    const server = app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
    server.on('error', console.error);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
