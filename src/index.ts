import Application from "./application";

export default function express() {
  const app = new Application();

  return app;
}

export { default as Router } from "./router";
