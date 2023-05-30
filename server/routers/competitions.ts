import { Router } from "express";

const competitionRouter = Router();

competitionRouter.route("/").get((req, res) => {
  res.send("Competitions");
});

competitionRouter.route("/:id").get((req, res) => {
  res.send("Competition number: " + req.params.id);
});
competitionRouter.route("/").post((req, res) => {
  res.send("Competition created");
});
competitionRouter.route("/:id").put((req, res) => {
  res.send("Competition updated" + req.params.id);
});
competitionRouter.route("/:id").delete((req, res) => {
  res.send("Competition deleted: " + req.params.id);
});

export { competitionRouter };
