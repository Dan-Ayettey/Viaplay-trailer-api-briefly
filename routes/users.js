/**
 * Module dependencies.
 */
const {trailerUrls, viaPlayEmbeddedBlock} =require("../request/trailerRequest");
const express = require('express');
const router = express.Router();

/*
  @ router.get(any)
  Using GET method to request data from a specified resource.
 */
router.get('/v1/trailers', async function(req, res, next) {

    //Viaplay embedded block function,  it fetches the imdb id for the moviedb to use as a key for searching
    const iMDBData=await viaPlayEmbeddedBlock(req.query.url)
    // The moviedb embedded block function, it fetches the trailer id for the url
    const urls=await trailerUrls(iMDBData)
    res.status(200).json(urls);
});
/*
 GET api version

 */
router.get('*', function(req, res, next) {
  /*
   versioning
   */
  res.status(200).json({api_version:1.1,documentation_link:'http://viaplay/doc/api.com'});
});

//module export
module.exports = router;
