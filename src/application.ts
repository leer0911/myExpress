import http, { IncomingMessage, ServerResponse, METHODS } from "http";
import Router from "./router";
import { Method, Handle } from "./types";

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
    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      const done = (param?: string) => {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });

        if (param) {
          res.end("404: " + param);
        } else {
          const msg = "Cannot " + req.method + " " + req.url;
          res.end(msg);
        }
      };
      this.router.handle(req, res, done);
    });
    return server.listen(...rest);
  }
  use(...args: any[]) {
    let [fn] = args;
    let path = "/";

    if (typeof fn !== "function") {
      path = fn;
      fn = arguments[1];
    }

    this.router.use(path, fn);

    return this;
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
