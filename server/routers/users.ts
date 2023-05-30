import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => {
  res.send("Hello User");
});

userRouter.route("/:id").get((req, res) => {
  res.send("Hello User number " + req.params.id);
});
userRouter.route("/").post((req, res) => {
  res.send("Hello Created User");
});
userRouter.route("/:id").put((req, res) => {
  res.send("Hello Updated User" + req.params.id);
});
userRouter.route("/:id").delete((req, res) => {
  res.send("Bye User number " + req.params.id);
});

export { userRouter };
