/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function getLimitedMovieRouterFn(req, res, next) {
    console.log('GET LIMITED Movie hit');
    kafka.make_request('admin', 'getLimitedMovie', {
        count: req.body.count
    }, function (err, results) {
        console.log('In Kafka: %o', results);
        if (err) {
            let resObj = new resFormat(err);
            return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
            let resObj = new resFormat(results)
                .customMeta({
                    message: 'Movie retrieved successfully.'
                });
            return res.status(resObj.getStatus()).json(resObj.log());
        }
    });
}

module.exports = { getLimitedMovieRouterFn };