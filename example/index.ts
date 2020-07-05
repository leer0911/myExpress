import express from "../src";

const app = express();

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
