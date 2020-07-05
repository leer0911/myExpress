import express from "../src";

const app = express();

app.get("/", (req, res) => {
  res.end("Hello Express Get");
});

app.post("/", (req, res) => {
  res.end("Hello Express POST");
});

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
