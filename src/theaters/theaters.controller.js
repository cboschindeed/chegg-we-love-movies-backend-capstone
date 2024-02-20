const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const theaters = await service.list();
  response.json({ data: theaters });
}

async function listTheatersForMovie(request, response) {
  const { movieId } = request.params;

  const theaters = await service.listTheatersForMovie(movieId);
  response.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listTheatersForMovie: asyncErrorBoundary(listTheatersForMovie),
};
