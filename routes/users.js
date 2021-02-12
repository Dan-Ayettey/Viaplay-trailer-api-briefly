/**
 * Module dependencies.
 */

const {getTrailer} =require("../makers/trailerMaker");

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
router.get('/api/v1/trailers',async (req,res)=>await getTrailer(req,res));
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
