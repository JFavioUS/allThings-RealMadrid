import { Router } from "express";

const teamRouter = Router();

teamRouter.route("/").get((req, res) => {
  res.send("Teams");
});

teamRouter.route("/:id").get((req, res) => {
  res.send("Team number: " + req.params.id);
});
teamRouter.route("/").post((req, res) => {
  res.send("Team created");
});
teamRouter.route("/:id").put((req, res) => {
  res.send("Team updated: " + req.params.id);
});
teamRouter.route("/:id").delete((req, res) => {
  res.send("Team deleted " + req.params.id);
});

export { teamRouter };
