import { IncomingMessage } from "http";

const request = Object.create(IncomingMessage.prototype);

export default request;
