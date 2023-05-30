import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {
  competitionRouter,
  matchRouter,
  predictionRouter,
  reviewRouter,
  stadiumRouter,
  teamRouter,
  userRouter,
} from "./routers";

const app = express();
const port = 3000;

// Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ATRM API",
    version: "1.0.0",
    description: "All Things Real Madrid API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/swagger.json", (req: Request, res: Response) => {
  res.json(swaggerSpec).status(200);
});

app.use("/competitions", competitionRouter);
app.use("/matches", matchRouter);
app.use("/predictions", predictionRouter);
app.use("/reviews", reviewRouter);
app.use("/stadiums", stadiumRouter);
app.use("/teams", teamRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
