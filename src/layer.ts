import { Handle } from "./types";
import { ServerResponse, IncomingMessage } from "http";
import Route from "./route";

export default class Layer {
  private path: string;
  private handle: Handle;
  method: string;
  route: Route | null;
  constructor(path: string, handle: Handle) {
    this.path = path;
    this.handle = handle;
    this.method = "*";
    this.route = null;
  }
  match(path: string) {
    if (path === this.path || path === "*") {
      return true;
    }
    return false;
  }
  handleRequest(req: IncomingMessage, res: ServerResponse) {
    if (this.handle) {
      this.handle(req, res);
    }
  }
}
