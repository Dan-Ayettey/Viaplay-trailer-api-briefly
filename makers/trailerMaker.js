/**
 * Module dependencies.
 */
const{fetchTrailerUrls} =require("../trailers/trailers");
const {fetchViaPlayEmbeddedBlock}=require("../trailers/trailers");

//Get trailer route
const getTrailer=async function(req,res){
    //Viaplay embedded block function,  it fetches the imdb id for the moviedb to use as a key for searching
    const iMDBData=await fetchViaPlayEmbeddedBlock(req.query.url)
    // The moviedb embedded block function, it fetches the trailer id for the url
    const urls=await fetchTrailerUrls(iMDBData)
    const cache = require('memory-cache');
// now just use the cache
    cache.put('urls', urls);
    res.status(200).json(cache.get('urls'));
}

//export module
module.exports={
    getTrailer
}
