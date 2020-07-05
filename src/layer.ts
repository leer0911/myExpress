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
  handleRequest(req: IncomingMessage, res: ServerResponse, next: (...args: any[]) => void) {
    try {
      this.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  handleError(error: any, req: IncomingMessage, res: ServerResponse, next: (...args: any[]) => void) {
    try {
      this.handle(error, req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
