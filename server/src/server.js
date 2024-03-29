const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(bodyParser.json());
app.use("/api", routes);

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Campus Events and Entertainment Center API",
      version: "1.0.0",
      description: "API for managing campus events and entertainment",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
