import { Router } from "express";
import { check } from "express-validator";

import { reviewsController } from "../controllers";
import validate from "../utils/validation";

const reviewRouter = Router();
const reviewValidation = [
  check("title")
    .trim()
    .isLength({ min: 3, max: 140 })
    .withMessage("Title must be at least 3 characters long"),
];

/**
 * @openapi
 * /reviews:
 *   get:
 *    tags: [
 *      "reviews"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '[ {"id": 1, "author": "faviosauto", "title": "Real Madrid barely wins against Sevilla", "content": "Lorem Ipsum" }, {"id": 2, "author": "faviosauto", "title": "Barcelona barely wins against Real Madrid", "content": "Lorem Ipsum" } ]'
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
reviewRouter.route("/").get(reviewsController.getReviews);

/**
 * @openapi
 * /reviews/{reviewId}:
 *   get:
 *    tags: [
 *      "reviews"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{"id": 1, "author": "faviosauto", "title": "Real Madrid barely wins against Sevilla", "content": "Lorem Ipsum" }'
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
reviewRouter.route("/:id").get(reviewsController.getReview);

/**
 * @openapi
 * /reviews:
 *   post:
 *    tags: [
 *      "reviews"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Review Created" }'
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
reviewRouter
  .route("/")
  .post(reviewValidation, validate, reviewsController.createReview);

/**
 * @openapi
 * /reviews/{reviewId}:
 *   put:
 *    tags: [
 *      "reviews"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Review Updated" }'
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
reviewRouter
  .route("/:id")
  .put(reviewValidation, validate, reviewsController.updateReview);

/**
 * @openapi
 * /reviews/{reviewId}:
 *   delete:
 *    tags: [
 *      "reviews"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Review Deleted" }'
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
reviewRouter.route("/:id").delete(reviewsController.deleteReview);

export { reviewRouter };
