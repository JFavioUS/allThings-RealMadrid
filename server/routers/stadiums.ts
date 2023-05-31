import { Router } from "express";
import { check } from "express-validator";
import validate from "../utils/validation";

const stadiumRouter = Router();
const stadiumValidation = [
  check("name")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at least 3 characters long"),
  check("city")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("City must be at least 3 characters long"),
  check("country")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Country must be at least 3 characters long"),
];

/**
 * @openapi
 * /stadiums:
 *   post:
 *    tags: [
 *      "stadiums"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Stadium Created" }'
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
stadiumRouter.route("/").post(stadiumValidation, validate, (req, res) => {
  res.send("Stadium created");
});

/**
 * @openapi
 * /stadiums/{stadiumId}:
 *   put:
 *    tags: [
 *      "stadiums"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Stadium Updated" }'
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
stadiumRouter.route("/:id").put(stadiumValidation, validate, (req, res) => {
  res.send("Stadium updated" + req.params.id);
});

/**
 * @openapi
 * /stadiums/{stadiumId}:
 *   delete:
 *    tags: [
 *      "stadiums"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Stadium Deleted" }'
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
stadiumRouter.route("/:id").delete((req, res) => {
  res.send("Stadium deleted " + req.params.id);
});

export { stadiumRouter };
