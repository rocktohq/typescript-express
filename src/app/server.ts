import { Server } from "http";
import app, { port } from "./app";

let server: Server;
const bootstrap = async () => {
  server = app.listen(port, () => {
    console.log("EXPRESS server is listening on port ", port);
  });
};

//* Start the server
bootstrap();
