import { Handle } from "./types";
import { IncomingMessage, ServerResponse } from "http";
import Layer from "./layer";
import Route from "./route";

export default class Router {
  stack: Layer[];
  constructor() {
    this.stack = [
      new Layer("*", (req, res) => {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("404");
      }),
    ];
  }
  get(path: string, handle: Handle) {
    this.route(path).get(handle);
    return this;
  }
  handle(req: IncomingMessage, res: ServerResponse) {
    for (let i = 1, len = this.stack.length; i < len; i++) {
      if (
        this.stack[i].match(req.url || "") &&
        this.stack[i]?.route?.handleMethod(req.method)
      ) {
        return this.stack[i].handleRequest(req, res);
      }
    }
    return this.stack[0].handleRequest(req, res);
  }
  route(path: string) {
    const route = new Route(path);
    const layer = new Layer(path, (req, res) => {
      route.dispatch(req, res);
    });
    layer.route = route;
    this.stack.push(layer);
    return route;
  }
}
