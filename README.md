# Express 简易版

## 初始化项目

```bash
npm init -y
yarn add -D typescript
yarn tsc --init --rootDir src --outDir dist
yarn add -D @types/node nodemon ts-node
```

## Application

node 实现 http 服务器

```ts
import http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Router

- 请求路径
- 请求方法
- 处理函数
