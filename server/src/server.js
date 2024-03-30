const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const setupSwagger = require("./swagger");

const app = express();
app.use(bodyParser.json());
app.use("/api", routes);

setupSwagger(app);

app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});