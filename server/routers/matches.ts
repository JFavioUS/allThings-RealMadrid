import { Router } from "express";
import { check } from "express-validator";

import { matchesController } from "../controllers";
import validate from "../utils/validation";

const matchRouter = Router();

const matchValidation = [
  check("away_team_id").exists(),
  check("home_team_id").exists(),
  check("competition_id").exists(),
];

/**
 * @openapi
 * /matches:
 *   get:
 *    tags: [
 *      "matches"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '[ { "stadium": "Santiago Bernabéu", "awayTeam": "Athletic Club", "homeTeam": "Real Madrid", "competition": "LaLiga Santander" }, { "stadium": "Spotify Camp Nou", "awayTeam": "Real Madrid", "homeTeam": "Barcelona", "competition": "LaLiga Santander" } ]'
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
matchRouter.route("/").get(matchesController.getMatches);

/**
 * @openapi
 * /matches/{matchId}:
 *   get:
 *    tags: [
 *      "matches"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ "stadium": "Santiago Bernabéu", "awayTeam": "Athletic Club", "homeTeam": "Real Madrid", "competition": "LaLiga Santander" }'
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
matchRouter.route("/:id").get(matchesController.getMatch);

/**
 * @openapi
 * /matches:
 *   post:
 *    tags: [
 *      "matches"
 *    ]
 *    responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Match Created" }'
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
matchRouter
  .route("/")
  .post(matchValidation, validate, matchesController.createMatch);

/**
 * @openapi
 * /matches/{matchId}:
 *   put:
 *    tags: [
 *      "matches"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Match Updated" }'
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
matchRouter
  .route("/:id")
  .put(matchValidation, validate, matchesController.updateMatch);

/**
 * @openapi
 * /matches/{matchId}:
 *   delete:
 *    tags: [
 *      "matches"
 *    ]
 *    responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              examples:
 *                jsonObject:
 *                  summary: An example JSON response
 *                  value: '{ Message: "Match Deleted" }'
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
matchRouter.route("/:id").delete(matchesController.deleteMatch);

export { matchRouter };
