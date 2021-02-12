/**
 * Module dependencies.
 */
const {fetchViaPlayEmbeddedBlock, fetchTrailerUrls} =require("../request/trailerRequest");
const express = require('express');
const router = express.Router();

// Express cache reserved a storage location to help the API load faster
const ExpressCache = require('express-cache-middleware')
const cacheManager = require('cache-manager')
const cacheMiddleware = new ExpressCache(
    cacheManager.caching({
        store: 'memory', max: 10000, ttl: 3600
    })
)
cacheMiddleware.attach(router)
/*
  @ router.get(any)
  Using GET method to request data from a specified resource.
 */
router.get('/api/v1/trailers', async function(req, res, next) {
    //Viaplay embedded block function,  it fetches the imdb id for the moviedb to use as a key for searching
    const iMDBData=await fetchViaPlayEmbeddedBlock(req.query.url)
    // The moviedb embedded block function, it fetches the trailer id for the url
    const urls=await fetchTrailerUrls(iMDBData)
    const cache = require('memory-cache');
// now just use the cache
    cache.put('urls', urls);
    res.status(200).json(cache.get('urls'));
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
