import { Router } from "express";

const predictionRouter = Router();

predictionRouter.route("/").get((req, res) => {
  res.send("Predictions");
});

predictionRouter.route("/:id").get((req, res) => {
  res.send("Prediction number: " + req.params.id);
});
predictionRouter.route("/").post((req, res) => {
  res.send("Prediction created");
});
predictionRouter.route("/:id").put((req, res) => {
  res.send("Prediction updated" + req.params.id);
});
predictionRouter.route("/:id").delete((req, res) => {
  res.send("Prediction deleted " + req.params.id);
});

export { predictionRouter };
