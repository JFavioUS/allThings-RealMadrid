import { Router } from "express";

const matchRouter = Router();

matchRouter.route("/").get((req, res) => {
  res.send("Matches");
});

matchRouter.route("/:id").get((req, res) => {
  res.send("Match number: " + req.params.id);
});
matchRouter.route("/").post((req, res) => {
  res.send("Match created");
});
matchRouter.route("/:id").put((req, res) => {
  res.send("Match updated: " + req.params.id);
});
matchRouter.route("/:id").delete((req, res) => {
  res.send("Match deleted: " + req.params.id);
});

export { matchRouter };
