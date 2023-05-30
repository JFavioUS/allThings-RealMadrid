import { Router } from "express";

const reviewRouter = Router();

reviewRouter.route("/").get((req, res) => {
  res.send("Reviews");
});

reviewRouter.route("/:id").get((req, res) => {
  res.send("Review number: " + req.params.id);
});
reviewRouter.route("/").post((req, res) => {
  res.send("Review created");
});
reviewRouter.route("/:id").put((req, res) => {
  res.send("Review updated" + req.params.id);
});
reviewRouter.route("/:id").delete((req, res) => {
  res.send("Review deleted " + req.params.id);
});

export { reviewRouter };
