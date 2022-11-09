import startServer from "./server/index.js";
import environment from "./loadEnvirontments.js";
import connectDatabase from "./database/index.js";

// eslint-disable-next-line no-implicit-coercion
await startServer(+environment.port);
await connectDatabase(environment.mongoDbUrl);
