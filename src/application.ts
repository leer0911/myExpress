import http, { IncomingMessage, ServerResponse } from "http";

class Application {
  constructor() {}
  listen(...rest: any) {
    const server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        console.log("req", req);
        console.log("res", res);
      }
    );
    return server.listen(...rest);
  }
}

export default Application;
