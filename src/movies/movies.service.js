const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies").select("*").where({ movie_id }).first();
}

async function listTheatersForMovie(movieId) {
  return db("theaters")
    .select("theaters.*")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .where({ "movies_theaters.movie_id": movieId });
}

async function listReviewsForMovie(movieId) {
  const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  });

  const reviews = await db("reviews as r")
    .select("*")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movieId });

  return reviews.map(addCritic);
}

module.exports = {
  list,
  read,
  listTheatersForMovie,
  listReviewsForMovie,
};
