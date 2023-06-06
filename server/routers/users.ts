import { Router } from "express";
import { check } from "express-validator";

import { usersController } from "../controllers";
import validate from "../utils/validation";

const userRouter = Router();

const userValidation = [
  check("username")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Email is not valid"),
  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character"),
];

/**
 * @openapi
 * /users:
 *   get:
 *    tags: [
 *      "users"
 *    ]
 *    parameters:
 *      - name: offset
 *        in: query
 *        type: integer
 *        description: The number of items to skip before starting to collect the result set.
 *      - name: limit
 *        in: query
 *        type: integer
 *        description: The number of items to return.
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '[ {"id": 1, "username": "johndoe", "email": "johndoe@localhost.com", "password": "secret"}, {"id": 2, "username": "janedoe", "email": "janedoe@localhost.com", "password": "secret"} ]'
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
userRouter.route("/").get(usersController.getUsers);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *    tags: [
 *      "users"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "id": 1, "username": "johndoe", "email": "johndoe@localhost.com", "password": "secret" }'
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
userRouter.route("/:id(\\d+)").get(usersController.getUser);

/**
 * @openapi
 * /users:
 *   post:
 *    tags: [
 *      "users"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "User Created" }'
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
userRouter
  .route("/")
  .post(userValidation, validate, usersController.createUser);

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *    tags: [
 *      "users"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "User Updated" }'
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
userRouter
  .route("/:id")
  .put(userValidation, validate, usersController.updateUser);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *    tags: [
 *      "users"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "User Deleted" }'
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
userRouter.route("/:id").delete(usersController.deleteUser);

export { userRouter };
