const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Theaters routes
router.route("/").get(controller.listTheatersForMovie).all(methodNotAllowed);

module.exports = router;
