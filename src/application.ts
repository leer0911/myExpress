import http, { IncomingMessage, ServerResponse, METHODS } from "http";
import Router from "./router";
import { Method } from "./types";

type methodKeys = keyof typeof METHODS;

interface Application {
  get: Method;
  post: Method;
  put: Method;
  delete: Method;
}

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
}

METHODS.forEach((_method) => {
  const method = _method.toLowerCase();
  (Application as any).prototype[method] = function (...args: any) {
    this.router[method].apply(this.router, args);
    return this;
  };
});

export default Application;
