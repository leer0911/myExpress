import http, { IncomingMessage, ServerResponse } from "http";
import Router from "./router";
import { Handle } from "./types";

class Application {
  router = new Router();
  constructor() {}
  listen(...rest: any) {
    const server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        this.router.handle(req, res);
      }
    );
    return server.listen(...rest);
  }
  get(path: string, handle: Handle) {
    return this.router.get(path, handle);
  }
}

export default Application;
