import { IncomingMessage, ServerResponse } from "http";

export type Handle = (req: IncomingMessage, res: ServerResponse) => void;

export type RouterStack = {
  path: string;
  method: string;
  handle: Handle;
  match: (path: string) => void;
};
