import Layer from "./layer";
import { Handle } from "./types";
import { ServerResponse, IncomingMessage, METHODS } from "http";

export default class Route {
  path: string;
  stack: any[];
  methods: { [propsName: string]: string | boolean };
  constructor(path: string) {
    this.path = path;
    this.methods = {};
    this.stack = [];
  }
  handleMethod(method = "") {
    return Boolean(this.methods[method.toLowerCase()]);
  }
  dispatch(req: IncomingMessage, res: ServerResponse) {
    const method = req?.method?.toLowerCase();
    for (let i = 0, len = this.stack.length; i < len; i++) {
      if (method === this.stack[i].method) {
        return this.stack[i].handleRequest(req, res);
      }
    }
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
