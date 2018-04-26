var moment = require('moment');
var Sequelize = require('sequelize');
const db = require('../../db/mysql');


function handle_request(msg, callback) {
    console.log(`Incoming message: ${JSON.stringify(msg)}`);
    let condition = {};
    let query = "select movies.movie_name,SUM(total_price) as revenue from billings,movie_schedule,movies where " +
        "movies.id = movie_schedule.movie_id AND " +
        "billings.movie_schedule_id = movie_schedule.id " +
        "group by movies.id order by total_price desc limit 10;";

    console.log(`Incoming Query message:`, query);
    db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
        .then((topTenMoviesByRevenueList) => {
            callback(null, topTenMoviesByRevenueList)
        });
}

module.exports = {
    handle_request
};