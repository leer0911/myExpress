import { IncomingMessage, ServerResponse } from "http";

export type ErrorHandle = (error: any, req: IncomingMessage, res: ServerResponse, next: any) => void;
export type RequestHandle = (req: IncomingMessage, res: ServerResponse, next: any) => void;
export type NormalHandle = (req: IncomingMessage, res: ServerResponse) => void;
export type Handle = ErrorHandle & RequestHandle & NormalHandle;
export type Method = (path: string, handle: RequestHandle) => void;
export type RouterStack = {
  path: string;
  method: string;
  handle: Handle;
  match: (path: string) => void;
};
