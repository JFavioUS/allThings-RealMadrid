import { Router } from "express";
import { check } from "express-validator";

import { teamsController } from "../controllers";
import validate from "../utils/validation";

const teamRouter = Router();
const teamValidation = [
  check("shortName")
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
 * /teams:
 *   get:
 *    tags: [
 *      "teams"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '[ {"id": 11, "shortName": "Real Madrid", "city": "Madrid", "country": "Spain"" }, {"id": 2, "shortName": "Barcelona", "city": "Barcelona", "country": "Spain" } ]'
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
teamRouter.route("/").get(teamsController.getTeams);

/**
 * @openapi
 * /teams/{teamId}:
 *   get:
 *    tags: [
 *      "teams"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{"id": 11, "shortName": "Real Madrid", "city": "Madrid", "country": "Spain"" }'
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
teamRouter.route("/:id").get(teamsController.getTeam);

/**
 * @openapi
 * /teams:
 *   post:
 *    tags: [
 *      "teams"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Team Created" }'
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
teamRouter
  .route("/")
  .post(teamValidation, validate, teamsController.createTeam);

/**
 * @openapi
 * /teams/{teamId}:
 *   put:
 *    tags: [
 *      "teams"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Team Updated" }'
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
teamRouter
  .route("/:id")
  .put(teamValidation, validate, teamsController.updateTeam);

/**
 * @openapi
 * /teams/{teamId}:
 *   delete:
 *    tags: [
 *      "teams"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Team Deleted" }'
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
teamRouter.route("/:id").delete(teamsController.deleteTeam);

export { teamRouter };
