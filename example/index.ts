import express from "../src";

const app = express();

app.get("/", (req, res) => {
  res.end("Hello Express");
});

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
