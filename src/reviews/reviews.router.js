const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Reviews routes
router.route("/").get(controller.listReviewsForMovie).all(methodNotAllowed);
router.route("/:reviewId").delete(controller.destroy).all(methodNotAllowed);

module.exports = router;
