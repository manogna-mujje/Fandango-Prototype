/* Add a new movie */
var kafka = require('../../kafka/client');

'use strict';

// Import helpers
let resFormat = require("../../helpers/res_format");

function addMovieRouterFn(req, res, next){
    console.log('Add Movie hit');
      kafka.make_request('admin', 'addMovie', {
          movie_name: req.body.movieName,
          description: req.body.description,
          seeItIn: req.body.seeItIn,
          trailer: req.body.trailer,
          photos : req.body.photos,
          cast: req.body.cast,
          movieLength: req.body.movieLength,
          releaseDate: req.body.releaseDate,
          genres: req.body.genres,
          is_archive: req.body.is_archive
    }, function(err,results){
      console.log('In Kafka: %o', results);
        if(err){
          let resObj = new resFormat(err);
          return res.status(resObj.getStatus()).json(resObj.log());
        }
        else {
          let resObj = new resFormat(results)
                  .customMeta({
                    message: 'Movie has been added successfully.'
                  });
          return res.status(resObj.getStatus()).json(resObj.log());
        }
      });
}

module.exports = { addMovieRouterFn };
    
 