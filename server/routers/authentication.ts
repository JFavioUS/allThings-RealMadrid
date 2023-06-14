import { Router } from "express";
import { check } from "express-validator";

import { authenticationController } from "../controllers";
import validate from "../utils/validation";

const authRouter = Router();
const authValidation = [
  check("username")
    .isLength({ min: 2 })
    .withMessage("The username must have minimum length of 2"),
  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should be between 8 and 15 characters"),
];

/**
 * @openapi
 * /authentication:
 *   post:
 *    tags: [
 *      "authentication"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "message": "Logged In" }'
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
authRouter
  .route("/")
  .post(authValidation, validate, authenticationController.authenticate);

export { authRouter };
