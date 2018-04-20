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
          // see_it_in: req.body.seeItIn,
          // trailer: req.body.trailer,
          // photos : req.body.photos,
          // cast: req.body.cast,
          // movie_length: req.body.movieLength,
          // release_date: req.body.releaseDate,
          genres: req.body.genres
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
    
 