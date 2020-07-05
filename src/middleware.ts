import request from "./request";
import response from "./response";
import { IncomingMessage, ServerResponse } from "http";

function init(req?: IncomingMessage, res?: ServerResponse, next?: any) {
  (req as any).res = res;
  (res as any).req = req;
  Object.setPrototypeOf(req, request);
  Object.setPrototypeOf(res, response);
  next();
}

export default { init };
