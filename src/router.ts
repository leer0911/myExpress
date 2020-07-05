import { Handle } from "./types";
import { IncomingMessage, ServerResponse, METHODS } from "http";
import Layer from "./layer";
import Route from "./route";

export default class Router {
  stack: Layer[];
  constructor() {
    this.stack = [];
  }
  handle(req: IncomingMessage, res: ServerResponse, done: any) {
    const { method } = req;
    const { stack } = this;
    let idx = 0;

    function next(param?: string | Error): void {
      const layerParam = param === "route" ? undefined : param;
      if (layerParam === "router") {
        return done(null);
      }

      if (idx >= stack.length || layerParam) {
        return done(layerParam);
      }

      const layer = stack[idx++];

      if (layer.match(req.url || "") && layer?.route?.handleMethod(req.method)) {
        return layer.handleRequest(req, res, next);
      } else {
        next(layerParam);
      }
    }
    next();
  }
  route(path: string) {
    const route = new Route(path);
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
  }
}

METHODS.forEach((_method) => {
  const method = _method.toLowerCase();
  (Router as any).prototype[method] = function (path: string, handle: Handle) {
    const route = this.route(path);
    route[method].call(route, handle);
    return this;
  };
});
