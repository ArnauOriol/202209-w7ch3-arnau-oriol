import app from "./app";

const startServer = async (port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error) => {
      reject(error);
    });
  });
};

export default startServer;
