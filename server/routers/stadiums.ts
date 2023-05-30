import { Router } from "express";

const stadiumRouter = Router();

stadiumRouter.route("/").get((req, res) => {
  res.send("Stadiums");
});

stadiumRouter.route("/:id").get((req, res) => {
  res.send("Stadium number: " + req.params.id);
});
stadiumRouter.route("/").post((req, res) => {
  res.send("Stadium created");
});
stadiumRouter.route("/:id").put((req, res) => {
  res.send("Stadium updated" + req.params.id);
});
stadiumRouter.route("/:id").delete((req, res) => {
  res.send("Stadium deleted " + req.params.id);
});

export { stadiumRouter };
