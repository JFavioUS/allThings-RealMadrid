import { Router } from "express";
import { check } from "express-validator";

import { stadiumsController } from "../controllers";
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
stadiumRouter
  .route("/")
  .post(stadiumValidation, validate, stadiumsController.createStadium);

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
stadiumRouter
  .route("/:id")
  .put(stadiumValidation, validate, stadiumsController.updateStadium);

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
stadiumRouter.route("/:id").delete(stadiumsController.deleteStadium);

export { stadiumRouter };
