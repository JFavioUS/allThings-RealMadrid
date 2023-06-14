import express, { json, urlencoded, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import {
  authRouter,
  competitionRouter,
  matchRouter,
  predictionRouter,
  reviewRouter,
  stadiumRouter,
  teamRouter,
  userRouter,
} from "./routers";
import { verifyToken } from "./middleware/authentication";
import { authorise } from "./middleware/authorization";

const app = express();
const port = 3000;

// Swagger variables
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

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/swagger.json", (req: Request, res: Response) => {
  res.json(swaggerSpec).status(200);
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.all("*", verifyToken);
app.all("*", authorise);

app.use("/competitions", competitionRouter);
app.use("/matches", matchRouter);
app.use("/predictions", predictionRouter);
app.use("/reviews", reviewRouter);
app.use("/stadiums", stadiumRouter);
app.use("/teams", teamRouter);

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
