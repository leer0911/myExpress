import Layer from "./layer";
import { Handle } from "./types";
import { ServerResponse, IncomingMessage, METHODS } from "http";

export default class Route {
  path: string;
  stack: Layer[];
  methods: { [propsName: string]: string | boolean };
  constructor(path: string) {
    this.path = path;
    this.methods = {};
    this.stack = [];
  }
  handleMethod(method = "") {
    return Boolean(this.methods[method.toLowerCase()]);
  }
  dispatch(req: IncomingMessage, res: ServerResponse, done: any) {
    const method = req?.method?.toLowerCase();
    const { stack } = this;
    let idx = 0;
    function next(param?: string): void {
      if (param === "route") {
        return done();
      }

      if (param === "router") {
        return done("router");
      }

      if (idx >= stack.length) {
        return done(param);
      }

      let layer = stack[idx++];
      if (method !== layer.method) {
        return next(param);
      }

      if (param) {
        layer.handleError(param, req, res, next);
      } else {
        layer.handleRequest(req, res, next);
      }
    }
    next();
  }
}

METHODS.forEach((_method) => {
  const method = _method.toLowerCase();
  (Route as any).prototype[method] = function (handle: Handle) {
    let layer = new Layer("/", handle);
    layer.method = method;
    this.methods[method] = true;
    this.stack.push(layer);
    return this;
  };
});
