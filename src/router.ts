import { RouterStack, Handle } from "./types";
import { IncomingMessage, ServerResponse } from "http";

export default class Router {
  stack: RouterStack[];
  constructor() {
    this.stack = [
      {
        path: "*",
        method: "*",
        handle: function (req, res) {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("404");
        },
      },
    ];
  }
  get(path: string, handle: Handle) {
    this.stack.push({ path, method: "GET", handle });
  }
  handle(req: IncomingMessage, res: ServerResponse) {
    for (var i = 1, len = this.stack.length; i < len; i++) {
      if (
        (req.url === this.stack[i].path || this.stack[i].path === "*") &&
        (req.method === this.stack[i].method || this.stack[i].method === "*")
      ) {
        return this.stack[i].handle && this.stack[i].handle(req, res);
      }
    }
    return this.stack[0].handle && this.stack[0].handle(req, res);
  }
}
