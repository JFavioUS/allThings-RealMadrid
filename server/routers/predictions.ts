import { Router } from "express";
import { check } from "express-validator";
import validate from "../utils/validation";

const predictionRouter = Router();
const predictionValidation = [
  check("awayGoals")
    .matches(/^[0-9]+$/)
    .withMessage("Away goals must be a number"),
  check("homeGoals")
    .matches(/^[0-9]+$/)
    .withMessage("Away goals must be a number"),
];

/**
 * @openapi
 * /predictions:
 *   get:
 *    tags: [
 *      "predictions"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '[ {"author": faviosauto, "awayGoals": 1, "homeGoals": 2 }, {"author": faviosauto, "awayGoals": 2, "homeGoals": 1 } ]'
 *        204:
 *          description: No Content
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "No Content" } '
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Unauthorized" } '
 *        500:
 *           description: Internal Server Error
 *           content:
 *              application/json:
 *                examples:
 *                  jsonObject:
 *                    summary: An example JSON response
 *                    value: '{ "message": "Internal Server Error" } '
 */
predictionRouter.route("/").get((req, res) => {
  res.send("Predictions");
});

/**
 * @openapi
 * /predictions/{predictionId}:
 *   get:
 *    tags: [
 *      "predictions"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "author": faviosauto, "awayGoals": 1, "homeGoals": 2 }'
 *        204:
 *          description: No Content
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "No Content" } '
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Unauthorized" } '
 *        500:
 *           description: Internal Server Error
 *           content:
 *              application/json:
 *                examples:
 *                  jsonObject:
 *                    summary: An example JSON response
 *                    value: '{ "message": "Internal Server Error" } '
 */
predictionRouter.route("/:id").get((req, res) => {
  res.send("Prediction number: " + req.params.id);
});

/**
 * @openapi
 * /predictions:
 *   post:
 *    tags: [
 *      "predictions"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Prediction Created" }'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Unauthorized" } '
 *        500:
 *           description: Internal Server Error
 *           content:
 *              application/json:
 *                examples:
 *                  jsonObject:
 *                    summary: An example JSON response
 *                    value: '{ "message": "Internal Server Error" } '
 */
predictionRouter.route("/").post(predictionValidation, validate, (req, res) => {
  res.send("Prediction created");
});

/**
 * @openapi
 * /predictions/{predictionId}:
 *   put:
 *    tags: [
 *      "predictions"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Prediction Updated" }'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Unauthorized" } '
 *        500:
 *           description: Internal Server Error
 *           content:
 *              application/json:
 *                examples:
 *                  jsonObject:
 *                    summary: An example JSON response
 *                    value: '{ "message": "Internal Server Error" } '
 */
predictionRouter
  .route("/:id")
  .put(predictionValidation, validate, (req, res) => {
    res.send("Prediction updated" + req.params.id);
  });

/**
 * @openapi
 * /predictions/{predictionId}:
 *   delete:
 *    tags: [
 *      "predictions"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Prediction Deleted" }'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Unauthorized" } '
 *        500:
 *           description: Internal Server Error
 *           content:
 *              application/json:
 *                examples:
 *                  jsonObject:
 *                    summary: An example JSON response
 *                    value: '{ "message": "Internal Server Error" } '
 */
predictionRouter.route("/:id").delete((req, res) => {
  res.send("Prediction deleted " + req.params.id);
});

export { predictionRouter };
