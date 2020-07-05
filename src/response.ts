import { ServerResponse } from "http";

const response = Object.create(ServerResponse.prototype);

response.send = function (body: any) {
  this.writeHead(200, {
    "Content-Type": "text/plain",
  });
  this.end(body);
};

export default response;
