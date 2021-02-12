const {fetchOne,fetchAll} =require("../protocals/request");
const dotenv=require('dotenv')
const bunyan = require('bunyan');
/*
 Using Bunyan is a simple and fast JSON logging library for quick performance
 */
const log = bunyan.createLogger({name: "Sample brief api"});

/*
 @dotenv.config()
 Using Dotenv is a zero-dependency module that loads environment variables from a .env
 */
dotenv.config();



 const fetchViaPlayEmbeddedBlock=async (url)=> {
    /*
     Request data  from viapaly endpoint and filter for product block for imdb data using non blocking fetchOne
     and in turn return chunks of data. Using lamda expression
    */
     try{
         const data=await fetchOne(url).then((response => response.json())).
         then((response)=>response._embedded['viaplay:blocks'].
         filter((page)=>page.pageCount !==undefined)
             .map(productIMDB=>productIMDB._embedded['viaplay:products']
                 .map(content=> content.content.imdb).map(imdbDetails=>imdbDetails).
                 filter((dataDetails)=> dataDetails !==undefined).map(imdb=> imdb).
                 map( data=> JSON.parse(JSON.stringify(data))).map((imdb)=>imdb.id)))
         //flat the multi dimensional array
         return [].concat.apply([], data);
     }catch (e) {
         log.info(e)
     }
 return []

}

const fetchTrailerUrls=async (iMDBData)=> {

    /*   iterate through imdb_id data and find movies key to be use for fetching data on themoviesdb, api_key is needed,
       the .env file in the root directory should be use.
       fetchOne data  from themoviedb endpoint and filter for chunk of trailer id block for url data using non blocking fetchOne
       and in turn return chunks of data
      */

    const results = await fetchAll(iMDBData.map(async (find) =>
        await fetchOne(`https://api.themoviedb.org/3/find/${find}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`)
            .then((response) => response.json())));
    const movieDetails = results.map((details) => JSON.parse(JSON.stringify(details, null, 2)).movie_results
        .map((trailerId) => trailerId.id));

    //flatten multi dimensional array
    const flatMoveId = [].concat.apply([], movieDetails)
    //Fetch movies from themoviedb
    return await fetchAll(flatMoveId.map(async (id) => await fetchOne(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`)
        .then((response => response.json())).then(movieResults =>movieResults.results.filter(results =>results !==undefined)))).
    then((results)=>[].concat.apply([],results).map(data =>`https://www.youtube.com/watch?v=${data.key}`))
        .catch((reason => log.info(reason)));
}


//export modules
module.exports={
     fetchTrailerUrls,
     fetchViaPlayEmbeddedBlock
}
