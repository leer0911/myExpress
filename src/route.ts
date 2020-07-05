import Layer from "./layer";
import { Handle } from "./types";
import { ServerResponse, IncomingMessage } from "http";

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
  get(handle: Handle) {
    const layer = new Layer("/", handle);
    layer.method = "get";
    this.methods.get = true;
    this.stack.push(layer);
    return this;
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
